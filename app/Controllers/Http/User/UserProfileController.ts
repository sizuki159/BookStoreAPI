import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import UserProfile from 'App/Models/UserProfile'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Hash from '@ioc:Adonis/Core/Hash'
import UserProfileFilterFields from 'App/FilterFields/User/UserProfileFilterFields'
import RandomNumber from 'App/Utils/RandomNumber'



export default class UserProfileController {
    public async getInfo({ auth, response }: HttpContextContract) {
        const userAuth = await auth.use('api').authenticate()
        const user = await User.findOrFail(userAuth.id)
        await user.load('profile')
        if (user.profile) {
            return user.profile.serialize(UserProfileFilterFields)
        }
        return response.notFound({
            'message': 'Bạn chưa cập nhật thông tin cá nhân!'
        })
    }

    public async updateOrCreate({ auth, request, response }: HttpContextContract) {
        try {
            const { firstname, lastname, phone_number, gender } = request.body()
            const userAuth = await auth.use('api').authenticate()
            const userProfile = await UserProfile.updateOrCreate({
                userId: userAuth.id
            }, {
                firstname,
                lastname,
                phoneNumber: phone_number,
                gender
            })
            const updatedData = userProfile.toJSON()
            return response.created({
                updated_profile: updatedData
            })
        }
        catch (e) {
            return response.badRequest({
                'message': 'Cập nhật thông tin thất bại!'
            })
        }
    }

    public async changePassword({ auth, request, response }: HttpContextContract) {
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
        if ((await Hash.verify(userAuth.password!, payload.current_password))) {
            const user = await User.findOrFail(userAuth.id)
            user.password = payload.new_password
            await user.save()
            return response.ok({
                'message': 'Thay đổi mật khẩu thành công!'
            })
        } else {
            return response.badRequest({
                'message': 'Mật khẩu hiện tại không đúng'
            })
        }
    }

    public async uploadAvatar({auth, request, response}: HttpContextContract) {
        const image = request.file('avatar_image', {
            size: '10mb',
            extnames: ['jpg', 'png', 'gif'],
        })

        if(image) {
            if (image.hasErrors) {
                return response.badRequest({
                    'message': 'Chỉ chấp nhận định dạng file (.jpg .png .gif) và file nhỏ hơn 10 MB'
                })
            }
            try {
                const userAuth = await auth.use('api').authenticate()
                const fileName = `${userAuth.id}_avatar_img_id_${RandomNumber.generate6Digit()}`
                await image.moveToDisk(`user_avatar/${userAuth.id}`, { name: fileName }, 's3')
                const userProfileUpdated = await UserProfile.updateOrCreate({
                    userId: userAuth.id
                }, {
                    avatarSource: image.filePath,
                    avatarLocation: image.fileName
                })
                const updatedData = userProfileUpdated.toJSON()
                return response.ok({
                    'message': 'Cập nhật avatar thành công',
                    updated_profile: updatedData
                })
                
            } catch(e) {
                console.log(e)
                return response.serviceUnavailable({
                    'message': 'Có lỗi hệ thống, vui lòng thử lại sau'
                })
            }
        }

        return response.badRequest({
            'message': 'File ảnh không hợp lệ'
        })
    }
}
