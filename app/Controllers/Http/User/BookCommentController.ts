import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import BookComment from 'App/Models/BookComment'

export default class BookCommentController {
    public async writeComment({ auth, request, response }: HttpContextContract) {

        const user = await auth.use('api').authenticate()

        const newCommentSchema = schema.create({
            'isbn_code': schema.string([
                rules.exists({
                    column: 'isbn_code',
                    table: 'books'
                })
            ]),
            'content': schema.string()
        })

        const payload = await request.validate({
            schema: newCommentSchema,
            messages: {
                'isbn_code.required': 'Thiếu mã sách bình luận',
                'isbn_code.exists': 'Mã sách này không tồn tại trên hệ thống',

                'content.required': 'Thiếu nội dung bình luận',
            }
        })
        try {
            await BookComment.create({
                isbnCode: payload.isbn_code,
                userId: user.id,
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

        const { comment_id, content } = request.body()

        const comment = await BookComment.query()
            .where('userId', user.id)
            .andWhere('id', comment_id)
            .first()

        if (comment) {
            try {
                comment.content = content
                await comment.save()
    
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

    public async deleteComment({ auth, params, response }: HttpContextContract) {
        const user = await auth.use('api').authenticate()

        const comment_id  = params.comment_id

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
