import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BookPublisher from 'App/Models/BookPublisher'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import PageLimitUtils from 'App/Utils/PageLimitUtils'

export default class AdminBookPublisherController {
    public async getAll({request, response}: HttpContextContract) {
        const {page, limit} = PageLimitUtils(request.qs())
        return response.json(await BookPublisher.query().orderBy('created_at', 'desc').paginate(page, limit))
    }

    public async getAllWithTrashed({request, response}: HttpContextContract) {
        const {page, limit} = PageLimitUtils(request.qs())
        return response.json(await BookPublisher.onlyTrashed().orderBy('created_at', 'desc').paginate(page, limit))
    }

    public async add({request, response}: HttpContextContract) {
        const newPublisherSchema = schema.create({
            publisher_name: schema.string([
                rules.unique({
                    table: 'book_publishers',
                    column: 'publisher_name'
                })
            ]),
        })
        const payload = await request.validate({
            schema: newPublisherSchema,
            messages: {
                'publisher_name.unique': 'Nhà xuất bản này đã tồn tại.'
            }
        })

        try {
            const bookPublisher = await BookPublisher.create({name: payload.publisher_name})
            return response.created(bookPublisher)
        } catch (ex) {
            return response.serviceUnavailable({
                message: 'Thêm nhà xuất bản sách thất bại!'
            })
        }
    }

    public async update({request, response}: HttpContextContract) {
        const {book_publisher_id} = request.body()
        const bookPublisher = await BookPublisher.find(book_publisher_id)
        if(!bookPublisher) {
            return response.notFound({
                message: 'Không tìm thấy nhà xuất bản sách này!'
            })
        }

        const newPublisherSchema = schema.create({
            publisher_name: schema.string([
                rules.unique({
                    table: 'book_publishers',
                    column: 'publisher_name',
                    whereNot: {id: book_publisher_id}
                })
            ]),
        })
        const payload = await request.validate({
            schema: newPublisherSchema,
            messages: {
                'publisher_name.unique': 'Nhà xuất bản này đã tồn tại.'
            }
        })
        
        bookPublisher.name = payload.publisher_name
        await bookPublisher.save()
        await bookPublisher.refresh()
        return response.ok(bookPublisher)
    }

    public async delete({params, response}: HttpContextContract) {
        const book_publisher_id = params.book_publisher_id
        const bookPublisher = await BookPublisher.find(book_publisher_id)
        if(!bookPublisher) {
            return response.notFound({
                message: 'Không tìm thấy nhà xuất bản sách này!'
            })
        }
        await bookPublisher.delete()
        return response.ok({
            message: 'Xóa nhà xuất bản sách vào thùng rác thành công!'
        })
    }

    public async destroy({params, response}: HttpContextContract) {
        const book_publisher_id = params.book_publisher_id
        
        const bookPublisher =  await BookPublisher.onlyTrashed().where('id', book_publisher_id).first()
        if(!bookPublisher) {
            return response.notFound({
                message: 'Không tìm thấy nhà xuất bản sách này trong thùng rác!'
            })
        }
        await bookPublisher.forceDelete()
        return response.ok({
            message: 'Đã xóa vĩnh viễn nhà xuất bản sách này!'
        })
    }

    public async restore({params, response}: HttpContextContract) {
        const book_publisher_id = params.book_publisher_id
        const bookPublisher =  await BookPublisher.onlyTrashed().where('id', book_publisher_id).first()
        if(!bookPublisher) {
            return response.notFound({
                message: 'Không tìm thấy nhà xuất bản sách này trong thùng rác!'
            })
        }
        await bookPublisher.restore()

        return response.ok({
            message: 'Khôi phục nhà xuất bản sách thành công!'
        })
    }
}
