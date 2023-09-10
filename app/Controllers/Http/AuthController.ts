import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {
    public async register ({request, response}: HttpContextContract) {
        const {email, password} = request.body()
        return email
    }
}
