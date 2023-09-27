import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class ApiToken extends BaseModel {
  public static table = 'api_tokens'
  
  @column({ isPrimary: true })
  public id: number

  @column({
    columnName: 'user_id'
  })
  public userId: number

  @column()
  public name: string
  
  @column()
  public type: string

  @column()
  public token: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User, {
    localKey: 'id',
    foreignKey: 'userId'
  })
  public user: BelongsTo<typeof User>

}
