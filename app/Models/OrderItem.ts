import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasOne, belongsTo, column, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Book from './Book'
import Order from './Order'
import ResponseFormat from 'App/Utils/ResponseFormat'

export default class OrderItem extends BaseModel {
    @column({ isPrimary: true })
    public id: number

    @column()
    public orderId: number

    @column()
    public isbnCode: string

    @column()
    public quantity: number

    @column()
    public pricePerUnit: number

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
    @hasOne(() => Book, {
        localKey: 'isbnCode',
        foreignKey: 'isbnCode'
    })
    public product: HasOne<typeof Book>
    
    @belongsTo(() => Order, {
        localKey: 'id',
        foreignKey: 'orderId'
    })
    public order: BelongsTo<typeof Order>
    //#endregion
}
