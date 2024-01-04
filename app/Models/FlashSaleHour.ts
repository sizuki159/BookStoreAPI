import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, beforeCreate, belongsTo, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import FlashSaleProduct from './FlashSaleProduct'
import ResponseFormat from 'App/Utils/ResponseFormat'
import FlashSale from './FlashSale'

export default class FlashSaleHour extends BaseModel {
    @column({ isPrimary: true })
    public id: number

    @column()
    public flashSaleId: number

    @column()
    public percentDiscount: number

    @column.dateTime({
        serialize: (value: DateTime | null) => {
            return value ? value.toFormat(ResponseFormat.TIME) : value
        }
    })
    public timeStart: DateTime

    @column.dateTime({
        serialize: (value: DateTime | null) => {
            return value ? value.toFormat(ResponseFormat.TIME) : value
        }
    })
    public timeEnd: DateTime


    @column.dateTime({
        autoCreate: true,
        serialize: (value: DateTime | null) => {
            return value ? value.toFormat(ResponseFormat.DATETIME) : value
        }
    })
    public createdAt: DateTime

    @column.dateTime({
        autoCreate: true,
        autoUpdate: true,
        serialize: (value: DateTime | null) => {
            return value ? value.toFormat(ResponseFormat.DATETIME) : value
        }
    })
    public updatedAt: DateTime

    //#region Relationship
    @hasMany(() => FlashSaleProduct, {
        localKey: 'id',
        foreignKey: 'flashSaleHourId'
    })
    public products: HasMany<typeof FlashSaleProduct>

    @belongsTo(() => FlashSale, {
        localKey: 'id',
        foreignKey: 'flashSaleId',
    })
    public flashSale: BelongsTo<typeof FlashSale>
    //#endregion


    @beforeCreate()
    public static async beforeCreateHooks (flashSaleHour: FlashSaleHour) {
        try {
            const flashSale = await FlashSale.find(flashSaleHour.flashSaleId)
            if(flashSale) {
                flashSaleHour.timeStart = flashSaleHour.timeStart.set({
                    day: flashSale.eventDate.day,
                    month: flashSale.eventDate.month,
                    year: flashSale.eventDate.year,
                })
    
                flashSaleHour.timeEnd = flashSaleHour.timeEnd.set({
                    day: flashSale.eventDate.day,
                    month: flashSale.eventDate.month,
                    year: flashSale.eventDate.year,
                })
            }
        } catch {

        }
    }
}
