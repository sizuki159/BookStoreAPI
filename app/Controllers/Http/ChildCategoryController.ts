import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ChildCategory from 'App/Models/ChildCategory'
import ParentCategory from 'App/Models/ParentCategory'

export default class ChildCategoryController {
    public async getAll({response}: HttpContextContract) {
        return response.json(await ChildCategory.all())
    }

    public async create({request, response}: HttpContextContract) {
        const {pcategory_id, name} = request.body()
        const pCategory = await ParentCategory.find(pcategory_id)
        if(!pCategory) {
            return response.notFound({
                message: 'Not found parent category!'
            })
        }

        await pCategory.related('childrenCategory').create({name})

        return response.created()
    }

    public async update({request, response}: HttpContextContract) {
        const {ccategory_id, name} = request.body()
        const cCategory = await ChildCategory.find(ccategory_id)
        if(!cCategory) {
            return response.notFound()
        }
        cCategory.name = name
        await cCategory.save()
        return response.ok('')
    }

    public async delete({params, response}: HttpContextContract) {
        const ccategory_id = params.ccategory_id
        const cCategory = await ChildCategory.find(ccategory_id)
        if(!cCategory) {
            return response.notFound()
        }
        await cCategory.delete()
        return response.ok('')
    }
}
