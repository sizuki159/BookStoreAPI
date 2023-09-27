import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ParentCategory from 'App/Models/ParentCategory'

export default class ParentCategoryController {
    public async getAll({response}: HttpContextContract) {
        return response.json(await ParentCategory.all())
    }

    public async create({request, response}: HttpContextContract) {
        const {name} = request.body()
        await ParentCategory.create({name})
        return response.created()
    }

    public async update({request, response}: HttpContextContract) {
        const {pcategory_id, name} = request.body()
        const pCategory = await ParentCategory.find(pcategory_id)
        if(!pCategory) {
            return response.notFound()
        }
        pCategory.name = name
        await pCategory.save()
        return response.ok('')
    }
}
