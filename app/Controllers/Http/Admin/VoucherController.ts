import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AdminVoucherFilterFields from 'App/FilterFields/Admin/AdminVoucherFilterFields'
import Voucher from 'App/Models/Voucher'
import PageLimitUtils from 'App/Utils/PageLimitUtils'
import AddVoucherValidator from 'App/Validators/AddVoucherValidator'

export default class VoucherController {
    public async getAll({request, response}: HttpContextContract) {
        const {page, limit} = PageLimitUtils(request.qs())
        const vouchers = await Voucher.query().paginate(page, limit)
        return response.json(vouchers.serialize(AdminVoucherFilterFields))
    }

    public async addVoucher({request, response}: HttpContextContract) {
        const payload = await request.validate(AddVoucherValidator)

        // Phân loại voucher
        if(payload.voucher_type === Voucher.TYPE.PERSONALIZED) {
            if(!payload.user_id) {
                return response.badRequest({
                    message: 'Loại mã cá nhân thì yêu cầu ID người dùng'
                })
            }
        } else if (payload.voucher_type === Voucher.TYPE.MEMBER_EXCLUSIVE) {
            if(!payload.user_level_id) {
                return response.badRequest({
                    message: 'Loại mã cá nhân thì yêu cầu ID Level User'
                })
            }
        }

        const voucher = await Voucher.create(payload)
        return response.ok({
            message: 'Thêm voucher thành công.',
            voucher
        })
    }
}
