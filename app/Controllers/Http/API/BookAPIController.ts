import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Book from 'App/Models/Book'
import PageLimitUtils from 'App/Utils/PageLimitUtils'

export default class BookAPIController {
    public async getBookWithFilter({params, request, response}: HttpContextContract) {
        let {search, min_price, max_price, order_by} = request.qs()
        let query = Book.query()

        // Full text search
        if(search) {
            query.andWhereRaw('MATCH(isbn_code, book_name, `desc`) AGAINST(? IN BOOLEAN MODE)', [search])
        }

        // Search theo giá
        if(min_price || max_price) {
            if(!min_price) {
                min_price = 0
            }
            if(!max_price) {
                max_price = 999999999999999
            }
            query.andWhereBetween('price', [min_price, max_price])
        }

        // order_by
        if(order_by) {
            if(order_by.includes(',')) {
                let col = order_by.split(',')[0]
                let direction = order_by.split(',')[1]
                query.orderBy(col, direction)
            }
        }

        // Phân trang
        const {page, limit} = PageLimitUtils(request.qs())
        const result = await query.paginate(page, limit)

        return result
    }
}
