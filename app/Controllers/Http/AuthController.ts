import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class AuthController {
    public async register ({request, response}: HttpContextContract) {
        const {email, phone, fullname, password} = request.body()
        const user = await User.create({
            email,
            phoneNumber: phone,
            fullname,
            password
        })
        return user
    }

    public async login({auth, request, response}: HttpContextContract) {        
        const {email, password} = request.body()
        const token = await auth.use('api').attempt(email, password)
        return token
    }
}
