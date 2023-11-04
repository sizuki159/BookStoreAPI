import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BookProvider from 'App/Models/BookProvider'
import PageLimitUtils from 'App/Utils/PageLimitUtils'

export default class BookProviderAPIController {
    public async getAll({request, response}: HttpContextContract) {
        const {page, limit} = PageLimitUtils(request.qs())
        return response.json(await BookProvider.query().orderBy('created_at', 'desc').paginate(page, limit))
    }
}