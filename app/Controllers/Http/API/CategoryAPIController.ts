import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CategoryFilterFields from 'App/FilterFields/API/CategoryFilterFields'
import ParentCategory from 'App/Models/ParentCategory'

export default class CategoryAPIController {
    public async getAllCategory({ response }: HttpContextContract) {
        const categories = await ParentCategory.query()
                .preload('childrenCategory')

        return response.json(categories.map((category) => {
            return category.serialize(CategoryFilterFields)
        }))
    }
}
