import { compose } from '@ioc:Adonis/Core/Helpers'
import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import { SoftDeletes } from '@ioc:Adonis/Addons/LucidSoftDeletes'

export default class Book extends compose(BaseModel, SoftDeletes) {
  @column({ isPrimary: true })
  public id: number

  @column({columnName: 'book_name'})
  public name: string

  @column()
  public price: number

  @column()
  public quantity: number

  @column()
  public desc: string

  @column()
  public weight: number

  @column()
  public numberOfPages: number
  
  @column()
  public publishingYear: number

  @column()
  public ccategoryId: number

  @column()
  public authorId: number

  @column()
  public publisherId: number

  @column()
  public languageId: number

  @column()
  public bookFormId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
