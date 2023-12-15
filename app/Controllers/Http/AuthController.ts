import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import RegisterValidator from 'App/Validators/RegisterValidator'
import ApiToken from 'App/Models/ApiToken'
import RefreshApiToken from 'App/Models/RefreshApiToken'
import { DateTime } from 'luxon';
import Token from 'App/Models/Token'
import EmailValidator from 'App/Validators/EmailValidator'
import UserFilterFields from 'App/FilterFields/User/UserFilterFields'
import DatetimeUtils from 'App/Utils/DatetimeUtils'

export default class AuthController {
    public async register({ auth, request, response }: HttpContextContract) {
        const { email, password } = await request.validate(RegisterValidator)

        const user = await User.create({
            email,
            password
        })
        await user.refresh()
        await user.sendVerifyEmail()

        return response.created({
            message: 'Đăng ký thành công!, vui lòng xác thực mail hộp thư',
            data: user
        })

        // await user.refresh()

        // const token = await auth.use('api').generate(user, {expiresIn: '20s'})
        // const apiToken = await ApiToken.findBy('token', token.tokenHash)
        // if(apiToken) {
        //     apiToken.jwt = token.token
        //     await apiToken.save()
        // }
        // const refreshToken = await User.generateRefreshToken(token.tokenHash)
        // await user.load('userLevel')
        // await user.load('userRole')

        // return response.created({
        //     "jwtToken": token.token,
        //     "refreshToken": refreshToken,
        //     "userInfo": user,
        // })
    }

    public async login({ auth, request, response }: HttpContextContract) {
        const { email, password } = request.body()

        try {
            const token = await auth.use('api').attempt(email, password, { expiresIn: '7d' })
            const user = await User.findByOrFail('email', email)

            if(user.status === User.STATUS.LOCKED) {
                await user.load('apiTokens', apiTokens => apiTokens.delete())
                return response.badRequest({
                    message: "Tài khoản của bạn đã bị khóa!",
                })
            }

            const apiToken = await ApiToken.findBy('token', token.tokenHash)
            if (apiToken) {
                apiToken.jwt = token.token
                await apiToken.save()
            }

            const refreshToken = await User.generateRefreshToken(token.tokenHash)
            await Promise.all([user.load('profile'), user.load('userLevel'), user.load('userRole')])

            return {
                "jwtToken": token.token,
                "refreshToken": refreshToken,
                "userInfo": user.serialize(UserFilterFields)
            }
        } catch (ex) {
            return response.badRequest({
                message: 'Đăng nhập thất bại!'
            })
        }
    }

    public async refreshToken({ auth, request, response }: HttpContextContract) {
        const { jwtToken, refreshToken } = request.body()

        try {
            // Kiểm tra xem jwt còn hợp lệ không
            const apiToken = await ApiToken.findBy('jwt', jwtToken)
            if (!apiToken) {
                return response.ok({
                    "success": false,
                    "message": "JWT is not valid",
                    "data": null
                })
            }

            // Jwt chưa hết hạn
            if (apiToken.expiresAt.toMillis() > DateTime.now().toMillis()) {
                return response.ok({
                    "success": false,
                    "message": "JWT has not yet expired",
                    "data": null
                })
            }

            // Kiểm tra refresh token
            const refreshApiToken = await RefreshApiToken.findBy('refresh_token', refreshToken)
            if (!refreshApiToken) {
                return response.ok({
                    "success": false,
                    "message": "Refresh token does not exist",
                    "data": null
                })
            }

            // Đã sử dụng
            if (refreshApiToken.isUsed) {
                return response.ok({
                    "success": false,
                    "message": "Refresh token has been used",
                    "data": null
                })
            }

            // Đã thu hồi
            if (refreshApiToken.isRevoked) {
                return response.ok({
                    "success": false,
                    "message": "Refresh token has been revoked",
                    "data": null
                })
            }

            await refreshApiToken.load('apiToken')
            if (refreshApiToken.apiToken.jwt !== jwtToken) {
                return response.ok({
                    "success": false,
                    "message": "Token does not match",
                    "data": null
                })
            }

            const tokenReAuth = await auth.use('api').loginViaId(refreshApiToken.apiToken.userId, { expiresIn: '7d' })

            refreshApiToken.isUsed = true
            await refreshApiToken.save()

            const apiTokenNew = await ApiToken.findBy('token', tokenReAuth.tokenHash)
            if (apiTokenNew) {
                apiTokenNew.jwt = tokenReAuth.token
                await apiTokenNew.save()
            }

            const refreshTokenNew = await User.generateRefreshToken(tokenReAuth.tokenHash)
            return {
                "success": true,
                "message": "Renew token success",
                "data": {
                    "jwtToken": tokenReAuth.token,
                    "refreshToken": refreshTokenNew
                }
            }

        } catch {
            return {
                "success": false,
                "message": "Something went wrong",
                "data": null
            }
        }
    }

    // [POST]
    public async requestRecovery({ request, response }: HttpContextContract) {
        const { email } = await request.validate(EmailValidator)
        const user = await User.findBy('email', email)
        if (!user) {
            return response.notFound({
                message: 'Không tìm thấy tài khoản này!',
                data: null,
            })
        }

        // Mail chỉ gửi lại cách nhau 15 phút
        const record = await Token.query()
            .where('user_id', user.id)
            .where('type', 'PASSWORD_RESET')
            .where('created_at', '>=', DateTime.now().minus({ minutes: 15 }).toFormat(DatetimeUtils.FORMAT_DATETIME_WITH_SQL))
            .first()
        if (!record) {
            await user.sendResetPasswordEmail()
            return response.json({
                message: 'Thành công, vui lòng kiểm tra email',
                data: null,
            })
        }

        return response.tooManyRequests({
            message: 'Quá nhiều yêu cầu. Vui lòng thử lại sau 15 phút.',
            data: null,
        })
    }

    // [POST]
    public async requestEmailVerify({ request, response }: HttpContextContract) {
        try {
            const { email } = await request.validate(EmailValidator)
            const user = await User.findBy('email', email)
            if (!user) {
                return response.badRequest({
                    message: 'Không tìm thấy tài khoản này!',
                    data: null,
                })
            }
            if (user.isEmailVerified) {
                return response.badRequest({
                    message: 'Tài khoản này đã được xác minh Email từ trước!',
                    data: null,
                })
            }

            // Mail chỉ gửi lại cách nhau 15 phút
            const record = await Token.query()
                .where('user_id', user.id)
                .where('type', 'VERIFY_EMAIL')
                .where('created_at', '>=', DateTime.now().minus({ minutes: 15 }).toFormat(DatetimeUtils.FORMAT_DATETIME_WITH_SQL))
                .first()
            if (!record) {
                await user.sendVerifyEmail()
                return response.json({
                    message: 'Đã gửi lại mail xác thực, vui lòng nhấn đường dẫn trong nội dung thư cung cấp',
                    data: null,
                })
            }

            return response.tooManyRequests({
                message: 'Quá nhiều yêu cầu. Vui lòng thử lại sau 15 phút.',
                data: null,
            })
        } catch (e) {
            return response.badRequest({
                message: 'Có lỗi xảy ra, vui lòng thử lại!',
                data: null,
            })
        }
    }
}
