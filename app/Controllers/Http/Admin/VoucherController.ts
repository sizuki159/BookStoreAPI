import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AdminVoucherFilterFields from 'App/FilterFields/Admin/AdminVoucherFilterFields'
import User from 'App/Models/User'
import Voucher from 'App/Models/Voucher'
import PageLimitUtils from 'App/Utils/PageLimitUtils'
import AddVoucherValidator from 'App/Validators/AddVoucherValidator'

export default class VoucherController {
    public async getAll({request, response}: HttpContextContract) {
        const {page, limit} = PageLimitUtils(request.qs())
        const vouchers = await Voucher.query().paginate(page, limit)
        return response.json(vouchers.serialize(AdminVoucherFilterFields))
    }

    public async getVoucherGeneral({request, response}: HttpContextContract) {
        const {page, limit} = PageLimitUtils(request.qs())
        const vouchers = await Voucher.query().where('voucherType', Voucher.TYPE.GENERAL).paginate(page, limit)
        return response.json(vouchers.serialize(AdminVoucherFilterFields))
    }

    public async getVoucherPersonalized({request, response}: HttpContextContract) {
        const {page, limit} = PageLimitUtils(request.qs())
        const vouchers = await Voucher.query().where('voucherType', Voucher.TYPE.PERSONALIZED).paginate(page, limit)
        return response.json(vouchers.serialize(AdminVoucherFilterFields))
    }

    public async getVoucherMemberExclusive({request, response}: HttpContextContract) {
        const {page, limit} = PageLimitUtils(request.qs())
        const vouchers = await Voucher.query().where('voucherType', Voucher.TYPE.MEMBER_EXCLUSIVE).paginate(page, limit)
        return response.json(vouchers.serialize(AdminVoucherFilterFields))
    }

    public async addVoucher({request, response}: HttpContextContract) {
        const payload = await request.validate(AddVoucherValidator)

        // Phân loại voucher
        if(payload.voucher_type === Voucher.TYPE.PERSONALIZED) {
            if(!payload.user_email) {
                return response.badRequest({
                    message: 'Loại mã cá nhân thì yêu cầu email của người dùng'
                })
            }
        } else if (payload.voucher_type === Voucher.TYPE.MEMBER_EXCLUSIVE) {
            if(!payload.user_level_id) {
                return response.badRequest({
                    message: 'Loại mã cá nhân thì yêu cầu ID Level User'
                })
            }
        }

        // Khi chọn MEMBER_EXCLUSIVE, GENERAL sẽ bị bug do payload.user_email null
        //Viết tào lao éo chịu test, THG NHÓC HƯ ĐỐN 
        // Viết cái switch case ở đây xử lí 3 loại voucher 
        const user = await User.findBy('email', payload.user_email) // Viết tào lao j đây cu
        if(!user) {
            return response.serviceUnavailable({
                message: 'Hệ thống có lỗi xảy ra'
            })
        }

        payload.user_id = user.id
        
        const voucher = await Voucher.create(payload)
        return response.ok({
            message: 'Thêm voucher thành công.',
            voucher
        })
    }
}
