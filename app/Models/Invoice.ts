import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Order from './Order'

export default class Invoice extends BaseModel {
    public static STATUS = {
        UNPAID: 'unpaid',
        PAID: 'paid',
        CANCEL: 'cancel'
    }

    @column({ isPrimary: true })
    public id: number

    @column()
    public orderId: number

    @column()
    public paymentMethod: string

    @column()
    public paypalPaymentId: string | null

    @column()
    public vnpayPaymentId: string | null

    @column()
    public payUrl: string

    @column()
    public status: string

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime

    //#region Relationship
    @belongsTo(() => Order)
    public order: BelongsTo<typeof Order>
    //#endregion
}
