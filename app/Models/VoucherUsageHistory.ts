import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import ResponseFormat from 'App/Utils/ResponseFormat'

export default class VoucherUsageHistory extends BaseModel {
    @column({ isPrimary: true })
    public id: number

    @column()
    public userId: number

    @column()
    public voucherId: number

    @column()
    public orderId: number

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
