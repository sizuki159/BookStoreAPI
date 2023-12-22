import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BookCommentAPIFilterFields from 'App/FilterFields/API/BookCommentAPIFilterFields'
import BookComment from 'App/Models/BookComment'
import PageLimitUtils from 'App/Utils/PageLimitUtils'

export default class BookCommentAPIController {
    public async getCommentByISBNCode({ request, params, response }: HttpContextContract) {
        const { page, limit } = PageLimitUtils(request.qs())
        const isbnCode = params.isbn_code

        const comments = await BookComment.query()
            .where('isbnCode', isbnCode)
            .preload('user', (user) => {
                user.preload('profile')
            })
            .orderBy('created_at', 'desc')
            .paginate(page, limit)

        return response.json(comments.serialize(BookCommentAPIFilterFields))
    }
}
