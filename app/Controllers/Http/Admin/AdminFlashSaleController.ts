import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import FlashSale from 'App/Models/FlashSale'
import FlashSaleHour from 'App/Models/FlashSaleHour'
import FlashSaleProduct from 'App/Models/FlashSaleProduct'
import DatetimeUtils from 'App/Utils/DatetimeUtils'
import PageLimitUtils from 'App/Utils/PageLimitUtils'

export default class AdminFlashSaleController {

    public async getAllFlashSale({ request, response }: HttpContextContract) {
        const { page, limit } = PageLimitUtils(request.qs())
        const flashSales = await FlashSale.query()
            .orderBy('created_at', 'desc')
            .paginate(page, limit)
        return response.json(flashSales)
    }

    public async getFlashSaleAllHour({ params, response }: HttpContextContract) {
        const flash_sale_id = params.flash_sale_id
        const flashSaleHourList = await FlashSaleHour.query()
            .orderBy('created_at', 'desc')
            .where('flash_sale_id', flash_sale_id)
        return flashSaleHourList
    }

    public async getFlashSaleHourDetail({ params, response }: HttpContextContract) {
        const flash_sale_hour_id = params.flash_sale_hour_id
        const flashSaleHour = await FlashSaleHour.find(flash_sale_hour_id)
        if (!flashSaleHour) {
            return response.notFound({
                'message': 'Không tìm thấy khung giờ sự kiện Flash Sale này'
            })
        }
        await flashSaleHour.load('products', (products) => {
            products.preload('product_info')
        })
        return flashSaleHour
    }

    public async createFlashSale({ request, response }: HttpContextContract) {
        const newFlashSaleSchema = schema.create({
            'event_name': schema.string(),
            'event_date': schema.date({ format: 'dd-MM-yyyy' })
        })

        const payload = await request.validate({
            schema: newFlashSaleSchema,
            messages: {
                'event_name.required': 'Vui lòng nhập tên sự kiện',

                'event_date.required': 'Vui lòng chọn ngày bắt đầu sự kiện',
                'event_date.date.format': 'Ngày bắt đầu sự kiện có định dạng (dd-MM-yyyy)',
            }
        })
        try {

            const flashSaleExisted = await FlashSale.query()
                .where('event_date', '=', payload.event_date.toFormat(DatetimeUtils.FORMAT_DATETIME_WITH_SQL))
                .first()

            if (flashSaleExisted) {
                return response.badRequest({
                    'message': `Ngày ${payload.event_date.toFormat('dd/MM/yyyy')} đã có sự kiện <p>${flashSaleExisted.eventName}</p>`
                })
            }

            await FlashSale.create({
                eventName: payload.event_name,
                eventDate: payload.event_date,
            })

            return response.ok({
                message: 'Tạo sự kiện thành công'
            })
        } catch {
            return response.serviceUnavailable({
                'message': 'Tạo sự kiện flash sale thất bại'
            })
        }
    }

    public async createHourOnFlashSaleEvent({ request, response }: HttpContextContract) {
        const newFlashSaleHourSchema = schema.create({
            'flash_sale_id': schema.number([
                rules.exists({
                    column: 'id',
                    table: 'flash_sales'
                })
            ]),
            'percent_discount': schema.number([
                rules.range(0, 99)
            ]),
            'time_start': schema.date({ format: 'HH:mm:ss' }),
            'time_end': schema.date({ format: 'HH:mm:ss' }),
        })

        const payload = await request.validate({
            schema: newFlashSaleHourSchema,
            messages: {
                'flash_sale_id.required': 'Thiếu ID sự kiện flash sale',
                'flash_sale_id.exists': 'ID sự kiện không tồn tại trong hệ thống',

                'percent_discount.required': 'Vui lòng nhập số phần trăm giảm giá',
                'percent_discount.number': 'Phần trăm giảm giá phải là con số',
                'percent_discount.range': 'Phần trăm giảm giá chỉ từ 0-99%',

                'time_start.required': 'Vui lòng chọn khung giờ bắt đầu flash sale',
                'time_start.date.format': 'Khung giờ bắt đầu flash sale có định dạng (HH:mm:ss)',

                'time_end.required': 'Vui lòng chọn khung giờ kết thúc flash sale',
                'time_end.date.format': 'Khung giờ kết thúc flash sale có định dạng (HH:mm:ss)',
            }
        })

        try {

            if (payload.time_end < payload.time_start || payload.time_start.equals(payload.time_end)) {
                return response.badRequest({
                    'message': 'Giờ kết thúc không hợp lệ'
                })
            }
            try {
                if (Number.parseInt(payload.time_end.diff(payload.time_start).toFormat('s')) < 600) {
                    return response.badRequest({
                        'message': 'Thời gian flash sale tối thiểu là 10 phút'
                    })
                }
            } catch {

            }

            const flashSale = await FlashSale.findOrFail(payload.flash_sale_id)

            // Kiểm tra xem vào sự kiện này đã có khung giờ này chưa
            const flashSaleHourExisted = await FlashSaleHour.query()
                .where('flashSaleId', flashSale.id)
                .andWhere((condition) => {
                    condition.whereBetween('timeStart', [payload.time_start.toFormat(DatetimeUtils.FORMAT_DATETIME_WITH_SQL), payload.time_end.toFormat(DatetimeUtils.FORMAT_DATETIME_WITH_SQL)])
                        .orWhereBetween('timeEnd', [payload.time_start.toFormat(DatetimeUtils.FORMAT_DATETIME_WITH_SQL), payload.time_end.toFormat(DatetimeUtils.FORMAT_DATETIME_WITH_SQL)])
                })
                .first()

            if (flashSaleHourExisted) {
                return response.badRequest({
                    'message': `Khung giờ này flash sale này đã tồn tại`
                })
            }

            // Tạo khung giờ flash sale
            flashSale.related('hours').create({
                percentDiscount: payload.percent_discount,
                timeStart: payload.time_start,
                timeEnd: payload.time_end,
            })

            return response.ok({
                'message': 'Tạo khung giờ flash sale thành công'
            })
        } catch {
            return response.serviceUnavailable({
                'message': 'Tạo khung giờ flash sale thất bại'
            })
        }
    }

    public async addProductToFlashSaleHour({ request, response }: HttpContextContract) {
        const newFlashSaleProductSchema = schema.create({
            'flash_sale_hour_id': schema.number([
                rules.exists({
                    column: 'id',
                    table: 'flash_sale_hours'
                })
            ]),
            'isbn_code': schema.string([
                rules.exists({
                    column: 'isbn_code',
                    table: 'books'
                })
            ]),
        })

        const payload = await request.validate({
            schema: newFlashSaleProductSchema,
            messages: {
                'flash_sale_hour_id.required': 'Thiếu ID khung giờ sự kiện flash sale',
                'flash_sale_hour_id.exists': 'ID khung giờ sự kiện flash sale không tồn tại trên hệ thống',

                'isbn_code.required': 'Thiếu ISBN Code sản phẩm',
                'isbn_code.exists': 'ISBN Code sản phẩm không tồn tại trên hệ thống',
            }
        })

        try {
            // Kiểm tra xem khung giờ sự kiện này đã có sản phẩm này chưa
            const flashSaleProductExisted = await FlashSaleProduct.query()
                .where('flashSaleHourId', payload.flash_sale_hour_id)
                .andWhere('isbnCode', payload.isbn_code)
                .first()

            if (flashSaleProductExisted) {
                return response.badRequest({
                    'message': 'Sản phẩm này đã được thêm vào khung giờ sự kiện này trước đó'
                })
            }

            const flashSaleHour = await FlashSaleHour.findOrFail(payload.flash_sale_hour_id)
            await flashSaleHour.related('products').create({
                isbnCode: payload.isbn_code
            })

            return response.ok({
                'message': 'Thêm sản phẩm vào khung giờ sự kiên thành công'
            })
        } catch {
            return response.serviceUnavailable({
                'message': 'Thêm sản phẩm vào flash sale thất bại'
            })
        }
    }

    public async deleteProductFromFlashSaleHour({ params, response }: HttpContextContract) {
        const { flash_sale_hour_id, isbn_code } = params

        const flashSaleProduct = await FlashSaleProduct.query()
            .where('flashSaleHourId', flash_sale_hour_id)
            .andWhere('isbnCode', isbn_code)
            .first()

        if (flashSaleProduct) {
            try {
                await flashSaleProduct.delete()
                return response.ok({
                    'message': 'Xóa sản phẩm này ra khỏi khung giờ sự kiện thành công'
                })
            } catch {
                return response.serviceUnavailable({
                    'message': 'Có lỗi khi xóa, vui lòng thử lại sau'
                })
            }
        }

        return response.notFound({
            'message': 'Không tìm thấy sản phẩm này trong khung giờ sự kiện'
        })
    }

    public async updateFlashSaleHour({}: HttpContextContract) {
        
    }
}
