import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class Order extends BaseModel {
    @column({ isPrimary: true, columnName: 'order_id' })
    public id: number

    @column()
    public userId: number

    @column()
    public productPrice: number

    @column()
    public feePrice: number

    @column()
    public finalPrice: number

    @column()
    public discount: number

    @column()
    public voucher: string

    @column()
    public paymentMethod: string

    @column()
    public status: string

    @column()
    public customerNote: string

    @column()
    public logs: string

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime

    //#region Relationship
    @belongsTo(() => User)
    public user: BelongsTo<typeof User>
    //#endregion
}
