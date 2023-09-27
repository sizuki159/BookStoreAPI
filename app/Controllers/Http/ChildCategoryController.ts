import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ChildCategory from 'App/Models/ChildCategory'

export default class ChildCategoryController {
    public async getAll({response}: HttpContextContract) {
        return response.json(await ChildCategory.all())
    }

    public async create({request, response}: HttpContextContract) {
        const {name} = request.body()
        await ChildCategory.create({name})
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

    public async delete({request, response}: HttpContextContract) {
        const {ccategory_id} = request.body()
        const cCategory = await ChildCategory.find(ccategory_id)
        if(!cCategory) {
            return response.notFound()
        }
        await cCategory.delete()
        return response.ok('')
    }
}
