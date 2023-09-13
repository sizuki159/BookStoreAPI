import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class AuthController {
    public async register ({request, response}: HttpContextContract) {
        const {username, email, phone, fullname, password} = request.body()
        await User.create({
            username: 'trung',
            password: '123'
        })
        return email
    }

    public async login({request, response}: HttpContextContract) {
        const {username, password} = request.body()
        return username
    }
}
