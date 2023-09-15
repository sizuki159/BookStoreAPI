import { DateTime } from 'luxon'
import { BaseModel, HasMany, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import AddressDistrict from './AddressDistrict'

export default class AddressProvine extends BaseModel {
  @column({
    columnName: 'province_id',
    isPrimary: true
  })
  public provinceId: number
  
  @column()
  public name: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  //#region Relationship
  @hasMany(() => AddressDistrict, {
    foreignKey: 'provinceId',
    localKey: 'provinceId'
  })
  public districts: HasMany<typeof AddressDistrict>
  //#endregion
}
