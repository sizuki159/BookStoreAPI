import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ParentCategory from 'App/Models/ParentCategory'

export default class ParentCategoryController {
    public async getAll({response}: HttpContextContract) {
        return response.json(await ParentCategory.all())
    }

    public async getDetail({params, response}: HttpContextContract) {
        const pcategory_id = params.pcategory_id
        const pCategory = await ParentCategory.find(pcategory_id)
        if(!pCategory) {
            return response.notFound()
        }
        await pCategory.load('childrenCategory')
        return response.json(pCategory)
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

    public async delete({request, response}: HttpContextContract) {
        const {pcategory_id} = request.body()
        const pCategory = await ParentCategory.find(pcategory_id)
        if(!pCategory) {
            return response.notFound()
        }
        await pCategory.delete()
        return response.ok('')
    }
}
