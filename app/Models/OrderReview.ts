import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Order from './Order'
import ResponseFormat from 'App/Utils/ResponseFormat'

export default class OrderReview extends BaseModel {
    @column({ isPrimary: true })
    public id: number

    @column()
    public orderId: number

    @column()
    public rateStar: number

    @column()
    public reviewComment: string

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

    @belongsTo(() => Order, {
        localKey: 'id',
        foreignKey: 'orderId'
    })
    public order: BelongsTo<typeof Order>
}
