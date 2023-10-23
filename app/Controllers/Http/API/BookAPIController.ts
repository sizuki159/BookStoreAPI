import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Book from 'App/Models/Book'

export default class BookAPIController {
    public async getBookWithFilter({params, request, response}: HttpContextContract) {
        let {search, min_price, max_price, order_by, page, limit} = request.qs()
        let result: any = Book.query()

        // Full text search
        if(search) {
            result.whereRaw('MATCH(isbn_code, book_name, `desc`) AGAINST(?)', [search])
        }

        // Search theo giá
        if(min_price || max_price) {
            if(!min_price) {
                min_price = 0
            }
            if(!max_price) {
                max_price = 999999999999999
            }
            result.whereBetween('price', [min_price, max_price])
        }

        // order_by
        if(order_by.includes(',')) {
            let col = order_by.split(',')[0]
            let direction = order_by.split(',')[1]
            result.orderBy(col, direction)
        }

        // Phân trang
        if(page || limit) {
            if(!page) {
                page = 1
            }
            if(!limit) {
                limit = 10
            }
            result = await result.paginate(page, limit)
        }

        return result
    }
}
