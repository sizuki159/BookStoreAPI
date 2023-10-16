import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Book from './Book'

export default class BookImage extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public imageSource: string

  @column()
  public enable: 'on' | 'off'

  @column()
  public bookId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Book)
  public book: BelongsTo<typeof Book>
}
