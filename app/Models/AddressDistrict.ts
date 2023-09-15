import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import AddressProvine from './AddressProvine'
import AddressWard from './AddressWard'

export default class AddressDistrict extends BaseModel {
  @column({ isPrimary: true })
  public districtId: number | string

  @column()
  public provinceId: number | string

  @column()
  public name: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  //#region Relationship
  @belongsTo(() => AddressProvine, {
    localKey: 'provinceId',
    foreignKey: 'provinceId'
  })
  public province: BelongsTo<typeof AddressProvine>

  @hasMany(() => AddressWard, {
    localKey: 'districtId',
    foreignKey: 'districtId'
  })
  public wards: HasMany<typeof AddressWard>
  //#endregion
}
