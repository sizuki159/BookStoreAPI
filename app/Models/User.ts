import { compose } from '@ioc:Adonis/Core/Helpers'
import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, HasOne, beforeSave, belongsTo, column, hasMany, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'
import UserLevel from './UserLevel'
import UserRole from './UserRole'

import { string } from '@ioc:Adonis/Core/Helpers'
import ApiToken from './ApiToken'
import RefreshApiToken from './RefreshApiToken'
import UserAddress from './UserAddress'
import UserProfile from './UserProfile'
import { SoftDeletes } from '@ioc:Adonis/Addons/LucidSoftDeletes'
import Cart from './Cart'
import Order from './Order'
import Token from './Token'
import VerifyEmail from 'App/Mailers/VerifyEmail'
import ResetPasswordEmail from 'App/Mailers/ResetPasswordEmail'


export default class User extends compose(BaseModel, SoftDeletes) {

    public static table = 'users'

    public static STATUS = {
        ACTIVE: 'active',
        LOCKED: 'locked',
    }

    @column({
        isPrimary: true,
        columnName: 'id'
    })
    public id: number

    @column({
        columnName: 'email'
    })
    public email: string

    @column({
        columnName: 'password',
        serializeAs: null
    })
    public password: string

    @column({
        columnName: 'money'
    })
    public money: number

    @column()
    public userLevelId: number

    @column()
    public userRoleId: number

    @column()
    public isEmailVerified: boolean

    @column()
    public status: string

    @column.dateTime({ autoCreate: true, serializeAs: null })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
    public updatedAt: DateTime

    @beforeSave()
    public static async hashPassword(user: User) {
        if (user.$dirty.password) {
            user.password = await Hash.make(user.password)
        }
    }

    //#region Relationship
    @belongsTo(() => UserLevel)
    public userLevel: BelongsTo<typeof UserLevel>

    @belongsTo(() => UserRole)
    public userRole: BelongsTo<typeof UserRole>

    @hasMany(() => UserAddress)
    public addresses: HasMany<typeof UserAddress>

    @hasMany(() => Cart)
    public carts: HasMany<typeof Cart>

    @hasMany(() => Order)
    public orders: HasMany<typeof Order>

    @hasOne(() => UserProfile)
    public profile: HasOne<typeof UserProfile>


    @hasMany(() => Token)
    public tokens: HasMany<typeof Token>
  
    @hasMany(() => Token, {
      onQuery: query => query.where('type', 'PASSWORD_RESET')
    })
    public passwordResetTokens: HasMany<typeof Token>
  
    @hasMany(() => Token, {
      onQuery: query => query.where('type', 'VERIFY_EMAIL')
    })
    public verifyEmailTokens: HasMany<typeof Token>


    @hasMany(() => ApiToken, {
        localKey: 'id',
        foreignKey: 'userId',
      })
      public apiTokens: HasMany<typeof ApiToken>

    //#endregion

    //#region Function
    public static async generateRefreshToken(tokenHash: string) {
        const apiToken = await ApiToken.findByOrFail('token', tokenHash)
        const refreshToken = string.generateRandom(64)
        await RefreshApiToken.create({
            apiTokenId: apiToken.id,
            refreshToken,
        })
        return refreshToken
    }

    public async sendVerifyEmail() {
        const token = await Token.generateVerifyEmailToken(this)
        await new VerifyEmail(this, token).sendLater()
    }

    public async sendResetPasswordEmail() {
        const token = await Token.generatePasswordResetToken(this)
        await new ResetPasswordEmail(this, token).sendLater()
    }
    //#endregion

}
