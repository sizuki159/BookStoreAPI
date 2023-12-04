import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Book from './Book'

export default class FlashSaleProduct extends BaseModel {
    @column({ isPrimary: true })
    public id: number

    @column()
    public flashSaleHourId: number

    @column()
    public isbnCode: string

    @column()
    public percentDiscount: number

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime

    //#region Relationship
    @belongsTo(() => Book, {
        localKey: 'isbnCode',
        foreignKey: 'isbnCode'
    })
    public product_info: BelongsTo<typeof Book>
    //#endregion
}
