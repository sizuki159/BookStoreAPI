import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ParentCategory from 'App/Models/ParentCategory'

export default class CategoryAPIController {
    public async getAllCategory({ params, request, response }: HttpContextContract) {
        const categoryList = await ParentCategory.query()
                .preload('childrenCategory')

        return response.json(categoryList)
    }
}
