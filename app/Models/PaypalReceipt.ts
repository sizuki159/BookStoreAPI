import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class PaypalReceipt extends BaseModel {
    @column({ isPrimary: true })
    public id: number

    @column()
    public paymentId: string

    @column()
    public token: string | null

    @column()
    public payerId: string

    @column()
    public status: string

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime
}
