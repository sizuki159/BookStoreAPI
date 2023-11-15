import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Token from 'App/Models/Token'
import SettingUtils from 'App/Utils/SettingUtils'

export default class VerifyEmailController {
    public async verify({ response, params }: HttpContextContract) {
        const user = await Token.getTokenUser(params.token, 'VERIFY_EMAIL')

        // if token is invalid, not bound to a user, or does not match the auth user
        if (!user) {
            // handle invalid token
            return response.redirect(await SettingUtils.getSettingByKey(SettingUtils.KEY.FRONTEND_URL))
        }

        await Token.expireTokens(user, 'verifyEmailTokens')
        if (!user.isEmailVerified) {
            user.isEmailVerified = true
            await user.save()
        }
        return response.redirect(await SettingUtils.getSettingByKey(SettingUtils.KEY.FRONTEND_URL))
    }

    public async verifyResetPassword({ request, response }: HttpContextContract) {
        const { token, password } = request.body()
        if (password.length < 5) {
            return response.unprocessableEntity({
                message: 'Mật khẩu tối thiểu 5 ký tự',
                data: null,
            })
        }

        const user = await Token.getTokenUser(token, 'PASSWORD_RESET')

        // if token is invalid, not bound to a user, or does not match the auth user
        if (!user) {
            // handle invalid token
            return response.notFound({
                message: 'Liên kết không hợp lệ hoặc đã hết hạn',
                data: null,
            })
        }

        await Token.expireTokens(user, 'passwordResetTokens')

        user.password = password
        await user.save()

        // Đăng xuât toàn bộ phiên đăng nhập
        await user.load('apiTokens', apiTokens => apiTokens.delete())

        return response.json({
            message: 'Thay đổi mật khẩu thành công',
            data: null,
        })
    }
}
