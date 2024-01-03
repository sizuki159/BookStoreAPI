import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, afterCreate, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Book from './Book'
import ResponseFormat from 'App/Utils/ResponseFormat'
import UserNotification from './UserNotification'

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

    // Người dùng bình luận xong
    // Tiến hành thông báo cho người dùng (Thông báo đẩy)
    @afterCreate()
    public static async pushNotification(comment: BookComment) {
        try {
            await comment.load('product')
            await UserNotification.create({
                title: 'Bình luận sách thành công',
                message: `Bạn vừa bình luận sách ${comment.product.name}`,
                userId: comment.userId
            })
        } catch { }
    }

}
