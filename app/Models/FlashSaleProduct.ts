import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Book from './Book'

export default class FlashSaleProduct extends BaseModel {
    @column({ isPrimary: true })
    public id: number

    @column()
    public flashSaleHourId: number

    @column()
    public productId: number

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime

    //#region Relationship
    @belongsTo(() => Book, {
        localKey: 'id',
        foreignKey: 'productId'
    })
    public product_info: BelongsTo<typeof Book>
    //#endregion
}
