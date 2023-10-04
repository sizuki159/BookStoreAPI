import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UserAddressController {
    public async getAll({auth, request, response}: HttpContextContract) {
        const userAuth = await auth.use('api').authenticate()
        const user = await User.findOrFail(userAuth.id)
        await user.load('addresses')
        return response.json(user.addresses)
    }

    public async store({auth, request, response}: HttpContextContract) {
        const userAuth = await auth.use('api').authenticate()
        const user = await User.findOrFail(userAuth.id)

        const {wards_id, street, address_default} = request.body()

        try {
            const address = await user.related('addresses').create({
                wardsId: wards_id,
                street: street,
                isDefault: address_default
            })
    
            return response.json(address)
        } catch(ex) {
            if(ex.code == 'ER_NO_REFERENCED_ROW_2') {
                return response.notFound({
                    message: 'Không tìm thấy Wards ID này!'
                })
            }

            return response.serviceUnavailable({
                message: 'Lỗi server!'
            })
        }

    }
}
