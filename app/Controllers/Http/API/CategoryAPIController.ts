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

    public async getPCategoryDetail({params, response}: HttpContextContract) {
        const pcategory_id = params.pcategory_id
        const pCategory = await ParentCategory.find(pcategory_id)
        if(!pCategory) {
            return response.notFound({
                message: 'Không tìm thấy thể loại sách cha này!'
            })
        }
        await pCategory.load('childrenCategory')
        return response.json(pCategory)
    }
}
