import { compose } from '@ioc:Adonis/Core/Helpers'
import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, beforeCreate, beforeUpdate, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import AddressWard from './AddressWard'
import { SoftDeletes } from '@ioc:Adonis/Addons/LucidSoftDeletes'
import ResponseFormat from 'App/Utils/ResponseFormat'

export default class UserAddress extends compose(BaseModel, SoftDeletes) {
    @column({ isPrimary: true })
    public id: number

    @column()
    public userId: number

    @column({ columnName: 'default' })
    public isDefault: boolean

    @column()
    public street: string

    @column()
    public recipientName: string

    @column()
    public recipientPhone: string

    @column()
    public wardsId: number | string

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

    @belongsTo(() => AddressWard, {
        localKey: 'wardsId',
        foreignKey: 'wardsId',
    })
    public wards: BelongsTo<typeof AddressWard>
    //#endregion

    @beforeCreate()
    public static async beforeCreate(userAddress: UserAddress) {
        if (userAddress.isDefault) {
            await this.query().where('user_id', userAddress.userId)
                .where('isDefault', true)
                .update('isDefault', false)
        } else {
            // Kiểm tra xem có địa chỉ trước đó không
            // Không thì địa chỉ đầu tiên là mặc định
            const addressBefore = await this.query().where('user_id', userAddress.userId).first()
            if (!addressBefore) {
                userAddress.isDefault = true
            }
        }
    }

    @beforeUpdate()
    public static async beforeUpdate(userAddress: UserAddress) {
        if (userAddress.isDefault) {
            await this.query().where('user_id', userAddress.userId)
                .where('isDefault', true)
                .update('isDefault', false)
        }
    }
}
