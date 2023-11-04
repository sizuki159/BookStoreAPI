import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BookPublisher from 'App/Models/BookPublisher'
import PageLimitUtils from 'App/Utils/PageLimitUtils'

export default class BookPublisherAPIController {
    public async getAllPublisher({ request,response }: HttpContextContract) {
        const {page, limit} = PageLimitUtils(request.qs())
        return response.json(await BookPublisher.query().orderBy('created_at', 'desc').paginate(page, limit))
    }
}