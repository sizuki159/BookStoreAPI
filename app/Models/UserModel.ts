import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class UserModel extends BaseModel {

  public static table = 'users'

  @column({ 
    isPrimary: true, 
    columnName: 'id' 
  })
  public id: number

  @column({
    columnName: 'username'
  })
  public username: string

  @column({
    columnName: 'password'
  })
  public password: string

  @column({
    columnName: 'money'
  })
  public money: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
