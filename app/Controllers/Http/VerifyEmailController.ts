import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Token from 'App/Models/Token'
import User from 'App/Models/User'
import SettingUtils from 'App/Utils/SettingUtils'

export default class VerifyEmailController {
    public async verify({ response, params, view }: HttpContextContract) {

        const home_url = await SettingUtils.getSettingByKey(SettingUtils.KEY.FRONTEND_URL)

        const user = await Token.getTokenUser(params.token, 'VERIFY_EMAIL')

        // if token is invalid, not bound to a user, or does not match the auth user
        if (!user) {
            return view.render('verify_email', {
                image: '/img/delete.png',
                title: 'Xác nhận email thất bại!',
                content: 'Đường dẫn không hợp lệ',
                home_url: home_url,
            })
        }
        await Token.expireTokens(user, 'verifyEmailTokens')

        if (!user.isEmailVerified) {
            user.isEmailVerified = true
            await user.save()

            return view.render('verify_email', {
                image: '/img/success.png',
                title: 'Xác nhận email thành công!',
                content: 'Cảm ơn bạn đã xác nhận email của bạn. Tài khoản của bạn hiện đang hoạt động và sẵn sàng để sử dụng.',
                home_url: home_url,
            })
        }

        return view.render('verify_email', {
            image: '/img/success.png',
            title: 'Đã xác nhận email!',
            content: 'Tài khoản này đã xác nhận trước đó thành công. Tài khoản của bạn hiện đang hoạt động và sẵn sàng để sử dụng.',
            home_url: home_url,
        })
    }

    public async checkEmailVerified({ auth, response }: HttpContextContract) {
        try {
            const user = await auth.use('api').authenticate()
            if(user.is_email_verified) {
                return response.status(200)
            }
        } catch {}
        return response.unauthorized()
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
            return response.badRequest({
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
