import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Hash from '@ioc:Adonis/Core/Hash'
import RegisterValidator from 'App/Validators/RegisterValidator'

export default class AuthController {
    public async register ({auth, request, response}: HttpContextContract) {
        const {email, password} = await request.validate(RegisterValidator)

        const user = await User.create({
            email,
            password
        })

        return response.created({
            message: 'Đăng ký thành công!'
        })
    }

    public async login({auth, request, response}: HttpContextContract) {
        const {email, password} = request.body()

        try {
            const token = await auth.use('api').attempt(email, password)
            const user = await User.findByOrFail('email', email)

            const refreshToken = await User.generateRefreshToken(token.tokenHash)
            await user.load('userLevel')
            await user.load('userRole')
            return {
                "jwtToken": token.token,
                "refreshToken": refreshToken,
                "userInfo": user,
            }
        } catch(ex) {
            // return response.json(ex.message)
            return response.unauthorized()
        }
    }

}
