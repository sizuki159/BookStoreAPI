import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class UserLevel extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({
    columnName: 'level_name'
  })
  public levelName: string

  @column()
  public discount: number

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime
}
