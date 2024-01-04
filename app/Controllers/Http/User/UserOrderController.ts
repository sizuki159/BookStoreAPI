import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Cart from 'App/Models/Cart'
import User from 'App/Models/User'
import { types } from '@ioc:Adonis/Core/Helpers'
import UserAddress from 'App/Models/UserAddress'
import Voucher from 'App/Models/Voucher'
import { DateTime } from 'luxon'
import VoucherUsageHistory from 'App/Models/VoucherUsageHistory'
import PaymentMethod from 'App/Models/PaymentMethod'
import OrderItem from 'App/Models/OrderItem'
import IOrderResponse from 'App/Interfaces/IOrderResponse'
import PaypalService from 'App/Services/PaypalService'
import Order from 'App/Models/Order'
import MyOrderFilterFields from 'App/FilterFields/User/MyOrderFilterFields'
import VNPayService from 'App/Services/VNPayService'
import Database from '@ioc:Adonis/Lucid/Database'
import Book from 'App/Models/Book'
import DatetimeUtils from 'App/Utils/DatetimeUtils'
import PageLimitUtils from 'App/Utils/PageLimitUtils'
import { schema } from '@ioc:Adonis/Core/Validator'
import Invoice from 'App/Models/Invoice'
import { calculateFee } from 'App/Services/GHNService'

export default class UserOrderController {
    public async createOrder({ auth, request, response }: HttpContextContract) {
        const userAuth = await auth.use('api').authenticate()
        const user = await User.findOrFail(userAuth.id)

        const { ids, voucherCode, customerNote, userAddressId, paymentMethod } = request.body()

        // Mảng hợp lệ
        if (!types.isArray(ids)) {
            return response.badRequest({
                message: 'Yêu cầu không hợp lệ'
            })
        }

        // Phương thức thanh toán hợp lệ
        if (!paymentMethod || !await PaymentMethod.findBy('key', paymentMethod)) {
            return response.badRequest({
                message: 'Phương thức thanh toán không hợp lệ'
            })
        }

        // Kiểm tra địa chỉ người dùng
        const userAddress = await UserAddress.query()
            .where('id', userAddressId)
            .andWhere('user_id', user.id)
            .first()
        if (!userAddress) {
            return response.badRequest({
                message: 'Địa chỉ không hợp lệ'
            })
        }

        // Lấy danh sách carts
        const carts = await Cart.query().where('userId', user.id)
            .andWhereIn('id', ids)
            .preload('book', (book) => book.withTrashed())


        if (carts.length === 0) {
            return response.badRequest({
                message: 'Yêu cầu không hợp lệ'
            })
        }

        // Tổng tiền sản phẩm
        const productPrice = carts.reduce((sum, cart) => sum + (cart.book.price * cart.quantity), 0)

        // Phí ship tạm thời mặc định 29k
        // Tính toán ở dưới
        let shipFee = 29000
        // Tính toán tiền vận chuyển
        try {
            shipFee = await calculateFee(userAddress, carts)
        } catch { }

        const price = {
            productPrice,
            shipFee: shipFee,
            discountPrice: 0,
            total: productPrice + shipFee
        }

        // Xử lý voucher nếu khách sử dụng
        let voucherId
        if (voucherCode) {
            const voucher = await Voucher.query()
                .where('status', Voucher.STATUS.ACTIVE)
                .andWhere('voucher_code', voucherCode)
                .andWhere('start_date', '<=', DateTime.now().toFormat(DatetimeUtils.FORMAT_DATETIME_WITH_SQL))
                .andWhere('end_date', '>=', DateTime.now().toFormat(DatetimeUtils.FORMAT_DATETIME_WITH_SQL))
                .andWhere('require_order_min_price', '<=', productPrice)
                .andWhere(voucherAvailable => {
                    voucherAvailable.where('voucherType', Voucher.TYPE.GENERAL)
                        .orWhere('userId', user.id)
                        .orWhere('userLevelId', user.userLevelId)
                })
                .first()

            if (!voucher) {
                return response.badRequest({
                    message: 'Mã giảm giá không hợp lệ'
                })
            }

            if (await VoucherUsageHistory.query().where('voucher_id', voucher.id).andWhere('user_id', user.id).first()) {
                return response.badRequest({
                    message: 'Mã giảm giá đã sử dụng trước đó'
                })
            }

            await VoucherUsageHistory.create({
                userId: user.id,
                voucherId: voucher.id
            })

            voucherId = voucher.id

            price.discountPrice = price.productPrice * (voucher.discountPercentage / 100)
            if (voucher.discountMaxPrice) {
                if (price.discountPrice > voucher.discountMaxPrice) {
                    price.discountPrice = voucher.discountMaxPrice
                }
            }
            price.total -= price.discountPrice
        }


        // Tạo Order đơn hàng
        try {
            const order = await user.related('orders').create({
                productPrice: price.productPrice,
                feePrice: price.shipFee,
                finalPrice: price.total,
                customerNote,
                voucher: voucherCode ? voucherCode : null,
                discountPrice: price.discountPrice,
                paymentMethod,
                userAddressId: userAddress.id,
            })
            await order.refresh()

            // Nếu có sử dụng voucher
            // Thì update lịch sử sử dụng voucher
            // Cho đơn hàng nào
            if (voucherCode) {
                await VoucherUsageHistory.query()
                    .update('order_id', order.id)
                    .where('user_id', user.id)
                    .andWhere('voucher_id', voucherId)
            }

            for (const cart of carts) {
                await OrderItem.create({
                    orderId: order.id,
                    isbnCode: cart.isbnCode,
                    quantity: cart.quantity,
                    pricePerUnit: cart.book.price
                })
                await cart.delete()
            }

            const responseBody: IOrderResponse = {
                message: 'Đã đặt hàng thành công',
                payment: {
                    method: paymentMethod,
                    url: null
                }
            }

            // Tiếp tục với tạo hóa đơn
            switch (paymentMethod) {
                case PaymentMethod.METHOD.COD: {
                    // Trừ số lượng hàng hóa
                    try {
                        for (const cart of carts) {
                            await Book.query().decrement('quantity', cart.quantity).where('id', cart.book.id)
                        }

                        // Xóa sản phẩm ra khỏi giỏ hàng
                        // Vì đã tạo hóa đơn thành công
                        // Sản phẩm sẽ nằm trong Order Item
                        for (const cart of carts) {
                            await cart.forceDelete()
                        }

                    } catch {
                        return response.serviceUnavailable({
                            message: 'Hệ thống có lỗi xảy ra'
                        })
                    }
                    return response.ok(responseBody)
                }
                case PaymentMethod.METHOD.PAYPAL: {
                    const paymentURL = await PaypalService.create(order)
                    if (paymentURL) {

                        // Trừ số lượng hàng hóa
                        try {
                            for (const cart of carts) {
                                await Book.query().decrement('quantity', cart.quantity).where('id', cart.book.id)
                            }
                        } catch {
                        }

                        // Xóa sản phẩm ra khỏi giỏ hàng
                        // Vì đã tạo hóa đơn thành công
                        // Sản phẩm sẽ nằm trong Order Item
                        for (const cart of carts) {
                            await cart.forceDelete()
                        }

                        responseBody.payment.method = paymentMethod
                        responseBody.payment.url = paymentURL
                        return response.ok(responseBody)

                    } else {
                        // Khôi phục lại giỏ hàng cho khách
                        for (const cart of carts) {
                            await cart.restore()
                        }
                        return response.serviceUnavailable({
                            message: 'Hệ thống lỗi thanh toán với Paypal'
                        })
                    }
                }
                case PaymentMethod.METHOD.VNPAY: {
                    // VNPAY
                    const paymentURL = await VNPayService.create(order)
                    responseBody.payment.method = paymentMethod
                    responseBody.payment.url = paymentURL

                    // Xóa sản phẩm ra khỏi giỏ hàng
                    // Vì đã tạo hóa đơn thành công
                    // Sản phẩm sẽ nằm trong Order Item
                    for (const cart of carts) {
                        await cart.forceDelete()
                    }

                    return response.ok(responseBody)
                }
                default:
                    // Khôi phục lại giỏ hàng cho khách
                    for (const cart of carts) {
                        await cart.restore()
                    }

                    return response.serviceUnavailable({
                        message: 'Phương thức thanh toán này đang bảo trì'
                    })
            }
        } catch (e) {
            return response.serviceUnavailable({
                message: 'Có lỗi hệ thống xảy ra.'
            })
        }
    }

    public async getStatisticMyOrder({ auth, response }: HttpContextContract) {
        const userAuth = await auth.use('api').authenticate()
        const myOrderStatistics = await Database
            .from('orders')
            .select('status', Database.raw('count(*) as count'))
            .whereIn('status', Object.values(Order.STATUS))
            .groupBy('status')
            .where('user_id', userAuth.id)

        // Chuyển kết quả thành đối tượng có tất cả các trạng thái, với số lượng là 0 nếu không có trong kết quả
        const result = Object.values(Order.STATUS).map(status => ({
            status,
            total: myOrderStatistics.find(myOrderStatistic => myOrderStatistic.status === status)?.count || 0,
        }));
        return response.json(result)
    }

    public async getMyOrdersWithStatus({ auth, request, response }: HttpContextContract) {
        const userAuth = await auth.use('api').authenticate()

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

        const myOrders = await Order.query()
            .where('user_id', userAuth.id)
            .andWhere('status', payload.params.status)
            .paginate(page, limit)

        return response.json(myOrders.serialize(MyOrderFilterFields))
    }

    public async getAllMyOrders({ auth, request, response }: HttpContextContract) {
        const userAuth = await auth.use('api').authenticate()

        const { page, limit } = PageLimitUtils(request.qs())

        const myOrders = await Order.query()
            .where('user_id', userAuth.id)
            .paginate(page, limit)

        return response.json(myOrders.serialize(MyOrderFilterFields))
    }

    public async orderDetail({ params, auth, response }: HttpContextContract) {
        const userAuth = await auth.use('api').authenticate()

        const orderId = params.order_id
        const order = await Order.query()
            .where('user_id', userAuth.id)
            .andWhere('order_id', orderId)
            .preload('items', (items) => {
                items.preload('product', (product) => {
                    product.withTrashed()
                        .preload('images', images => images.groupLimit(1))
                })
            })
            .preload('user')
            .preload('userAddress', (userAddress) => {
                userAddress.withTrashed()
                    .preload('wards', (wards) => {
                        wards.preload('district', (district) => {
                            district.preload('province')
                        })
                    })
            })
            .preload('review')
            .preload('payment')
            .preload('invoice')
            .first()

        if (order) {
            return response.json(order.serialize(MyOrderFilterFields))
        }

        return response.notFound({
            message: 'Không tìm thấy đơn hàng này của bạn'
        })
    }

    // Xác nhận completed đơn hàng
    public async confirmedCompletedOrder({ auth, params, response }: HttpContextContract) {
        const userAuth = await auth.use('api').authenticate()

        const order_id = params.order_id

        try {

            const order = await Order.query()
                .where('order_id', order_id)
                .andWhere('user_id', userAuth.id)
                .first()

            if (!order) {
                return response.notFound({
                    message: 'Không tìm thấy đơn hàng này của bạn'
                })
            }

            // Nếu đơn hàng thành công rồi thì thông báo
            if (order.status === Order.STATUS.COMPLETED) {
                return response.badRequest({
                    message: 'Đơn hàng này đã hoàn thành'
                })
            }

            // Chỉ chấp nhận đơn hàng đang vận chuyển
            if (order.status !== Order.STATUS.DELIVERING) {
                return response.badRequest({
                    message: 'Đơn hàng này không thể xác nhận vì chưa vận chuyển'
                })
            }

            // Đổi trạng thái đơn hàng thành hoàn thành
            // Đổi trạng thái thanh toán thành đã thanh toán nếu là COD
            order.status = Order.STATUS.COMPLETED
            if (order.paymentMethod === PaymentMethod.METHOD.COD) {
                order.paymentStatus = Order.PAYMENT_STATUS.PAID
            }
            await order.save()

            return response.ok({
                message: 'Xác nhận đã nhận hàng thành công'
            })
        } catch {
            return response.badRequest({
                message: 'Thất bại'
            })
        }
    }

    // Hủy đơn hàng
    public async cancelOrder({ auth, params, response }: HttpContextContract) {
        const userAuth = await auth.use('api').authenticate()
        const orderId = params.order_id

        try {
            const order = await Order.query()
                .where('order_id', orderId)
                .andWhere('user_id', userAuth.id)
                .first()

            if (!order) {
                return response.notFound({
                    message: 'Không tìm thấy đơn hàng này của bạn'
                })
            }

            // Chỉ hủy đơn hàng có trạng thái đang chờ xác nhận
            // Hoặc đã xác nhận
            if (order.status !== Order.STATUS.PENDING && order.status !== Order.STATUS.CONFIRMED) {
                return response.badRequest({
                    message: 'Đơn hàng không thể hủy'
                })
            }

            // Hủy đơn hàng
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

            return response.ok({
                message: 'Đã hủy đơn hàng'
            })
        } catch {
            return response.badRequest({
                message: 'Đã có lỗi xảy ra'
            })
        }
    }
}
