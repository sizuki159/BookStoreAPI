import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BookAuthor from 'App/Models/BookAuthor'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { types } from '@ioc:Adonis/Core/Helpers'
import PageLimitUtils from 'App/Utils/PageLimitUtils'

export default class BookAuthorController {
    public async getAll({request, response}: HttpContextContract) {
        const {page, limit} = PageLimitUtils(request.qs())
        const books = await BookAuthor.query().orderBy('created_at', 'desc').paginate(page, limit)
        return response.json(books)
    }

    public async getAllWithTrashed({request, response}: HttpContextContract) {
        const {page, limit} = PageLimitUtils(request.qs())
        return response.json(await BookAuthor.onlyTrashed().orderBy('created_at', 'desc').paginate(page, limit))
    }

    public async add({request, response}: HttpContextContract) {
        // const newAuthorSchema = schema.create({
        //     author_name: schema.string([
        //         rules.unique({
        //             table: 'book_authors',
        //             column: 'author_name'
        //         })
        //     ]),
        // })
        // const payload = await request.validate({
        //     schema: newAuthorSchema,
        //     messages: {
        //         'author_name.unique': 'Tác giả này đã tồn tại.'
        //     }
        // })

        const {author_name} = request.body()

        try {
            const bookAuthor = await BookAuthor.create({authorName: author_name})
            return response.created(bookAuthor)
        } catch (ex) {
            return response.serviceUnavailable({
                message: 'Thêm tác giả sách thất bại!'
            })
        }
    }

    public async update({request, response}: HttpContextContract) {
        const {book_author_id, author_name} = request.body()
        const bookAuthor = await BookAuthor.find(book_author_id)
        if(!bookAuthor) {
            return response.notFound({
                message: 'Không tìm thấy tác giả sách này!'
            })
        }

        // const newAuthorSchema = schema.create({
        //     author_name: schema.string([
        //         rules.unique({
        //             table: 'book_authors',
        //             column: 'author_name',
        //             whereNot: {id: book_author_id}
        //         })
        //     ]),
        // })
        // const payload = await request.validate({
        //     schema: newAuthorSchema,
        //     messages: {
        //         'author_name.unique': 'Tác giả này đã tồn tại.'
        //     }
        // })
        
        bookAuthor.authorName = author_name
        await bookAuthor.save()
        await bookAuthor.refresh()
        return response.ok(bookAuthor)
    }

    public async delete({params, response}: HttpContextContract) {
        const book_author_id = params.book_author_id
        const bookAuthor = await BookAuthor.find(book_author_id)
        if(!bookAuthor) {
            return response.notFound({
                message: 'Không tìm thấy tác giả sách này!'
            })
        }
        await bookAuthor.delete()
        return response.ok({
            message: 'Xóa tác giả sách vào thùng rác thành công!'
        })
    }

    public async destroy({params, response}: HttpContextContract) {
        const book_author_id = params.book_author_id
        
        const bookAuthor =  await BookAuthor.onlyTrashed().where('id', book_author_id).first()
        if(!bookAuthor) {
            return response.notFound({
                message: 'Không tìm thấy tác giả sách này trong thùng rác!'
            })
        }
        await bookAuthor.forceDelete()
        return response.ok({
            message: 'Đã xóa vĩnh viễn tác giả sách này!'
        })
    }

    public async restore({params, response}: HttpContextContract) {
        const book_author_id = params.book_author_id
        const bookAuthor =  await BookAuthor.onlyTrashed().where('id', book_author_id).first()
        if(!bookAuthor) {
            return response.notFound({
                message: 'Không tìm thấy tác giả sách này trong thùng rác!'
            })
        }
        await bookAuthor.restore()

        return response.ok({
            message: 'Khôi phục tác giả sách thành công!'
        })
    }
}
