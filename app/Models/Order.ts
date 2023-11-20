import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import OrderItem from './OrderItem'
import UserAddress from './UserAddress'

export default class Order extends BaseModel {

    public static STATUS = {
        UNPAID: 'unpaid',
        PAID: 'paid',
        CANCEL: 'cancel',
        SUCCESS: 'success'
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
    //#endregion
}
