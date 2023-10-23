import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Book from 'App/Models/Book'

export default class BookAPIController {
    public async getBookWithFilter({params, request, response}: HttpContextContract) {
        const {search, min_price, max_price, order_by, page, limit} = request.qs()
        let query = Book.query()
        if(search) {
            query.where('*', search)
        }

        if(min_price) {
            query.min('1', '1')
        }

        return query.toSQL()
    }
}
