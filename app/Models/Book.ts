import { compose } from '@ioc:Adonis/Core/Helpers'
import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import { SoftDeletes } from '@ioc:Adonis/Addons/LucidSoftDeletes'
import BookImage from './BookImage'
import ChildCategory from './ChildCategory'
import BookAuthor from './BookAuthor'
import BookPublisher from './BookPublisher'
import BookForm from './BookForm'
import BookLanguage from './BookLanguage'
import BookProvider from './BookProvider'

export default class Book extends compose(BaseModel, SoftDeletes) {
  @column({ isPrimary: true })
  public id: number

  @column()
  public isbnCode: string

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
  public providerId: number

  @column()
  public languageId: number

  @column()
  public bookFormId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  //#region Relationship
  @hasMany(() => BookImage, {
    localKey: 'isbnCode',
    foreignKey: 'isbnCode'
  })
  public images: HasMany<typeof BookImage>

  @belongsTo(() => ChildCategory, {
    foreignKey: 'ccategoryId'
  })
  public ccategory: BelongsTo<typeof ChildCategory>

  @belongsTo(() => BookAuthor, {
    foreignKey: 'authorId'
  })
  public author: BelongsTo<typeof BookAuthor>

  @belongsTo(() => BookPublisher, {
    foreignKey: 'publisherId'
  })
  public publisher: BelongsTo<typeof BookPublisher>

  @belongsTo(() => BookProvider, {
    foreignKey: 'providerId'
  })
  public provider: BelongsTo<typeof BookProvider>

  @belongsTo(() => BookForm, {
    foreignKey: 'bookFormId',
    serializeAs: 'book_form'
  })
  public bookForm: BelongsTo<typeof BookForm>

  @belongsTo(() => BookLanguage, {
    foreignKey: 'languageId'
  })
  public language: BelongsTo<typeof BookLanguage>
  //#endregion
}