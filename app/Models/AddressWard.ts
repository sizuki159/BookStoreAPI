import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import AddressDistrict from './AddressDistrict'

export default class AddressWard extends BaseModel {
  @column({ isPrimary: true })
  public wardsId: number | string

  @column()
  public districtId: number | string

  @column()
  public name: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  //#region Relationship
  @belongsTo(() => AddressDistrict, {
    foreignKey: 'districtId',
    localKey: 'districtId'
  })
  public district: BelongsTo<typeof AddressDistrict>
  //#endregion
}
