import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BookForm from 'App/Models/BookForm'

export default class BookFormAPIController {
    public async getAllBookForm({response}: HttpContextContract) {
        return response.json(await BookForm.all())
    }
}
