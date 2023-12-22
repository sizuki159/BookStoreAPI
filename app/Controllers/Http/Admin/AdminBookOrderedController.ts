import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Database from '@ioc:Adonis/Lucid/Database'
import AdminOrderFilterFields from 'App/FilterFields/Admin/AdminOrderFilterFields'
import Order from 'App/Models/Order'
import PageLimitUtils from 'App/Utils/PageLimitUtils'

export default class AdminBookOrderedController {
    public async getAllOrder({ request, response }: HttpContextContract) {
        const { page, limit } = PageLimitUtils(request.qs())
        const query = Order.query().preload('user').orderBy('created_at', 'desc')

        const orderList = await query.paginate(page, limit)
        return response.json(
            orderList.serialize(AdminOrderFilterFields)
        )
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

    public async getAllOrdersWithStatus({ request, response }: HttpContextContract) {

        const { page, limit } = PageLimitUtils(request.qs())

        const newStatusSchema = schema.create({
            params: schema.object().members({
                'status': schema.enum(Object.values(Order.STATUS))
            })
        })

        const payload = await request.validate({
            schema: newStatusSchema,
            messages: {
                'params.status.enum': 'Trạng thái không hợp lệ'
            }
        })

        const orders = await Order.query()
            .andWhere('status', payload.params.status)
            .paginate(page, limit)

        return response.json(orders.serialize(AdminOrderFilterFields))
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
            await order.save()

            // Hoàn tiền (nếu có)
            if (order.paymentStatus === Order.PAYMENT_STATUS.PAID) {
                await order.related('user').query().increment('money', order.finalPrice)
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