import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BookLanguage from 'App/Models/BookLanguage'

export default class BookLanguageController {
    public async getAll({response}: HttpContextContract) {
        const bookLanguages = await BookLanguage.all()
        return response.json(bookLanguages)
    }

    public async create({request, response}: HttpContextContract) {
        const {language_name} = request.body()
        const language = await BookLanguage.create({languageName: language_name})
        return response.created(language)
    }
}
