import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class PaymentMethod extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public key: string
  
  @column()
  public name: string

  @column()
  public svg: string

  @column({serializeAs: null})
  public status: string

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime
}
