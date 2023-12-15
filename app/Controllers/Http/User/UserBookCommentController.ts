import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import BookComment from 'App/Models/BookComment'

export default class UserBookCommentController {
    public async writeComment({ auth, request, response }: HttpContextContract) {

        const user = await auth.use('api').authenticate()

        const newCommentSchema = schema.create({
            'isbn_code': schema.string([
                rules.exists({
                    column: 'isbn_code',
                    table: 'books'
                })
            ]),
            'rate_star': schema.enum(
                [1, 2, 3, 4, 5] as const
            ),
            'content': schema.string()
        })

        const payload = await request.validate({
            schema: newCommentSchema,
            messages: {
                'isbn_code.required': 'Thiếu mã sách bình luận',
                'isbn_code.exists': 'Mã sách này không tồn tại trên hệ thống',

                'rate_star.required': 'Thiếu số điểm đánh giá (số sao)',
                'rate_star.enum': 'Số điểm phải là số nguyên từ 1 đến 5',

                'content.required': 'Thiếu nội dung bình luận',
            }
        })

        try {
            await BookComment.create({
                isbnCode: payload.isbn_code,
                userId: user.id,
                rateStar: payload.rate_star,
                content: payload.content
            })

            return response.ok({
                'message': 'Bình luận thành công'
            })
        } catch {
            return response.serviceUnavailable({
                'message': 'Hệ thống đang bảo trì chức năng bình luận'
            })
        }
    }

    public async editComment({ auth, request, response }: HttpContextContract) {
        const user = await auth.use('api').authenticate()

        const editCommentSchema = schema.create({
            'comment_id': schema.number([
                rules.exists({
                    column: 'id',
                    table: 'book_comments',
                    where: {
                        'user_id': user.id,
                    }
                })
            ]),
            'rate_star': schema.enum(
                [1, 2, 3, 4, 5] as const
            ),
            'content': schema.string()
        })

        const payload = await request.validate({
            schema: editCommentSchema,
            messages: {
                'comment_id.required': 'Thiếu comment ID',
                'comment_id.exists': 'ID comment này không tồn tại trên hệ thống',

                'rate_star.required': 'Thiếu số điểm đánh giá (số sao)',
                'rate_star.enum': 'Số điểm phải là số nguyên từ 1 đến 5',

                'content.required': 'Thiếu nội dung bình luận',
            }
        })

        try {
            await BookComment.query()
                .update('content', payload.content)
                .update('rateStar', payload.rate_star)
                .where('id', payload.comment_id)

            return response.ok({
                'message': 'Thành công'
            })
        } catch {
            return response.serviceUnavailable({
                'message': 'Hệ thống đang bảo trì chức năng bình luận'
            })
        }

    }

    public async deleteComment({ auth, params, response }: HttpContextContract) {
        const user = await auth.use('api').authenticate()

        const comment_id = params.comment_id

        const comment = await BookComment.query()
            .where('userId', user.id)
            .andWhere('id', comment_id)
            .first()

        if (comment) {
            try {
                await comment.delete()
                return response.ok({
                    'message': 'Thành công'
                })
            } catch {
                return response.serviceUnavailable({
                    'message': 'Hệ thống đang bảo trì chức năng bình luận'
                })
            }
        }
        return response.notFound({
            'message': 'Không tìm thấy comment này của bạn'
        })
    }
}
