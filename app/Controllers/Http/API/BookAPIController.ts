import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import APIBookFilterFields from 'App/FilterFields/API/APIBookFilterFields'
import Book from 'App/Models/Book'
import UserActivity from 'App/Models/UserActivity'
import { isIsbnCodeValid } from 'App/Utils/CheckIsbnCodeUtils'
import PageLimitUtils from 'App/Utils/PageLimitUtils'

export default class BookAPIController {
    public async getBookWithFilter({ auth, request, response }: HttpContextContract) {
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
            .preload('images', images => images.groupLimit(1))
            .preload('language')
            .preload('publisher')
            .preload('provider')
            .orderBy('created_at', 'desc')

        // Full text search
        if (search) {
            if (isIsbnCodeValid(search)) {
                query.andWhereRaw('MATCH(isbn_code) AGAINST(?)', [search])
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
        if (author_id) {
            query.andWhere('author_id', author_id)
        }

        // language
        if (lang_id) {
            query.andWhere('language_id', lang_id)
        }

        // child category
        if (ccategory_id) {
            // Nếu là người dùng thì sẽ lưu hoạt động
            // Mục đích để khuyến nghị thể loại sách
            try {
                const userAuth = await auth.use('api').authenticate()
                await UserActivity.create({
                    userId: userAuth.id,
                    childCategoryIdVisited: ccategory_id,
                })
            } catch { }
            
            query.andWhere('ccategory_id', ccategory_id)
        }

        // publisher
        if (publisher_id) {
            query.andWhere('publisher_id', publisher_id)
        }

        // provider
        if (provider_id) {
            query.andWhere('provider_id', provider_id)
        }

        // book form
        if (book_form_id) {
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

        return response.json(result.serialize(APIBookFilterFields))
    }

    public async getBookByIBSNCode({ params, response }: HttpContextContract) {
        const isbnCode = params.isbn_code
        const book = await Book.findBy('isbn_code', isbnCode)
        if (!book) {
            return response.notFound({
                message: `Không tìm thấy sách mang mã số ISBN <${isbnCode}>.`
            })
        }

        await Promise.all([
            book.load('ccategory'),
            book.load('author'),
            book.load('bookForm'),
            book.load('images', images => images.orderBy('id', 'desc')),
            book.load('language'),
            book.load('publisher'),
            book.load('provider'),
        ])

        return response.json(book.serialize(APIBookFilterFields))
    }

    public async getBookBySlug({ auth, params, response }: HttpContextContract) {
        const slug = params.slug
        const book = await Book.findBy('slug', slug)
        if (!book) {
            return response.notFound({
                message: `Không tìm thấy sách mang slug <${slug}>.`
            })
        }

        // Nếu là người dùng thì sẽ lưu hoạt động
        // Mục đích để khuyến nghị thể loại sách
        try {
            const userAuth = await auth.use('api').authenticate()
            await book.load('ccategory')
            await UserActivity.create({
                userId: userAuth.id,
                childCategoryIdVisited: book.ccategoryId,
                isbnCodeVisited: book.isbnCode
            })
        } catch { }

        await Promise.all([
            book.load('ccategory'),
            book.load('author'),
            book.load('bookForm'),
            book.load('images', images => images.orderBy('id', 'desc')),
            book.load('language'),
            book.load('publisher'),
            book.load('provider'),
        ])


        return response.json(book.serialize(APIBookFilterFields))
    }
}
