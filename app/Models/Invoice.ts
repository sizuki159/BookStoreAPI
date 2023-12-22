import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Order from './Order'
import ResponseFormat from 'App/Utils/ResponseFormat'
import { string } from '@ioc:Adonis/Core/Helpers'
import SettingUtils from 'App/Utils/SettingUtils'

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

    @column()
    public hashPrinter: string | null

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
    @belongsTo(() => Order)
    public order: BelongsTo<typeof Order>
    //#endregion

    public async printInvoice() {
        this.hashPrinter = string.generateRandom(64)
        await this.save()

        const serverUrl = await SettingUtils.getSettingByKey('BACKEND_URL')

        return `${serverUrl}/api/payment/invoice/${this.id}/print?hash=` + this.hashPrinter
    }
}
