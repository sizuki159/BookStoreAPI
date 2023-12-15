import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BookLanguage from 'App/Models/BookLanguage'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class AdminBookLanguageController {
    public async getAll({response}: HttpContextContract) {
        return response.json(await BookLanguage.all())
    }

    public async getAllWithTrashed({response}: HttpContextContract) {
        return response.json(await BookLanguage.onlyTrashed().exec())
    }

    public async add({request, response}: HttpContextContract) {
        const newLanguageSchema = schema.create({
            language_name: schema.string([
                rules.unique({
                    table: 'book_languages',
                    column: 'language_name'
                })
            ]),
        })
        const payload = await request.validate({
            schema: newLanguageSchema,
            messages: {
                'language_name.unique': 'Ngôn ngữ sách này đã tồn tại.'
            }
        })

        try {
            const language = await BookLanguage.create({languageName: payload.language_name})
            return response.created(language)
        } catch (ex) {
            return response.serviceUnavailable({
                message: 'Thêm ngôn ngữ sách thất bại!'
            })
        }
    }

    public async update({request, response}: HttpContextContract) {
        const {language_id} = request.body()
        const bookLanguage = await BookLanguage.find(language_id)
        if(!bookLanguage) {
            return response.notFound({
                message: 'Không tìm thấy ngôn ngữ sách này!'
            })
        }

        const newLanguageSchema = schema.create({
            language_name: schema.string([
                rules.unique({
                    table: 'book_languages',
                    column: 'language_name',
                    whereNot: {id: language_id}
                })
            ]),
        })
        const payload = await request.validate({
            schema: newLanguageSchema,
            messages: {
                'language_name.unique': 'Ngôn ngữ sách này đã tồn tại.'
            }
        })

        bookLanguage.languageName = payload.language_name
        await bookLanguage.save()
        await bookLanguage.refresh()
        return response.ok(bookLanguage)
    }

    public async delete({params, response}: HttpContextContract) {
        const language_id = params.language_id
        const bookLanguage = await BookLanguage.find(language_id)
        if(!bookLanguage) {
            return response.notFound({
                message: 'Không tìm thấy ngôn ngữ sách này!'
            })
        }
        await bookLanguage.delete()
        return response.ok({
            message: 'Xóa ngôn ngữ sách vào thùng rác thành công!'
        })
    }

    public async destroy({params, response}: HttpContextContract) {
        const language_id = params.language_id
        
        const bookLanguage =  await BookLanguage.onlyTrashed().where('id', language_id).first()
        if(!bookLanguage) {
            return response.notFound({
                message: 'Không tìm thấy ngôn ngữ sách này trong thùng rác!'
            })
        }
        await bookLanguage.forceDelete()
        return response.ok({
            message: 'Đã xóa vĩnh viễn ngôn ngữ sách này!'
        })
    }

    public async restore({params, response}: HttpContextContract) {
        const language_id = params.language_id
        const bookLanguage =  await BookLanguage.onlyTrashed().where('id', language_id).first()
        if(!bookLanguage) {
            return response.notFound({
                message: 'Không tìm thấy ngôn ngữ sách này trong thùng rác!'
            })
        }
        await bookLanguage.restore()

        return response.ok({
            message: 'Khôi phục ngôn ngữ sách thành công!'
        })
    }
}
