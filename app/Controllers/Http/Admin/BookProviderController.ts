import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BookProvider from 'App/Models/BookProvider'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import PageLimitUtils from 'App/Utils/PageLimitUtils'

export default class BookProviderController {
    public async getAll({request, response}: HttpContextContract) {
        const {page, limit} = PageLimitUtils(request.qs())
        return response.json(await BookProvider.query().paginate(page, limit))
    }

    public async getAllWithTrashed({request, response}: HttpContextContract) {
        const {page, limit} = PageLimitUtils(request.qs())
        return response.json(await BookProvider.onlyTrashed().paginate(page, limit))
    }

    public async add({request, response}: HttpContextContract) {
        const newProviderSchema = schema.create({
            provider_name: schema.string([
                rules.unique({
                    table: 'book_providers',
                    column: 'provider_name'
                })
            ]),
        })
        const payload = await request.validate({
            schema: newProviderSchema,
            messages: {
                'provider_name.unique': 'Nhà cung cấp này đã tồn tại.'
            }
        })

        try {
            const bookProvider = await BookProvider.create({name: payload.provider_name})
            return response.created(bookProvider)
        } catch (ex) {
            return response.serviceUnavailable({
                message: 'Thêm nhà cung cấp sách thất bại!'
            })
        }
    }

    public async update({request, response}: HttpContextContract) {
        const {book_provider_id} = request.body()
        const bookProvider = await BookProvider.find(book_provider_id)
        if(!bookProvider) {
            return response.notFound({
                message: 'Không tìm thấy nhà cung cấp sách này!'
            })
        }

        const newProviderSchema = schema.create({
            provider_name: schema.string([
                rules.unique({
                    table: 'book_providers',
                    column: 'provider_name',
                    whereNot: {id: book_provider_id}
                })
            ]),
        })
        const payload = await request.validate({
            schema: newProviderSchema,
            messages: {
                'provider_name.unique': 'Nhà cung cấp này đã tồn tại.'
            }
        })
        
        bookProvider.name = payload.provider_name
        await bookProvider.save()
        await bookProvider.refresh()
        return response.ok(bookProvider)
    }

    public async delete({params, response}: HttpContextContract) {
        const book_provider_id = params.book_provider_id
        const bookProvider = await BookProvider.find(book_provider_id)
        if(!bookProvider) {
            return response.notFound({
                message: 'Không tìm thấy nhà cung cấp sách này!'
            })
        }
        await bookProvider.delete()
        return response.ok({
            message: 'Xóa nhà cung cấp sách vào thùng rác thành công!'
        })
    }

    public async destroy({params, response}: HttpContextContract) {
        const book_provider_id = params.book_provider_id
        
        const bookProvider =  await BookProvider.onlyTrashed().where('id', book_provider_id).first()
        if(!bookProvider) {
            return response.notFound({
                message: 'Không tìm thấy nhà cung cấp sách này trong thùng rác!'
            })
        }
        await bookProvider.forceDelete()
        return response.ok({
            message: 'Đã xóa vĩnh viễn nhà cung cấp sách này!'
        })
    }

    public async restore({params, response}: HttpContextContract) {
        const book_provider_id = params.book_provider_id
        const bookProvider =  await BookProvider.onlyTrashed().where('id', book_provider_id).first()
        if(!bookProvider) {
            return response.notFound({
                message: 'Không tìm thấy nhà cung cấp sách này trong thùng rác!'
            })
        }
        await bookProvider.restore()

        return response.ok({
            message: 'Khôi phục nhà cung cấp sách thành công!'
        })
    }
}
