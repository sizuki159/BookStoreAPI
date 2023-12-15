import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ChildCategory from 'App/Models/ChildCategory'
import ParentCategory from 'App/Models/ParentCategory'

export default class AdminChildCategoryController {
    public async getAll({response}: HttpContextContract) {
        return response.json(await ChildCategory.all())
    }

    public async getAllWithTrashed({response}: HttpContextContract) {
        return response.json(await ChildCategory.onlyTrashed().exec())
    }

    public async create({request, response}: HttpContextContract) {
        const {pcategory_id, name} = request.body()
        const pCategory = await ParentCategory.find(pcategory_id)
        if(!pCategory) {
            return response.notFound({
                message: 'Không tìm thấy thể loại sách cha này!'
            })
        }

        const cCategory = await pCategory.related('childrenCategory').create({name})
        await cCategory.refresh()

        return response.created({
            message: 'Thêm thể loại sách con thành công!',
            data: cCategory
        })
    }

    public async update({request, response}: HttpContextContract) {
        const {ccategory_id, name} = request.body()
        const cCategory = await ChildCategory.find(ccategory_id)
        if(!cCategory) {
            return response.notFound({
                message: 'Không tìm thấy thể loại sách con này!'
            })
        }
        cCategory.name = name
        await cCategory.save()
        await cCategory.refresh()
        return response.json({
            message: 'Cập nhật thể loại sách con thành công!',
            data: cCategory
        })
    }

    public async delete({params, response}: HttpContextContract) {
        const ccategory_id = params.ccategory_id
        const cCategory = await ChildCategory.find(ccategory_id)
        if(!cCategory) {
            return response.notFound({
                message: 'Không tìm thấy thể loại sách con này!'
            })
        }
        await cCategory.delete()
        return response.json({
            message: 'Xóa thể loại sách con vào thùng rác thành công!'
        })
    }

    public async destroy({params, response}: HttpContextContract) {
        const ccategory_id = params.ccategory_id
        const cCategory = await ChildCategory.onlyTrashed().where('id', ccategory_id).first()
        if(!cCategory) {
            return response.notFound({
                message: 'Không tìm thấy thể loại sách con này trong thùng rác!'
            })
        }
        await cCategory.forceDelete()
        return response.json({
            message: 'Xóa vĩnh viễn thể loại sách con này thành công!'
        })
    }

    public async restore({params, response}: HttpContextContract) {
        const ccategory_id = params.ccategory_id
        const cCategory = await ChildCategory.onlyTrashed().where('id', ccategory_id).first()
        if(!cCategory) {
            return response.notFound({
                message: 'Không tìm thấy thể loại sách con này trong thùng rác!'
            })
        }
        await cCategory.restore()
        return response.json({
            message: 'Khôi phục thể loại sách con này thành công!'
        })
    }
}
