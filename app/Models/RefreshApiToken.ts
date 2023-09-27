import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import ApiToken from './ApiToken'

export default class RefreshApiToken extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  
  @column()
  public apiTokenId: number

  @column()
  public refreshToken: string

  @column()
  public isUsed: boolean

  @column()
  public isRevoked: boolean

  @column.dateTime({autoCreate: true})
  public expiresAt: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  //#region Relationship
  @belongsTo(() => ApiToken)
  public apiToken: BelongsTo<typeof ApiToken>
  //#endregion
}
