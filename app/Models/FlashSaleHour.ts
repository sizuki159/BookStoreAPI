import { DateTime } from 'luxon'
import { BaseModel, HasMany, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import FlashSaleProduct from './FlashSaleProduct'

export default class FlashSaleHour extends BaseModel {
    @column({ isPrimary: true })
    public id: number

    @column()
    public flashSaleId: number

    @column()
    public percentDiscount: number

    @column.dateTime({ autoCreate: true })
    public timeStart: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public timeEnd: DateTime

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime

    //#region Relationship
    @hasMany(() => FlashSaleProduct, {
        localKey: 'id',
        foreignKey: 'flashSaleHourId'
    })
    public products: HasMany<typeof FlashSaleProduct>
    //#endregion
}
