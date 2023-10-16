import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserAddressFilterFields from 'App/FilterFields/UserAddressFilterFields'
import User from 'App/Models/User'
import UserAddress from 'App/Models/UserAddress'


export default class UserAddressController {

    public async getAll({ auth, response }: HttpContextContract) {
        const userAuth = await auth.use('api').authenticate()
        const addresses = await UserAddress.query()
            .where('user_id', userAuth.id)
            .preload('wards', wards => {
                wards.preload('district', district => {
                    district.preload('province')
                })
            })
        return response.ok(addresses.map((address) => address.serialize(UserAddressFilterFields)))
    }

    public async store({ auth, request, response }: HttpContextContract) {
        const userAuth = await auth.use('api').authenticate()
        const user = await User.findOrFail(userAuth.id)

        const { recipient_name, recipient_phone, street, wards_id, address_default } = request.body()

        try {
            const address = await user.related('addresses').create({
                recipientName: recipient_name,
                recipientPhone: recipient_phone,
                wardsId: wards_id,
                street: street,
                isDefault: address_default
            })

            return response.json(address)
        } catch (ex) {
            if (ex.code === 'ER_NO_REFERENCED_ROW_2') {
                return response.notFound({
                    message: 'Không tìm thấy Wards ID này!'
                })
            }

            return response.serviceUnavailable({
                message: 'Lỗi server!'
            })
        }
    }

    public async getDefault({ auth, response }: HttpContextContract) {
        const userAuth = await auth.use('api').authenticate()
        const defaultAddress = await UserAddress.query()
            .where('user_id', userAuth.id)
            .where('default', true)
            .preload('wards', wards => {
                wards.preload('district', district => {
                    district.preload('province')
                })
            })
            .first();
        if (!defaultAddress) {
            return response.notFound({
                message: 'Không tìm thấy địa chỉ mặc định!'
            })
        }
        return response.json(defaultAddress.serialize(UserAddressFilterFields))
    }

    public async getNonDefault({ auth, response }: HttpContextContract) {
        const userAuth = await auth.use('api').authenticate()
        const user = await User.findOrFail(userAuth.id)
        const nonDefaultAddresses = await UserAddress
            .query()
            .where('user_id', user.id)
            .where('default', false)
            .preload('wards', wards => {
                wards.preload('district', district => {
                    district.preload('province')
                })
            })
        return response.json(nonDefaultAddresses.map(nonDefaultAddress => nonDefaultAddress.serialize(UserAddressFilterFields)))
    }

    public async update({ auth, params, request, response }: HttpContextContract) {
        const { recipient_name, recipient_phone, street, wards_id, address_default } = request.body()

        const address = await UserAddress.query()
                                        .where('id', params.user_address_id)
                                        .where('user_id', auth.use('api').user!.id)
                                        .first()

        if(!address) {
            return response.notFound({
                message: 'Địa chỉ không tồn tại!'
            })
        }
        address.merge({
            recipientName: recipient_name,
            recipientPhone: recipient_phone,
            street: street,
            wardsId: wards_id,
            isDefault: address_default
        })
        await address.save()
        return response.ok({
            message: 'Chỉnh sửa địa chỉ thành công!'
        })
    }

    public async destroy({ auth, params, response }: HttpContextContract) {
        const address = await UserAddress.query()
                                        .where('id', params.user_address_id)
                                        .where('user_id', auth.use('api').user!.id)
                                        .first()

        if(!address) {
            return response.notFound({
                message: 'Địa chỉ không tồn tại!'
            })
        }

        if(address.isDefault) {
            return response.badRequest({
                message: 'Không thể xóa địa chỉ mặc định!'
            })
        }

        await address.delete()
        return response.ok({
            message: 'Xóa địa chỉ thành công!'
        })
    }

    public async setDefault({ auth, params, response }: HttpContextContract) {
        const address = await UserAddress.query()
                                        .where('id', params.user_address_id)
                                        .where('user_id', auth.use('api').user!.id)
                                        .first()
        if(!address) {
            return response.notFound({
                message: 'Địa chỉ không tồn tại!'
            })
        }

        address.isDefault = true
        await address.save()
        return response.ok({
            message: 'Đã đặt địa chỉ này thành địa chỉ mặc định!'
        })
    }
}
