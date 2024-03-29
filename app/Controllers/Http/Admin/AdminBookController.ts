import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Book from 'App/Models/Book'
import BookValidator from 'App/Validators/BookValidator'
import AdminBookFilterFields from 'App/FilterFields/Admin/AdminBookFilterFields'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Drive from '@ioc:Adonis/Core/Drive'
import BookImage from 'App/Models/BookImage'
import PageLimitUtils from 'App/Utils/PageLimitUtils'
import { isIsbnCodeValid } from 'App/Utils/CheckIsbnCodeUtils'
import Database from '@ioc:Adonis/Lucid/Database'

export default class AdminBookController {

    public async getListBook({ request, response }: HttpContextContract) {
        let { search } = request.qs()
        const { page, limit } = PageLimitUtils(request.qs())
        const query = Book.query()
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
        const result = await query.paginate(page, limit)
        return response.json(result.serialize(AdminBookFilterFields))
    }

    public async getListBookTrashed({ request, response }: HttpContextContract) {
        const { page, limit } = PageLimitUtils(request.qs())
        const books = await Book.onlyTrashed()
            .preload('ccategory')
            .preload('author')
            .preload('bookForm')
            .preload('images', images => images.groupLimit(1))
            .preload('language')
            .preload('publisher')
            .preload('provider')
            .orderBy('created_at', 'desc')
            .paginate(page, limit)
        return response.json(books.serialize(AdminBookFilterFields))
    }

    public async getBookDetail({ params, response }: HttpContextContract) {
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
            book.load('images'),
            book.load('language'),
            book.load('publisher'),
            book.load('provider'),
        ])

        return response.json(book.serialize(AdminBookFilterFields))
    }

    public async add({ request, response }: HttpContextContract) {
        const payload = await request.validate(BookValidator)
        try {
            const book = await Book.create({
                isbnCode: payload.isbn_code,
                ccategoryId: payload.ccategory_id,
                name: payload.name,
                price: payload.price,
                quantity: payload.quantity,
                desc: payload.desc,
                weight: payload.weight,
                numberOfPages: payload.number_of_pages,
                publishingYear: payload.publishing_year,
                providerId: payload.provider_id,
                languageId: payload.language_id,
                authorId: payload.author_id,
                publisherId: payload.publisher_id,
                bookFormId: payload.book_form_id,
            })
            await Promise.all([
                book.load('ccategory'),
                book.load('author'),
                book.load('bookForm'),
                book.load('images'),
                book.load('language'),
                book.load('publisher'),
                book.load('provider'),
            ])
            return response.created(book.serialize(AdminBookFilterFields))
        } catch (ex) {
            return response.serviceUnavailable({
                // message: 'Lỗi hệ thống.'
                message: ex.message
            })
        }
    }

    public async addImage({ params, request, response }: HttpContextContract) {
        const isbnCode = params.isbn_code

        const book = await Book.findBy('isbn_code', isbnCode)
        if (!book) {
            return response.notFound({
                message: `Không tìm thấy sách mang mã số ISBN <${isbnCode}>.`
            })
        }

        const images = request.files('cover_image', {
            size: '15mb',
            extnames: ['jpg', 'png', 'jpeg', 'gif'],
        })

        try {
            for (let image of images) {
                if (image.hasErrors) {
                    return response.badRequest({
                        'message': 'Chỉ chấp nhận định dạng file (.jpg .png .jpeg .gif) và file nhỏ hơn 15 MB'
                    })
                }
                const fileName = `${book.isbnCode}_${image.clientName}`
                await image.moveToDisk(`book_img/${book.isbnCode}`, { name: fileName }, 's3')
                await book.related('images').create({
                    sourceLocation: image.fileName,
                    imageSource: image.filePath,
                    enable: 'on'
                })

            }
        } catch {
            await book.related('images').query().delete()
            return response.serviceUnavailable({
                message: 'Có lỗi xảy ra!'
            })
        }
        return response.ok({
            message: 'Thêm ảnh thành công.'
        })
    }

    public async deleteImage({ params, response }: HttpContextContract) {

        try {
            const bookImageId = params.book_image_id

            const bookImage = await BookImage.find(bookImageId)
            if (!bookImage) {
                return response.notFound({
                    message: 'Không tìm thấy ảnh này trong dữ liệu.'
                })
            }

            await bookImage.delete()
            // await Drive.use('s3').delete(bookImage.imageSource)
            return response.ok({
                message: 'Xóa ảnh thành công.'
            })
        } catch {
            return response.serviceUnavailable({
                message: 'Hệ thống bị lỗi.'
            })
        }
    }

    public async edit({ request, response }: HttpContextContract) {
        const newBookSchema = schema.create({
            "isbn_code": schema.string([rules.exists({
                table: 'books',
                column: 'isbn_code'
            })]),
            "ccategory_id": schema.number([
                rules.exists({ table: 'child_categories', column: 'id' })
            ]),
            "name": schema.string(),
            "price": schema.number([
                rules.unsigned()
            ]),
            "quantity": schema.number([
                rules.unsigned()
            ]),
            "desc": schema.string.optional(),
            "weight": schema.number.optional([
                rules.unsigned()
            ]),
            "number_of_pages": schema.number.optional([
                rules.unsigned()
            ]),
            "publishing_year": schema.number.optional(),
            "author_id": schema.number.optional([
                rules.exists({ table: 'book_authors', column: 'id' })
            ]),
            "publisher_id": schema.number.optional([
                rules.exists({ table: 'book_publishers', column: 'id' })
            ]),
            "language_id": schema.number.optional([
                rules.exists({ table: 'book_languages', column: 'id' })
            ]),
            "book_form_id": schema.number.optional([
                rules.exists({ table: 'book_forms', column: 'id' })
            ]),
            "provider_id": schema.number.optional([
                rules.exists({ table: 'book_providers', column: 'id' })
            ]),
        })

        const payload = await request.validate({
            schema: newBookSchema,
            messages: {
                'isbn_code.exists': 'Mã ISBN sách không tồn tại trong dữ liệu!',
                'ccategory_id.required': 'Cho biết sách này thuộc loại nào!',
                'ccategory_id.exists': 'Loại này không tồn tại trong dữ liệu!',
                'name.required': 'Thiếu tên sách!',
                'price.required': 'Thiếu giá tiền!',
                'price.unsigned': 'Giá tiền phải trên 0d!',
                'weight.unsigned': 'Cân nặng không được dưới 0',
                'number_of_pages.unsigned': 'Số trang phải lớn hơn 0',
                'quantity.unsigned': 'Số lượng phải trên 0!',
                'author_id.exists': 'Tác giả không tồn tại trong dữ liệu!',
                'publisher_id.exists': 'Nhà xuất bản không tồn tại trong dữ liệu!',
                'provider_id.exists': 'Nhà cung cấp không tồn tại trong dữ liệu!',
                'language_id.exists': 'Ngôn ngữ sách không tồn tại trong dữ liệu!',
                'book_form_id.exists': 'Hình thức sách không tồn tại trong dữ liệu!',
            }
        })

        const book = await Book.findByOrFail('isbn_code', payload.isbn_code)
        book.merge(payload)

        await book.save()
        await book.refresh()

        return response.ok({
            message: 'Cập nhật thông tin sách thành công!',
            data: book
        })
    }

    public async delete({ params, response }: HttpContextContract) {
        const isbnCode = params.isbn_code
        const book = await Book.findBy('isbn_code', isbnCode)
        if (book) {
            await book.delete()
            await Database.from('carts').delete().where('isbn_code', isbnCode)
            return response.ok({
                message: `Đã xóa sách <${book.name}> vào thùng rác thành công.`
            })
        }
        return response.notFound({
            message: `Không tìm thấy sách mang mã số ISBN <${isbnCode}>.`
        })
    }

    public async restore({ params, response }: HttpContextContract) {
        const isbnCode = params.isbn_code
        const book = await Book.onlyTrashed().where('isbn_code', isbnCode).first()
        if (book) {
            await book.restore()
            return response.ok({
                message: `Đã khôi phục sách <${book.name}> thành công.`
            })
        }
        return response.notFound({
            message: `Không tìm thấy sách mang mã số ISBN <${isbnCode}> ở trong thùng rác.`
        })
    }
}
