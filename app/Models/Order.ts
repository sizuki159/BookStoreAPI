import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, HasOne, ModelQueryBuilderContract, afterCreate, afterUpdate, beforeFetch, belongsTo, column, hasMany, hasOne } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import OrderItem from './OrderItem'
import UserAddress from './UserAddress'
import OrderReview from './OrderReview'
import ResponseFormat from 'App/Utils/ResponseFormat'
import Invoice from './Invoice'
import PaymentMethod from './PaymentMethod'
import UserNotification from './UserNotification'

export default class Order extends BaseModel {

    public static STATUS = {
        PENDING: 'pending',
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

    @belongsTo(() => PaymentMethod, {
        localKey: 'key',
        foreignKey: 'paymentMethod'
    })
    public payment: BelongsTo<typeof PaymentMethod>

    @hasMany(() => OrderItem, {
        localKey: 'id',
        foreignKey: 'orderId',
    })
    public items: HasMany<typeof OrderItem>

    @hasOne(() => OrderReview, {
        localKey: 'id',
        foreignKey: 'orderId',
    })
    public review: HasOne<typeof OrderReview>

    @hasOne(() => Invoice, {
        localKey: 'id',
        foreignKey: 'orderId',
    })
    public invoice: HasOne<typeof Invoice>
    //#endregion

    @beforeFetch()
    public static autoOrderByCreatedAt(query: ModelQueryBuilderContract<typeof Order>) {
        query.orderBy('created_at', 'desc')
    }


    @afterCreate()
    public static async createNotification(order: Order) {
        // Tạo thông báo cho người dùng
        try {
            await UserNotification.create({
                title: 'Có đơn hàng mới',
                message: `Bạn vừa có một đơn hàng mới #${order.id}`,
                userId: order.userId
            })
        } catch { }
    }

    // Khi cập nhật trạng thái đơn hàng
    // Tiến hành thông báo cho người dùng (Thông báo đẩy)
    @afterUpdate()
    public static async pushNotification(order: Order) {
        // Dựa vào trạng thái mà thông báo khác nhau
        switch (order.status) {
            case Order.STATUS.CONFIRMED:
                // Đơn hàng đã được xác nhận
                try {
                    await UserNotification.create({
                        title: 'Đơn hàng đã được xác nhận',
                        message: `Đơn hàng #${order.id} của bạn đã được xác nhận`,
                        userId: order.userId
                    })
                } catch { }
                break
            case Order.STATUS.DELIVERING:
                // Đơn hàng đang được giao
                try {
                    await UserNotification.create({
                        title: 'Đơn hàng đang được giao',
                        message: `Đơn hàng #${order.id} của bạn đã được gửi cho đơn vị vận chuyển`,
                        userId: order.userId
                    })
                } catch { }
                break
            case Order.STATUS.COMPLETED:
                try {
                    await UserNotification.create({
                        title: 'Đơn hàng đã hoàn thành',
                        message: `Đơn hàng #${order.id} của bạn đã hoàn thành`,
                        userId: order.userId
                    })
                } catch { }
                // Đơn hàng đã hoàn thành
                break
            case Order.STATUS.CANCELED:
                // Đơn hàng đã bị hủy
                try {
                    await UserNotification.create({
                        title: 'Đơn hàng đã bị hủy',
                        message: `Đơn hàng #${order.id} của bạn đã bị hủy`,
                        userId: order.userId
                    })
                } catch { }
                break
        }
    }
}
