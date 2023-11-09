import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Cart from 'App/Models/Cart'
import User from 'App/Models/User'
import { types } from '@ioc:Adonis/Core/Helpers'
import Order from 'App/Models/Order'

export default class UserOrderController {
    public async createOrder({auth, request, response}: HttpContextContract) {
        const userAuth = await auth.use('api').authenticate()
        const user = await User.findOrFail(userAuth.id)

        const {ids, voucher, customerNote} = request.body()

        if(!types.isArray(ids)) {
            return response.badRequest({
                message: 'Yêu cầu không hợp lệ'
            })
        }

        const carts = await Cart.query().where('userId', user.id)
                                    .andWhereIn('id', ids)
                                    .preload('book')
        const productPrice = carts.reduce((sum, cart) => sum + (cart.book.price * cart.quantity), 0)
        try {
            await user.related('orders').create({
                productPrice: productPrice,
                feePrice: 29000,
                finalPrice: productPrice + 29000 
            })

            for (const cart of carts) {
                await cart.delete()
            }

        } catch {
            return response.serviceUnavailable({
                message: 'Có lỗi hệ thống xảy ra.'
            })
        }

        return response.json({
            message: 'Làm tiếp'
        })

    }
}
