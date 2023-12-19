import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import ResponseFormat from 'App/Utils/ResponseFormat'

export default class UserProfile extends BaseModel {
    @column({ isPrimary: true })
    public id: number

    @column()
    public userId: number

    @column()
    public avatarSource: string | null

    @column()
    public avatarLocation: string | null

    @column()
    public firstname: string

    @column()
    public lastname: string

    @column()
    public phoneNumber: string

    @column()
    public gender: "male" | "female"

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
}
