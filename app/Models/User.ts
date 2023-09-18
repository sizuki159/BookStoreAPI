import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, beforeSave, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'
import UserLevel from './UserLevel'
import UserRole from './UserRole'

import { string } from '@ioc:Adonis/Core/Helpers'
import ApiToken from './ApiToken'


export default class User extends BaseModel {

  public static table = 'users'

  @column({ 
    isPrimary: true, 
    columnName: 'id' 
  })
  public id: number

  @column({
    columnName: 'email'
  })
  public email: string

  @column()
  public phoneNumber: string

  @column({
    columnName: 'password',
    serializeAs: null
  })
  public password: string

  @column()
  public fullname: string

  @column({
    columnName: 'money'
  })
  public money: number

  @column()
  public userLevelId: number

  @column()
  public userRoleId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(user: User) {
    if(user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  //#region Relationship
  @belongsTo(() => UserLevel)
  public userLevel: BelongsTo<typeof UserLevel>

  @belongsTo(() => UserRole)
  public userRole: BelongsTo<typeof UserRole>

  //#endregion

  //#region Function
  public static async generateRefreshToken(tokenHash: string) {
    const apiToken = await ApiToken.findByOrFail('token', tokenHash)
    const refreshToken = string.generateRandom(64)
    apiToken.refreshToken = refreshToken
    await apiToken.save()
    return refreshToken
  }
  //#endregion

}
