import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BookLanguage from 'App/Models/BookLanguage'

export default class BookLanguageAPIController {
    public async getAll({response}: HttpContextContract) {
        return response.json(await BookLanguage.all())
    }
}