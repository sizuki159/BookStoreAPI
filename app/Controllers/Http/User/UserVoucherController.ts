import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Voucher from 'App/Models/Voucher'
import PageLimitUtils from 'App/Utils/PageLimitUtils'

export default class UserVoucherController {

    public async getVoucherPartner({ request, response }: HttpContextContract) {
        //Voucher partner is type general and Member exclusive
        const { page, limit } = PageLimitUtils(request.qs())
        const vouchers = await Voucher.query()
            .where('voucherType', Voucher.TYPE.MEMBER_EXCLUSIVE)
            .orWhere('voucherType', Voucher.TYPE.GENERAL)
            .paginate(page, limit)
        return response.json(vouchers)
    }

    public async getVoucherPersonalized({ auth, request, response }: HttpContextContract) {
        const userAuth = await auth.use('api').authenticate()
        const { page, limit } = PageLimitUtils(request.qs())
        try {
            const vouchers = await Voucher.query()
                .where('voucherType', Voucher.TYPE.PERSONALIZED)
                .andWhere('userId', userAuth.id)
                .paginate(page, limit)
            return response.json(vouchers)
        }
        catch (e) {//userAuth might be undefined without get thought middleware
            return response.json([])
        }
    }
}
