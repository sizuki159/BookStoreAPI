import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import UserAddress from 'App/Models/UserAddress'

export default class UserAddressController {
    public async getAll({auth, response}: HttpContextContract) {
        const userAuth = await auth.use('api').authenticate()
        const address = await UserAddress.query()
                                        .where('user_id', userAuth.id)
                                        .preload('wards', wards =>{
                                            wards.preload('district', district => {
                                                district.preload('province')
                                            })
                                        })
        return address

        // const user = await User.findOrFail(userAuth.id)
        // await user.load('addresses')
        // const addresses = user.addresses

        // const addressFinal: any = []
        // for (const address of addresses) {
        //     await address.load('user')
        //     await address.load('wards')
        //     await address.wards.load('district')
        //     await address.wards.district.load('province')

        //     addressFinal.push({
        //         "recipient_name": address.recipientName,
        //         "recipient_phone": address.recipientPhone,
        //         "street": address.street,
        //         "wards": address.wards.name,
        //         "district": address.wards.district.name,
        //         "province": address.wards.district.province.name,
        //         "isDefault": address.isDefault == true ? true : false
        //     })
        // }        
        
        // return response.json(addressFinal)
    }

    public async store({auth, request, response}: HttpContextContract) {
        const userAuth = await auth.use('api').authenticate()
        const user = await User.findOrFail(userAuth.id)

        const {recipient_name, recipient_phone, street, wards_id, address_default} = request.body()

        try {
            const address = await user.related('addresses').create({
                recipientName: recipient_name,
                recipientPhone: recipient_phone,
                wardsId: wards_id,
                street: street,
                isDefault: address_default
            })
    
            return response.json(address)
        } catch(ex) {
            if(ex.code === 'ER_NO_REFERENCED_ROW_2') {
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
