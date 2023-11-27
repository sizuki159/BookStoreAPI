import { compose } from '@ioc:Adonis/Core/Helpers'
import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import { SoftDeletes } from '@ioc:Adonis/Addons/LucidSoftDeletes'
import { slugify } from '@ioc:Adonis/Addons/LucidSlugify'
import ResponseFormat from 'App/Utils/ResponseFormat'

export default class BookProvider extends compose(BaseModel, SoftDeletes) {
    @column({ isPrimary: true })
    public id: number

    @column({ columnName: 'provider_name' })
    public name: string

    @column()
    @slugify({
        strategy: 'dbIncrement',
        fields: ['name'],
        allowUpdates: true,
    })
    public slug: string

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
}
