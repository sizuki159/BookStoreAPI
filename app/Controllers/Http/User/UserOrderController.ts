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
            .andWhere('user_id', user.id).first()
        if (!userAddress) {
            return response.badRequest({
                message: 'Địa chỉ không hợp lệ'
            })
        }

        // Lấy danh sách carts
        const carts = await Cart.query().where('userId', user.id)
            .andWhereIn('id', ids)
            .preload('book')


        if (carts.length === 0) {
            return response.badRequest({
                message: 'Yêu cầu không hợp lệ'
            })
        }

        // Tổng tiền sản phẩm
        const productPrice = carts.reduce((sum, cart) => sum + (cart.book.price * cart.quantity), 0)

        // Phí ship tạm thời mặc định 29k
        const price = {
            productPrice,
            shipFee: 29000,
            discountPrice: 0,
            total: productPrice + 29000
        }

        // Xử lý voucher nếu khách sử dụng
        let voucherId
        if (voucherCode) {
            const voucher = await Voucher.query()
                .where('status', Voucher.STATUS.ACTIVE)
                .andWhere('voucher_code', voucherCode)
                .andWhere('start_date', '<=', DateTime.now().toFormat('yyyy-MM-dd HH:mm:ss'))
                .andWhere('end_date', '>=', DateTime.now().toFormat('yyyy-MM-dd HH:mm:ss'))
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

            price.discountPrice = price.total * (voucher.discountPercentage / 100)
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
                productPrice: productPrice,
                feePrice: price.shipFee,
                finalPrice: productPrice + price.shipFee,
                customerNote,
                voucher: voucherCode,
                discountPrice: price.discountPrice,
                paymentMethod,
                userAddressId: userAddress.id
            })
            await order.refresh()

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
            if (paymentMethod === PaymentMethod.METHOD.COD) {

                // Trừ số lượng hàng hóa
                try {
                    for (const cart of carts) {
                        await Book.query().decrement('quantity', cart.quantity).where('id', cart.book.id)
                        // cart.book.quantity -= cart.quantity
                        // await cart.book.save()
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
            } else if (paymentMethod === PaymentMethod.METHOD.PAYPAL) {
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
            } else if (paymentMethod === PaymentMethod.METHOD.VNPAY) {
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
            } else {

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

    public async getMyOrder({ auth, response }: HttpContextContract) {
        const userAuth = await auth.use('api').authenticate()
        const myOrders = await Order.query().where('user_id', userAuth.id)
            .preload('userAddress', (userAddress) => {
                userAddress.preload('wards', (wards) => {
                    wards.preload('district', (district) => {
                        district.preload('province')
                    })
                })
            })

        return response.json(myOrders.map((myOrder) => myOrder.serialize(MyOrderFilterFields)))
    }

    public async orderDetail({ params, auth, response }: HttpContextContract) {
        const userAuth = await auth.use('api').authenticate()

        const orderId = params.orderId
        const order = await Order.query()
            .where('user_id', userAuth.id)
            .andWhere('order_id', orderId)
            .preload('items', (items) => {
                items.preload('product', (product) => {
                    product.preload('images')
                })
            })
            .preload('userAddress', (userAddress) => {
                userAddress.preload('wards', (wards) => {
                    wards.preload('district', (district) => {
                        district.preload('province')
                    })
                })
            })
            .first()

        if (order) {
            return response.json(order.serialize(MyOrderFilterFields))
        }

        return response.notFound({
            message: 'Không tìm thấy đơn hàng này của bạn'
        })
    }
}
