import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AdminOrderFilterFields from 'App/FilterFields/Admin/AdminOrderFilterFields'
import Order from 'App/Models/Order'
import PageLimitUtils from 'App/Utils/PageLimitUtils'

export default class BookOrderedController {
    public async getAllOrder({ request, response }: HttpContextContract) {
        const { page, limit } = PageLimitUtils(request.qs())
        const query = Order.query()
            .preload('items', (items) => {
                items.preload('product', (product) => {
                    product.preload('images', images => images.groupLimit(1))
                })
            })
            .preload('user')
            .preload('userAddress', (userAddress) => {
                userAddress.preload('wards', (wards) => {
                    wards.preload('district', (district) => {
                        district.preload('province')
                    })
                })
            })

        const orderList = await query.paginate(page, limit)
        return response.json(
            orderList.serialize(AdminOrderFilterFields)
        )
    }

    public async orderDetail({ params, response }: HttpContextContract) {
        const orderId = params.order_id

        const order = await Order.query()
            .where('order_id', orderId)
            .preload('items', (items) => {
                items.preload('product', (product) => {
                    product.preload('images', images => images.groupLimit(1))
                })
            })
            .preload('user')
            .preload('userAddress', (userAddress) => {
                userAddress.preload('wards', (wards) => {
                    wards.preload('district', (district) => {
                        district.preload('province')
                    })
                })
            })
            .first()

        if (order) {
            return response.json(order.serialize(AdminOrderFilterFields))
        }

        return response.notFound({
            message: 'Không tìm thấy đơn hàng này'
        })
    }
}