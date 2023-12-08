import { compose } from '@ioc:Adonis/Core/Helpers'
import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, afterFetch, afterFind, belongsTo, column, computed, hasMany } from '@ioc:Adonis/Lucid/Orm'
import { SoftDeletes } from '@ioc:Adonis/Addons/LucidSoftDeletes'
import { slugify } from '@ioc:Adonis/Addons/LucidSlugify'


import BookImage from './BookImage'
import ChildCategory from './ChildCategory'
import BookAuthor from './BookAuthor'
import BookPublisher from './BookPublisher'
import BookForm from './BookForm'
import BookLanguage from './BookLanguage'
import BookProvider from './BookProvider'
import ResponseFormat from 'App/Utils/ResponseFormat'
import FlashSaleProduct from './FlashSaleProduct'
import DatetimeUtils from 'App/Utils/DatetimeUtils'
import FlashSaleHour from './FlashSaleHour'
import OrderItem from './OrderItem'
import Database from '@ioc:Adonis/Lucid/Database'

type FlashSaleInfo = {
    is_flash_sale: boolean,
    original_price: number,
    discount_percent: number,
    price_after_discount: number,
    time_takes_place: {
        time_start: string,
        time_end: string
    }
    instock_info: {
        sold_number: number
        instock: number,
    }
} | undefined

export default class Book extends compose(BaseModel, SoftDeletes) {
    @column({ isPrimary: true })
    public id: number

    @column()
    public isbnCode: string

    @column({ columnName: 'book_name' })
    public name: string

    @column()
    @slugify({
        strategy: 'dbIncrement',
        fields: ['name'],
        allowUpdates: true,
    })
    public slug: string

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

    @hasMany(() => FlashSaleProduct, {
        localKey: 'id',
        foreignKey: 'productId'
    })
    public flashSales: HasMany<typeof FlashSaleProduct>
    //#endregion


    @computed({ serializeAs: 'flash_sale_info' })
    public flashSaleInfo?: FlashSaleInfo

    public async getOriginalPrice(): Promise<number> {
        const product = await Database.from('books')
            .where('isbn_code', this.isbnCode)
            .first()
        if (product) {
            return product.price
        }
        return this.price
    }


    @afterFind()
    public static async afterFindHook(book: Book) {
        // Check Flash Sale
        const flashSaleAvailable = await FlashSaleHour.query()
            .where('time_start', '<=', DateTime.now().toFormat(DatetimeUtils.FORMAT_DATETIME_WITH_SQL))
            .andWhere('time_end', '>=', DateTime.now().toFormat(DatetimeUtils.FORMAT_DATETIME_WITH_SQL))
            .preload('products')
            .first()

        if (flashSaleAvailable) {
            const isMatch = flashSaleAvailable.products.some((item) => item.isbnCode === book.isbnCode);
            if (isMatch) {

                // Giá giảm
                const priceAfterDiscount = book.price * ((100 - flashSaleAvailable.percentDiscount) / 100)

                // Đếm số lượng đã bán
                let totalSoldNumber = 0
                const totalSoldNumberDb = await Database.from('order_items')
                    .where('isbn_code', book.isbnCode)
                    .sum('quantity as total_sold_number')
                try {
                    totalSoldNumber = totalSoldNumberDb[0].total_sold_number ? totalSoldNumberDb[0].total_sold_number : totalSoldNumber
                } catch { }

                book.flashSaleInfo = {
                    is_flash_sale: true,
                    original_price: book.price,
                    discount_percent: flashSaleAvailable.percentDiscount,
                    price_after_discount: priceAfterDiscount,
                    time_takes_place: {
                        time_start: flashSaleAvailable.timeStart.toFormat('HH:mm:ss'),
                        time_end: flashSaleAvailable.timeEnd.toFormat('HH:mm:ss'),
                    },
                    instock_info: {
                        sold_number: totalSoldNumber,
                        instock: book.quantity,
                    }
                }
                book.price = priceAfterDiscount
            }
        }
    }

    @afterFetch()
    public static async afterFetchHook(books: Book[]) {

        // Check Flash Sale
        const flashSaleAvailable = await FlashSaleHour.query()
            .where('time_start', '<=', DateTime.now().toFormat(DatetimeUtils.FORMAT_DATETIME_WITH_SQL))
            .andWhere('time_end', '>=', DateTime.now().toFormat(DatetimeUtils.FORMAT_DATETIME_WITH_SQL))
            .preload('products')
            .first()


        if (flashSaleAvailable) {
            let flashSaleAvailableProducts = new Map(flashSaleAvailable.products.map(flashSaleAvailable => [flashSaleAvailable.isbnCode, flashSaleAvailable]));
            let productHaveFlashSales = books.filter(book => flashSaleAvailableProducts.has(book.isbnCode));
            for (const product of productHaveFlashSales) {
                const priceAfterDiscount = product.price * ((100 - flashSaleAvailable.percentDiscount) / 100)

                // Đếm số lượng đã bán
                let totalSoldNumber = 0
                const totalSoldNumberDb = await Database.from('order_items')
                    .where('isbn_code', product.isbnCode)
                    .sum('quantity as total_sold_number')
                try {
                    totalSoldNumber = totalSoldNumberDb[0].total_sold_number ? totalSoldNumberDb[0].total_sold_number : totalSoldNumber
                } catch { }

                product.flashSaleInfo = {
                    is_flash_sale: true,
                    original_price: product.price,
                    discount_percent: flashSaleAvailable.percentDiscount,
                    price_after_discount: priceAfterDiscount,
                    time_takes_place: {
                        time_start: flashSaleAvailable.timeStart.toFormat('HH:mm:ss'),
                        time_end: flashSaleAvailable.timeEnd.toFormat('HH:mm:ss'),
                    },
                    instock_info: {
                        sold_number: totalSoldNumber,
                        instock: product.quantity,
                    }
                }
                product.price = priceAfterDiscount
            }
        }

    }
}
