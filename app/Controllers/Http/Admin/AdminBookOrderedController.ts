import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Database from '@ioc:Adonis/Lucid/Database'
import AdminOrderFilterFields from 'App/FilterFields/Admin/AdminOrderFilterFields'
import Book from 'App/Models/Book'
import Invoice from 'App/Models/Invoice'
import Order from 'App/Models/Order'
import OrderItem from 'App/Models/OrderItem'
import PaymentMethod from 'App/Models/PaymentMethod'
import PageLimitUtils from 'App/Utils/PageLimitUtils'

export default class AdminBookOrderedController {
    public async getAllOrder({ request, response }: HttpContextContract) {

        let { email, status, payment_status } = request.qs()

        let query = Order.query()
            .preload('user')
            .orderBy('created_at', 'desc')


        // Filter status
        if (status) {
            query.where('status', status)
        }

        // Filter payment status
        if (payment_status) {
            query.where('payment_status', payment_status)
        }

        // Email text search
        if (email) {
            query.whereHas('user', (userQuery) => {
                userQuery.where('email', 'like', `%${email}%`)
            })
        }

        // Phân trang
        const { page, limit } = PageLimitUtils(request.qs())
        const result = await query.paginate(page, limit)

        return response.json(result.serialize(AdminOrderFilterFields))
    }

    public async getStatisticAllOrder({ response }: HttpContextContract) {
        const myOrderStatistics = await Database
            .from('orders')
            .select('status', Database.raw('count(*) as count'))
            .whereIn('status', Object.values(Order.STATUS))
            .groupBy('status')

        // Chuyển kết quả thành đối tượng có tất cả các trạng thái, với số lượng là 0 nếu không có trong kết quả
        const result = Object.values(Order.STATUS).map(status => ({
            status,
            total: myOrderStatistics.find(myOrderStatistic => myOrderStatistic.status === status)?.count || 0,
        }));

        return response.json(result)
    }

    public async orderDetail({ params, response }: HttpContextContract) {
        const orderId = params.order_id

        const order = await Order.query()
            .where('order_id', orderId)
            .preload('items', (items) => {
                items.preload('product', (product) => {
                    product.withTrashed()
                        .preload('images', images => images.groupLimit(1))
                })
            })
            .preload('user', (user) => {
                user.preload('profile')
            })
            .preload('userAddress', (userAddress) => {
                userAddress.preload('wards', (wards) => {
                    wards.preload('district', (district) => {
                        district.preload('province')
                    })
                })
            })
            .preload('review')
            .first()

        if (order) {
            return response.json(order.serialize(AdminOrderFilterFields))
        }

        return response.notFound({
            message: 'Không tìm thấy đơn hàng này'
        })
    }

    // Xác nhận đơn hàng (chỉ áp dụng COD)
    public async confirmOrder({ params, response }: HttpContextContract) {
        const orderId = params.order_id

        const order = await Order.query()
            .where('order_id', orderId)
            .first()

        if (order) {
            // Chỉ xác nhận đơn hàng có trạng thái chưa xác nhận
            if (order.status !== Order.STATUS.PENDING) {
                return response.badRequest({
                    message: 'Đơn hàng này không thể xác nhận'
                })
            }

            order.status = Order.STATUS.CONFIRMED
            await order.save()

            return response.json({
                message: 'Xác nhận đơn hàng thành công'
            })
        }

        return response.notFound({
            message: 'Không tìm thấy đơn hàng này'
        })
    }

    // Chuyển sang trạng thái đang vận chuyển (chỉ áp dụng trạng thái đã xác nhận)
    public async deliveringOrder({ params, response }: HttpContextContract) {
        const orderId = params.order_id

        const order = await Order.query()
            .where('order_id', orderId)
            .first()

        if (order) {
            // Chỉ chuyển trạng thái đơn hàng đã xác nhận
            if (order.status !== Order.STATUS.CONFIRMED) {
                return response.badRequest({
                    message: 'Đơn hàng này không thể chuyển trạng thái'
                })
            }

            order.status = Order.STATUS.DELIVERING
            await order.save()

            return response.json({
                message: 'Chuyển trạng thái đơn hàng thành công'
            })
        }

        return response.notFound({
            message: 'Không tìm thấy đơn hàng này'
        })
    }

    // Hủy đơn hàng
    public async cancelOrder({ params, response }: HttpContextContract) {
        const orderId = params.order_id

        const order = await Order.query()
            .where('order_id', orderId)
            .first()

        if (order) {
            // Chỉ hủy đơn hàng có trạng thái khác với đã hủy và đã hoàn thành
            if (order.status === Order.STATUS.CANCELED || order.status === Order.STATUS.COMPLETED) {
                return response.badRequest({
                    message: 'Đơn hàng này không thể hủy'
                })
            }

            order.status = Order.STATUS.CANCELED

            // Hoàn tiền (nếu có)
            // Và chỉ hoàn tiền khi thanh toán online trước
            if (order.paymentMethod !== PaymentMethod.METHOD.COD) {
                if (order.paymentStatus === Order.PAYMENT_STATUS.PAID) {
                    order.paymentStatus = Order.PAYMENT_STATUS.REFUNDED
                    await order.related('user').query().increment('money', order.finalPrice)
                }

                // Hủy hóa đơn
                try {
                    await Invoice.query()
                        .update('status', Invoice.STATUS.CANCEL)
                        .where('order_id', order.id)
                } catch { }
            }
            
            await order.save()

            // Hủy đơn thì phải hoàn trả số lượng sách về kho
            // Tăng số lượng sách lên
            const items = await OrderItem.query().where('order_id', order.id)
            for (const item of items) {
                await Book.query()
                    .increment('quantity', item.quantity)
                    .where('isbn_code', item.isbnCode)
            }

            return response.json({
                message: 'Hủy đơn hàng thành công'
            })
        }

        return response.notFound({
            message: 'Không tìm thấy đơn hàng này'
        })
    }
}