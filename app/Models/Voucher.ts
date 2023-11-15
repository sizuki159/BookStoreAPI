import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column } from '@ioc:Adonis/Lucid/Orm'

export default class Voucher extends BaseModel {

    public static STATUS = {
        ACTIVE: 'active',
        INACTIVE: 'inactive',
        REDEEMED: 'redeemed',
    }

    public static TYPE = {
        MEMBER_EXCLUSIVE: 'Member Exclusive',
        PERSONALIZED: 'Personalized',
        GENERAL: 'General',
    }

    @column({ isPrimary: true })
    public id: number

    @column()
    public voucherName: string | null

    @column()
    public voucherType: 'Member Exclusive' | 'Personalized' | 'General'

    @column()
    public voucherCode: string

    @column()
    public requireOrderMinPrice: number

    @column()
    public discountPercentage: number

    @column()
    public discountMaxPrice: number | null

    @column()
    public countUsed: number

    @column()
    public limited: number | null

    @column()
    public desc: string | null

    @column.dateTime()
    public startDate: DateTime

    @column.dateTime()
    public endDate: DateTime

    @column()
    public status: string

    @column()
    public userId: number | null

    @column()
    public userLevelId: number | null

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime


    @beforeCreate()
    public static async beforeCreate(voucher: Voucher) {
        switch (voucher.voucherType) {
            case this.TYPE.PERSONALIZED: {
                voucher.userLevelId = null
                break
            }
            case this.TYPE.MEMBER_EXCLUSIVE: {
                voucher.userId = null
                break
            }
            case this.TYPE.GENERAL: {
                voucher.userId = null
                voucher.userLevelId = null
                break
            }
        }
        // if (voucher.voucherType === this.TYPE.PERSONALIZED) {
        //     voucher.userLevelId = null
        // } else if (voucher.voucherType === this.TYPE.MEMBER_EXCLUSIVE) {
        //     voucher.userId = null
        // } else {
        //     voucher.userId = null
        //     voucher.userLevelId = null
        // }
    }
}
