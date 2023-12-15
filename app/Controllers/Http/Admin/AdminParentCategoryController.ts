import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ParentCategory from 'App/Models/ParentCategory'

export default class AdminParentCategoryController {
    public async getAll({response}: HttpContextContract) {
        return response.json(await ParentCategory.all())
    }

    public async getAllWithTrashed({response}: HttpContextContract) {
        return response.json(await ParentCategory.onlyTrashed().exec())
    }

    public async getDetail({params, response}: HttpContextContract) {
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

    public async create({request, response}: HttpContextContract) {
        const {name} = request.body()
        await ParentCategory.create({name})
        return response.created()
    }

    public async update({request, response}: HttpContextContract) {
        const {pcategory_id, name} = request.body()
        const pCategory = await ParentCategory.find(pcategory_id)
        if(!pCategory) {
            return response.notFound({
                message: 'Không tìm thấy thể loại sách cha này!'
            })
        }
        pCategory.name = name
        await pCategory.save()
        return response.ok('')
    }

    public async delete({params, response}: HttpContextContract) {
        const pcategory_id = params.pcategory_id
        const pCategory = await ParentCategory.find(pcategory_id)
        if(!pCategory) {
            return response.notFound({
                message: 'Không tìm thấy thể loại sách cha này!'
            })
        }
        await pCategory.delete()
        return response.ok({
            message: 'Đã xóa vào thùng rác thể loại sách cha này thành công!'
        })
    }

    public async destroy({params, response}: HttpContextContract) {
        const pcategory_id = params.pcategory_id
        const pCategory = await ParentCategory.onlyTrashed().where('id', pcategory_id).first()
        if(!pCategory) {
            return response.notFound({
                message: 'Không tìm thấy thể loại sách cha này trong thùng rác!'
            })
        }
        await pCategory.forceDelete()
        return response.ok({
            message: 'Đã xóa vĩnh viễn thể loại sách cha này!'
        })
    }

    public async restore({params, response}: HttpContextContract) {
        const pcategory_id = params.pcategory_id
        const pCategory = await ParentCategory.onlyTrashed().where('id', pcategory_id).first()
        if(!pCategory) {
            return response.notFound({
                message: 'Không tìm thấy thể loại sách cha này trong thùng rác!'
            })
        }
        await pCategory.restore()
        return response.ok({
            message: 'Đã khôi phục thể loại sách cha này!'
        })
    }
}
