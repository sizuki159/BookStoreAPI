import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BookForm from 'App/Models/BookForm'

export default class BookFormController {
    public async getAll({response}: HttpContextContract) {
        return response.json(await BookForm.all())
    }

    public async getAllWithTrashed({response}: HttpContextContract) {
        return response.json(await BookForm.onlyTrashed().exec())
    }

    public async add({request, response}: HttpContextContract) {
        const {form_name} = request.body()
        try {
            const bookForm = await BookForm.create({name: form_name})
            return response.created(bookForm)
        } catch (ex) {
            return response.serviceUnavailable({
                message: 'Thêm form sách thất bại!'
            })
        }
    }

    public async update({request, response}: HttpContextContract) {
        const {book_form_id, form_name} = request.body()
        const bookForm = await BookForm.find(book_form_id)
        if(!bookForm) {
            return response.notFound({
                message: 'Không tìm thấy form sách này!'
            })
        }
        
        bookForm.name = form_name
        await bookForm.save()
        await bookForm.refresh()
        return response.ok(bookForm)
    }

    public async delete({params, response}: HttpContextContract) {
        const book_form_id = params.book_form_id
        const bookForm = await BookForm.find(book_form_id)
        if(!bookForm) {
            return response.notFound({
                message: 'Không tìm thấy form sách này!'
            })
        }
        await bookForm.delete()
        return response.ok({
            message: 'Xóa form sách vào thùng rác thành công!'
        })
    }

    public async destroy({params, response}: HttpContextContract) {
        const book_form_id = params.book_form_id
        
        const bookForm =  await BookForm.onlyTrashed().where('id', book_form_id).first()
        if(!bookForm) {
            return response.notFound({
                message: 'Không tìm thấy form sách này trong thùng rác!'
            })
        }
        await bookForm.forceDelete()
        return response.ok({
            message: 'Đã xóa vĩnh viễn form sách này!'
        })
    }

    public async restore({params, response}: HttpContextContract) {
        const book_form_id = params.book_form_id
        const bookForm =  await BookForm.withTrashed().where('id', book_form_id).first()
        if(!bookForm) {
            return response.notFound({
                message: 'Không tìm thấy form sách này!'
            })
        }
        await bookForm.restore()

        return response.ok({
            message: 'Khôi phục form sách thành công!'
        })
    }
}
