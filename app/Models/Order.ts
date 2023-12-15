import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import OrderItem from './OrderItem'
import UserAddress from './UserAddress'
import OrderReview from './OrderReview'
import ResponseFormat from 'App/Utils/ResponseFormat'

export default class Order extends BaseModel {

    public static STATUS = {
        WAITING: 'success',
        CONFIRMED: 'confirmed',
        DELIVERING: 'delivering',
        COMPLETED: 'completed',
        CANCELED: 'canceled',
    }

    public static PAYMENT_STATUS = {
        UNPAID: 'unpaid',
        PAID: 'paid',
        REFUNDED: 'refunded',
    }

    @column({ isPrimary: true, columnName: 'order_id' })
    public id: number

    @column()
    public userId: number

    @column()
    public userAddressId: number

    @column()
    public productPrice: number

    @column()
    public feePrice: number

    @column()
    public finalPrice: number

    @column()
    public discountPrice: number

    @column()
    public voucher: string

    @column()
    public paymentMethod: string

    @column()
    public status: string

    @column()
    public paymentStatus: string

    @column()
    public customerNote: string

    @column()
    public logs: string

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
    @belongsTo(() => User)
    public user: BelongsTo<typeof User>

    @belongsTo(() => UserAddress, {
        localKey: 'id',
        foreignKey: 'userAddressId'
    })
    public userAddress: BelongsTo<typeof UserAddress>

    @hasMany(() => OrderItem, {
        localKey: 'id',
        foreignKey: 'orderId',
    })
    public items: HasMany<typeof OrderItem>

    @hasMany(() => OrderReview, {
        localKey: 'id',
        foreignKey: 'orderId',
    })
    public reviews: HasMany<typeof OrderReview>
    //#endregion
}
