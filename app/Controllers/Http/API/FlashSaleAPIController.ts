import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import FlashSaleAPIFilterFields from 'App/FilterFields/API/FlashSaleAPIFilterFields'
import FlashSale from 'App/Models/FlashSale'
import FlashSaleHour from 'App/Models/FlashSaleHour'
import DatetimeUtils from 'App/Utils/DatetimeUtils'
import PageLimitUtils from 'App/Utils/PageLimitUtils'
import { DateTime } from 'luxon'

export default class FlashSaleAPIController {
    public async getFlashSaleTodayAccessable({ response }: HttpContextContract) {
        const flashSaleTodayAccessable = await FlashSale.query()
            .where('event_date', DateTime.now().set({ hour: 0, minute: 0, second: 0 }).toFormat(DatetimeUtils.FORMAT_DATETIME_WITH_SQL))
            .preload('hours', (hours) => {
                hours.where('time_end', '>=', DateTime.now().toFormat(DatetimeUtils.FORMAT_DATETIME_WITH_SQL))
                    .orderBy('time_start', 'asc') //dùng api khác để get sp by id flash sale hour
            })
            .first()

        // ******debug tesst chức năng, xóa và uncomment ở trên
        // const flashSaleTodayAccessable = await FlashSale.query()
        //     .where('event_date', DateTime.now().set({ day: 6, month: 12, year: 2023, hour: 0, minute: 0, second: 0 }).toFormat(DatetimeUtils.FORMAT_DATETIME_WITH_SQL))
        //     .preload('hours')
        //     .first()
        // ******debug tesst chức năng, xóa và uncomment ở trên

        if (flashSaleTodayAccessable) {
            return response.ok(flashSaleTodayAccessable.serialize(FlashSaleAPIFilterFields))
        }

        return response.noContent()
    }

    public async getFlashSaleHourProducts({ request, params, response }: HttpContextContract) {
        const { page, limit } = PageLimitUtils(request.qs())

        const flash_sale_hour_id = params.flash_sale_hour_id
        const flashSaleHour = await FlashSaleHour.find(flash_sale_hour_id)
        if (!flashSaleHour) {
            return response.notFound({
                'message': 'Không tìm thấy khung giờ sự kiện Flash Sale này'
            })
        }

        await flashSaleHour.load('products', (products) => {
            products.preload('product_info', (product_info) => {
                product_info.preload('author')
                    .preload('bookForm')
                    .preload('ccategory')
                    .preload('images', images => images.groupLimit(1))
                    .preload('language')
                    .preload('provider')
                    .preload('publisher')
            }).forPage(page, limit)
        })

        for (const flashSaleProduct of flashSaleHour.products) {

            const original_product = await Database.from('books')
                .where('isbn_code', flashSaleProduct.product_info.isbnCode)
                .first()

            const priceAfterDiscount = original_product.price * ((100 - flashSaleHour.percentDiscount) / 100)

            // Đếm số lượng đã bán
            let totalSoldNumber = 0
            const totalSoldNumberDb = await Database.from('order_items')
                .where('isbn_code', flashSaleProduct.product_info.isbnCode)
                .sum('quantity as total_sold_number')
            try {
                totalSoldNumber = totalSoldNumberDb[0].total_sold_number ? totalSoldNumberDb[0].total_sold_number : totalSoldNumber
            } catch { }

            flashSaleProduct.product_info.flashSaleInfo = {
                is_flash_sale: true,
                original_price: original_product.price,
                discount_percent: flashSaleHour.percentDiscount,
                price_after_discount: priceAfterDiscount,
                time_takes_place: {
                    time_start: flashSaleHour.timeStart.toFormat('HH:mm:ss'),
                    time_end: flashSaleHour.timeEnd.toFormat('HH:mm:ss'),
                },
                instock_info: {
                    sold_number: totalSoldNumber,
                    instock: flashSaleProduct.product_info.quantity,
                }
            }
        }

        return flashSaleHour
    }
}