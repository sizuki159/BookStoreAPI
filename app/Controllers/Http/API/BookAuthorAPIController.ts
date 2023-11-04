import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BookAuthor from 'App/Models/BookAuthor'
import PageLimitUtils from 'App/Utils/PageLimitUtils'

export default class BookAuthorAPIController {
    public async getAll({request, response}: HttpContextContract) {
        const {page, limit} = PageLimitUtils(request.qs())
        const books = await BookAuthor.query().orderBy('created_at', 'desc').paginate(page, limit)
        return response.json(books)
    }
}