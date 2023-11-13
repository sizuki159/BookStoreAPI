import { compose } from '@ioc:Adonis/Core/Helpers'
import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, HasOne, belongsTo, column, hasMany, hasOne } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Book from './Book'
import { SoftDeletes } from '@ioc:Adonis/Addons/LucidSoftDeletes'

export default class Cart extends compose(BaseModel, SoftDeletes) {
    @column({ isPrimary: true })
    public id: number

    @column()
    public userId: number

    @column()
    public isbnCode: string

    @column()
    public quantity: number

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime

    //#region Relatonship
    @belongsTo(() => User)
    public user: BelongsTo<typeof User>

    @hasOne(() => Book, {
        foreignKey: 'isbnCode',
        localKey: 'isbnCode',
        serializeAs: 'book_info'
    })
    public book: HasOne<typeof Book>
    //#endregion
}
