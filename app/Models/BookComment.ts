import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Book from './Book'
import ResponseFormat from 'App/Utils/ResponseFormat'

export default class BookComment extends BaseModel {
    @column({ isPrimary: true })
    public id: number

    @column()
    public userId: number

    @column()
    public isbnCode: string

    @column()
    public rateStar: number

    @column()
    public content: string

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


    @belongsTo(() => User)
    public user: BelongsTo<typeof User>

    @belongsTo(() => Book, {
        localKey: 'isbnCode',
        foreignKey: 'isbnCode'
    })
    public product: BelongsTo<typeof Book>
}
