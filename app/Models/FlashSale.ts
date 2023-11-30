import { DateTime } from 'luxon'
import { BaseModel, HasMany, column, computed, hasMany } from '@ioc:Adonis/Lucid/Orm'
import ResponseFormat from 'App/Utils/ResponseFormat'
import FlashSaleHour from './FlashSaleHour'

export default class FlashSale extends BaseModel {

    public static STATUS = {
        ACTIVE: 'active',
        INACTIVE: 'inactive'
    }

    @column({ isPrimary: true })
    public id: number

    @column()
    public eventName: string

    @column()
    public eventDesc: string

    @column()
    public status: 'active' | 'inactive'

    @column.dateTime({
        autoCreate: true,
        serialize: (value: DateTime | null) => {
            return value ? value.toFormat(ResponseFormat.DATE) : value
        }
    })
    public eventDate: DateTime

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

    //#region Relationship
    @hasMany(() => FlashSaleHour, {
        localKey: 'id',
        foreignKey: 'flashSaleId'
    })
    public hours: HasMany<typeof FlashSaleHour>
    //#endregion
}
