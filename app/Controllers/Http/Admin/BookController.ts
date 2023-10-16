import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Book from 'App/Models/Book'
import BookValidator from 'App/Validators/BookValidator'

export default class BookController {

    public async getListBook({request, response}: HttpContextContract) {
        const {page, limit} = request.qs()
        return response.json(await Book.query().paginate(page, limit))
    }

    public async add({request, response}: HttpContextContract) {
        const payload = await request.validate(BookValidator)
        const book = await Book.create({
            ccategoryId: payload.ccategory_id,
            name: payload.name,
            price: payload.price,
            quantity: payload.quantity,
            desc: payload.desc,
            weight: payload.weight,
            numberOfPages: payload.number_of_pages,
            publishingYear: payload.publishing_year,
            languageId: payload.language_id,
            authorId: payload.author_id,
            publisherId: payload.publisher_id,
            bookFormId: payload.book_form_id,
        })

        return response.created(book)
    }
}
