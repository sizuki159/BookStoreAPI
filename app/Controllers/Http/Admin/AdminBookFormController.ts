import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BookForm from 'App/Models/BookForm'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class AdminBookFormController {
    public async getAll({response}: HttpContextContract) {
        return response.json(await BookForm.all())
    }

    public async getAllWithTrashed({response}: HttpContextContract) {
        return response.json(await BookForm.onlyTrashed().exec())
    }

    public async add({request, response}: HttpContextContract) {
        const newFormSchema = schema.create({
            form_name: schema.string([
                rules.unique({
                    table: 'book_forms',
                    column: 'form_name'
                })
            ]),
        })
        const payload = await request.validate({
            schema: newFormSchema,
            messages: {
                'form_name.unique': 'Form sách này đã tồn tại.'
            }
        })
        try {
            const bookForm = await BookForm.create({name: payload.form_name})
            return response.created(bookForm)
        } catch (ex) {
            return response.serviceUnavailable({
                message: 'Thêm form sách thất bại!'
            })
        }
    }

    public async update({request, response}: HttpContextContract) {
        const {book_form_id} = request.body()
        const bookForm = await BookForm.find(book_form_id)
        if(!bookForm) {
            return response.notFound({
                message: 'Không tìm thấy form sách này!'
            })
        }
        
        const newFormSchema = schema.create({
            form_name: schema.string([
                rules.unique({
                    table: 'book_forms',
                    column: 'form_name',
                    whereNot: {id: book_form_id}
                })
            ]),
        })
        const payload = await request.validate({
            schema: newFormSchema,
            messages: {
                'form_name.unique': 'Form sách này đã tồn tại.'
            }
        })

        bookForm.name = payload.form_name
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
        const bookForm =  await BookForm.onlyTrashed().where('id', book_form_id).first()
        if(!bookForm) {
            return response.notFound({
                message: 'Không tìm thấy form sách này trong thùng rác!'
            })
        }
        await bookForm.restore()

        return response.ok({
            message: 'Khôi phục form sách thành công!'
        })
    }
}
