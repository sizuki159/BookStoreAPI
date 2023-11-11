import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Cart from 'App/Models/Cart'
import User from 'App/Models/User'
import { types } from '@ioc:Adonis/Core/Helpers'
import Order from 'App/Models/Order'
import UserAddress from 'App/Models/UserAddress'
import Voucher from 'App/Models/Voucher'
import { DateTime } from 'luxon'
import VoucherUsageHistory from 'App/Models/VoucherUsageHistory'
import PaymentMethod from 'App/Models/PaymentMethod'
import PaypalController from '../Payment/PaypalController'
import OrderItem from 'App/Models/OrderItem'

export default class UserOrderController {
    public async createOrder({ auth, request, response }: HttpContextContract) {
        const userAuth = await auth.use('api').authenticate()
        const user = await User.findOrFail(userAuth.id)

        const { ids, voucherCode, customerNote, userAddressId, paymentMethod } = request.body()

        if (!types.isArray(ids)) {
            return response.badRequest({
                message: 'Yêu cầu không hợp lệ'
            })
        }

        if (!paymentMethod || !await PaymentMethod.findBy('key', paymentMethod)) {
            return response.badRequest({
                message: 'Phương thức thanh toán không hợp lệ'
            })
        }

        const userAddress = await UserAddress.query()
            .where('id', userAddressId)
            .andWhere('user_id', user.id).first()
        if (!userAddress) {
            return response.badRequest({
                message: 'Địa chỉ không hợp lệ'
            })
        }

        const carts = await Cart.query().where('userId', user.id)
            .andWhereIn('id', ids)
            .preload('book')


        if (carts.length === 0) {
            return response.badRequest({
                message: 'Yêu cầu không hợp lệ'
            })
        }

        const productPrice = carts.reduce((sum, cart) => sum + (cart.book.price * cart.quantity), 0)

        // Phí ship tạm thời mặc định 29k
        const price = {
            productPrice,
            shipFee: 29000,
            discountPrice: 0,
            total: productPrice + 29000
        }

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

        try {
            const order = await user.related('orders').create({
                productPrice: productPrice,
                feePrice: price.shipFee,
                finalPrice: productPrice + price.shipFee,
                customerNote,
                voucher: voucherCode,
                discountPrice: price.discountPrice,
                paymentMethod
            })
            await order.refresh()

            if(voucherCode) {
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

        } catch {
            return response.serviceUnavailable({
                message: 'Có lỗi hệ thống xảy ra.'
            })
        }

        // Tiếp tục với tạo hóa đơn
        if (paymentMethod === 'cod') {
            return response.ok({
                message: 'Đã đặt hàng thành công',
                payment: null
            })
        } else if (paymentMethod === 'paypal') {
            PaypalController.create()
        }

    }
}
