import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import FlashSaleAPIFilterFields from 'App/FilterFields/API/FlashSaleAPIFilterFields'
import FlashSale from 'App/Models/FlashSale'
import DatetimeUtils from 'App/Utils/DatetimeUtils'
import { DateTime } from 'luxon'

export default class FlashSaleAPIController {
    public async getFlashSaleToday({ response }: HttpContextContract) {

        const flashSaleToDay = await FlashSale.query()
            .where('event_date', DatetimeUtils.DATE_NOW_WITH_OUT_TIME_SQL)
            .preload('hours', (hours) => {
                hours.orderBy('time_start', 'asc')
                    .preload('products', (products) => {
                        products.preload('product_info', (product_info) => {
                            product_info.preload('images')
                        })
                    })
            })
            .first()
        if (flashSaleToDay) {
            return response.ok(flashSaleToDay.serialize(FlashSaleAPIFilterFields))
        }

        return response.noContent()
    }
}