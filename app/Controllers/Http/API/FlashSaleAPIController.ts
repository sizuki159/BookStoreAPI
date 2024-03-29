import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import FlashSaleAPIFilterFields from 'App/FilterFields/API/FlashSaleAPIFilterFields'
import FlashSale from 'App/Models/FlashSale'
import FlashSaleHour from 'App/Models/FlashSaleHour'
import Order from 'App/Models/Order'
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
                product_info.withTrashed()
                    .preload('author')
                    .preload('bookForm')
                    .preload('ccategory')
                    .preload('images', images => images.groupLimit(1))
                    .preload('language')
                    .preload('provider')
                    .preload('publisher')
            }).forPage(page, limit)
        })

        // Lấy flash sale hiện tại
        // Để so sánh xem phải đây là flash sale hiện tại hay không
        // Mục đích để hiện đã bán là 0 nếu là khác flash sale hiện tại
        const flashSaleNow = await FlashSaleHour.query()
            .where('time_start', '<=', DateTime.now().toFormat(DatetimeUtils.FORMAT_DATETIME_WITH_SQL))
            .andWhere('time_end', '>=', DateTime.now().toFormat(DatetimeUtils.FORMAT_DATETIME_WITH_SQL))
            .first()

        for (const flashSaleProduct of flashSaleHour.products) {

            const original_price = await flashSaleProduct.product_info.getOriginalPrice()
            const priceAfterDiscount = original_price * ((100 - flashSaleHour.percentDiscount) / 100)

            // Đếm số lượng đã bán
            let totalSoldNumber = 0
            const totalSoldNumberDb = await Database.from('order_items')
                .leftJoin('orders', 'order_items.order_id', 'orders.order_id')
                .where('order_items.isbn_code', flashSaleProduct.product_info.isbnCode)
                .andWhere('orders.status', '!=', Order.STATUS.CANCELED)
                .sum('order_items.quantity as total_sold_number')
            try {
                totalSoldNumber = totalSoldNumberDb[0].total_sold_number ? totalSoldNumberDb[0].total_sold_number : totalSoldNumber
            } catch { }

            // Nếu như flash sale này không phải là flash sale hiện tại
            // Thì set số lượng đã bán là 0
            if (flashSaleNow) {
                if (flashSaleNow.id !== flashSaleHour.id) {
                    totalSoldNumber = 0
                }
            }


            // Nếu sách đã bán cao hơn tổng sách có sẵn
            // Thì set lại tổng số sách là số sách đã bán cộng thêm số random bất kì
            // Để tránh trường hợp số sách đã bán vượt quá số sách có sẵn
            let instock: number = flashSaleProduct.product_info.quantity
            if (totalSoldNumber > instock) {
                instock = parseInt(totalSoldNumber.toString()) + instock
            }

            flashSaleProduct.product_info.flashSaleInfo = {
                is_flash_sale: true,
                original_price: original_price,
                discount_percent: flashSaleHour.percentDiscount,
                price_after_discount: priceAfterDiscount,
                time_takes_place: {
                    time_start: flashSaleHour.timeStart.toFormat('HH:mm:ss'),
                    time_end: flashSaleHour.timeEnd.toFormat('HH:mm:ss'),
                },
                instock_info: {
                    sold_number: totalSoldNumber,
                    instock: instock,
                }
            }
        }

        return flashSaleHour
    }

    public async getFlashSaleNow({ response }: HttpContextContract) {
        const flashSaleHour = await FlashSaleHour.query()
            .where('time_start', '<=', DateTime.now().toFormat(DatetimeUtils.FORMAT_DATETIME_WITH_SQL))
            .andWhere('time_end', '>=', DateTime.now().toFormat(DatetimeUtils.FORMAT_DATETIME_WITH_SQL))
            .first()

        if (flashSaleHour) {
            await flashSaleHour.load('products', (products) => {
                products.preload('product_info', (product_info) => {
                    product_info.withTrashed()
                        .preload('author')
                        .preload('bookForm')
                        .preload('ccategory')
                        .preload('images', images => images.groupLimit(1))
                        .preload('language')
                        .preload('provider')
                        .preload('publisher')
                }).groupLimit(5)
            })
            return response.json(flashSaleHour)
        }

        return response.ok({})
    }
}