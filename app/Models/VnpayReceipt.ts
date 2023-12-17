import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import ResponseFormat from 'App/Utils/ResponseFormat'

export default class VnpayReceipt extends BaseModel {
    @column({ isPrimary: true })
    public id: number

    @column()
    public paymentId: string

    @column()
    public tmnCode: string

    @column()
    public amount: number

    @column()
    public bankCode: string

    @column()
    public bankTranNo: string

    @column()
    public cardType: string

    @column()
    public orderInfo: string

    @column()
    public payDate: string

    @column()
    public responseCode: string

    @column()
    public transactionNo: string

    @column()
    public transactionStatus: string

    @column()
    public secureHash: string

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
}
