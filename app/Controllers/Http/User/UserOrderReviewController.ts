import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Order from 'App/Models/Order'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import OrderReview from 'App/Models/OrderReview'

export default class UserOrderReviewController {
    public async writeReview({ auth, request, response }: HttpContextContract) {
        const userAuth = await auth.use('api').authenticate()
        const newOrderReviewSchema = schema.create({
            'order_id': schema.number([
                rules.exists({
                    column: 'order_id',
                    table: 'orders',
                    where: {
                        'user_id': userAuth.id
                    }
                })
            ]),
            'rate_star': schema.enum(
                [1, 2, 3, 4, 5] as const
            ),
            'review_comment': schema.string.optional()
        })

        const payload = await request.validate({
            schema: newOrderReviewSchema,
            messages: {
                'order_id.required': 'Thiếu mã đơn hàng',
                'order_id.exists': 'Không tìm thấy đơn hàng này của bạn trên hệ thống',

                'rate_star.required': 'Thiếu số điểm đánh giá (số sao)',
                'rate_star.enum': 'Số điểm phải là số nguyên từ 1 đến 5',
            }
        })

        const orderByUser = await Order.query()
            .where('user_id', userAuth.id)
            .andWhere('order_id', payload.order_id)
            .first()

        if (!orderByUser) {
            return response.notFound({
                'message': 'Không tìm thấy đơn hàng này của bạn trên hệ thống'
            })
        }

        if (orderByUser.status !== Order.STATUS.SUCCESS) {
            return response.badRequest({
                'message': 'Chỉ có thể đánh giá được đơn hàng đã thành công'
            })
        }

        try {
            await OrderReview.updateOrCreate({
                orderId: payload.order_id
            }, {
                rateStar: payload.rate_star,
                reviewComment: payload.review_comment,
            })
        } catch {
            return response.serviceUnavailable({
                'message': 'Có lỗi hệ thống xảy ra'
            })
        }

        return response.ok({
            'message': 'Thành công'
        })
    }

    public async deleteReview({ auth, params, response }: HttpContextContract) {
        const userAuth = await auth.use('api').authenticate()
        const review_id = params.review_id

        const orderReview = await OrderReview.query()
            .andWhere('id', review_id)
            .preload('order')
            .first()
        if (orderReview) {
            if (orderReview.order.userId === userAuth.id) {
                try {
                    await orderReview.delete()
                    return response.ok({
                        'message': 'Xóa đánh giá thành công'
                    })
                } catch {
                    return response.serviceUnavailable({
                        'message': 'Xóa đánh giá thất bại, vui lòng thử lại sau'
                    })
                }
            }
        }

        return response.notFound({
            'message': 'Không tìm thấy đánh giá này của bạn'
        })
    }
}
