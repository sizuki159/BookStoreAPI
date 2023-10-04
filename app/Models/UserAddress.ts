import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, afterCreate, afterUpdate, beforeCreate, beforeUpdate, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import AddressWard from './AddressWard'

export default class UserAddress extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number

  @column({columnName: 'default'})
  public isDefault: boolean

  @column()
  public street: string

  @column()
  public recipientName: string

  @column()
  public recipientPhone: string

  @column()
  public wardsId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
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
    if(userAddress.isDefault) {
      await this.query().where('user_id', userAddress.userId)
      .where('isDefault', true)
      .update('isDefault', false)
    } else {
      // Kiểm tra xem có địa chỉ trước đó không
      // Không thì địa chỉ đầu tiên là mặc định
      const addressBefore = await this.query().where('user_id', userAddress.userId).first()
      if(!addressBefore) {
        userAddress.isDefault = true
      }
    }
  }

  @beforeUpdate()
  public static async beforeUpdate(userAddress: UserAddress) {
    if(userAddress.isDefault) {
      await this.query().where('user_id', userAddress.userId)
      .where('isDefault', true)
      .update('isDefault', false)
    }
  }
}
