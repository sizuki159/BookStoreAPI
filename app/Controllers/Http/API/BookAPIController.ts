import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AdminBookFilterFields from 'App/FilterFields/Admin/AdminBookFilterFields'
import Book from 'App/Models/Book'
import PageLimitUtils from 'App/Utils/PageLimitUtils'

export default class BookAPIController {
    public async getBookWithFilter({ params, request, response }: HttpContextContract) {
        let { search,
            min_price,
            max_price,
            author_id,
            lang_id,
            order_by,
            ccategory_id,
            publisher_id,
            provider_id,
            book_form_id,
        } = request.qs()

        let query = Book.query()
            .preload('ccategory')
            .preload('author')
            .preload('bookForm')
            .preload('images')
            .preload('language')
            .preload('publisher')
            .preload('provider')
            .orderBy('created_at', 'desc')
            
        // Full text search
        if (search) {
            // console.log('+' + search + ' ' + '+' + search + ' ' + '+' + search)
            if(search.length == 10 || search.length == 13) {
                query.andWhereRaw('MATCH(isbn_code) AGAINST(?)', [search])
                // Phân trang
                const { page, limit } = PageLimitUtils(request.qs())
                const result = await query.paginate(page, limit)
                return response.json(result.serialize(AdminBookFilterFields))
            } else {
                query.andWhereRaw('MATCH(book_name) AGAINST(?)', [search])
            }
        }

        // Search theo giá
        if (min_price || max_price) {
            if (!min_price) {
                min_price = 0
            }
            if (!max_price) {
                max_price = 999999999999999
            }
            query.andWhereBetween('price', [min_price, max_price])
        }

        // author
        if(author_id) {
            query.andWhere('author_id', author_id)
        }

        // language
        if(lang_id) {
            query.andWhere('language_id', lang_id)
        }

        // child category
        if(ccategory_id) {
            query.andWhere('ccategory_id', ccategory_id)
        }

        // publisher
        if(publisher_id) {
            query.andWhere('publisher_id', publisher_id)
        }

        // provider
        if(provider_id) {
            query.andWhere('provider_id', provider_id)
        }

        // book form
        if(book_form_id) {
            query.andWhere('book_form_id', book_form_id)
        }

        // order_by
        if (order_by) {
            if (order_by.includes(',')) {
                let col = order_by.split(',')[0]
                let direction = order_by.split(',')[1]
                query.orderBy(col, direction)
            }
        }
        // Phân trang
        const { page, limit } = PageLimitUtils(request.qs())
        const result = await query.paginate(page, limit)

        console.log(query.toQuery())

        return response.json(result.serialize(AdminBookFilterFields))
    }
}
