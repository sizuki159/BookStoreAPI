import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Book from './Book'
import ResponseFormat from 'App/Utils/ResponseFormat'

export default class BookImage extends BaseModel {
    @column({ isPrimary: true })
    public id: number

    @column()
    public imageSource: string

    @column({ serializeAs: null })
    public sourceLocation: string

    @column()
    public enable: 'on' | 'off'

    @column()
    public isbnCode: string

    @column.dateTime({
        autoCreate: true,
        serialize: (value: DateTime | null) => {
            return value ? value.toFormat(ResponseFormat.DATETIME) : value
        }
    })
    public createdAt: DateTime

    @column.dateTime({
        autoCreate: true,
        autoUpdate: true,
        serialize: (value: DateTime | null) => {
            return value ? value.toFormat(ResponseFormat.DATETIME) : value
        }
    })
    public updatedAt: DateTime

    @belongsTo(() => Book)
    public book: BelongsTo<typeof Book>
}
