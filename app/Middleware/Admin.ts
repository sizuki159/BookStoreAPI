import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Roles from 'App/Enums/Roles'

export default class Admin {
  public async handle({auth, response}: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    const user = await auth.use('api').authenticate()
    if(user.user_role_id !== Roles.ADMIN) {
      return response.forbidden()
    }
    await next()
  }
}
