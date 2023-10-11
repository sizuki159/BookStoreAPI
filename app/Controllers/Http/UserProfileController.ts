import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import UserProfile from 'App/Models/UserProfile'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Hash from '@ioc:Adonis/Core/Hash'



export default class UserProfileController {
    public async getInfo({auth}: HttpContextContract) {
        const userAuth = await auth.use('api').authenticate()
        const user = await User.findOrFail(userAuth.id)
        await user.load('profile')
        return user.profile.serialize({
            fields: ['firstname', 'lastname', 'phone_number', 'gender']
        })

    }

    public async updateOrCreate({auth, request, response}: HttpContextContract) {
        const {firstname, lastname, phone_number, gender} = request.body()
        const userAuth = await auth.use('api').authenticate()
        await UserProfile.updateOrCreate({
            userId: userAuth.id
        }, {
            firstname,
            lastname,
            phoneNumber: phone_number,
            gender
        })
        return response.created({
            message: 'Chỉnh sửa thông tin thành công!'
        })
    }

    public async changePassword({auth, request, response}: HttpContextContract) {
        const newPasswordSchema = schema.create({
            current_password: schema.string([
                rules.minLength(5)
            ]),
            new_password: schema.string([
                rules.minLength(5),
                rules.confirmed()
            ])
        })
        const payload = await request.validate({
            schema: newPasswordSchema,
            messages: {
                'current_password.required': 'Mật khẩu hiện tại không được trống!',
                'current_password.minLength': 'Mật khẩu hiện tại không hợp lệ!',
                'new_password.minLength': 'Mật khẩu yêu cầu ít nhất 5 ký tự!',
                'new_password_confirmation.confirmed': 'Mật khẩu xác nhận không khớp!',
            }
        })

        const userAuth = await auth.use('api').authenticate()
        if((await Hash.verify(userAuth.password!, payload.current_password))) {
            const user = await User.findOrFail(userAuth.id)
            user.password = payload.new_password
            await user.save()
            await auth.logout()
            return response.ok({
                message: 'Thay đổi mật khẩu thành công. Vui lòng đăng nhập lại!'
            })
        } else {
            return response.badRequest({
                message: 'Mật khẩu hiện tại không đúng!'
            })
        }
    }
}
