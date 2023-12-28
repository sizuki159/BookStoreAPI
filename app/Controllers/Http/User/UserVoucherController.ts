import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Voucher from 'App/Models/Voucher'
import DatetimeUtils from 'App/Utils/DatetimeUtils'
import PageLimitUtils from 'App/Utils/PageLimitUtils'
import { DateTime } from 'luxon'

export default class UserVoucherController {

    public async getVoucherPartner({ auth, request, response }: HttpContextContract) {
        const userAuth = await auth.use('api').authenticate()

        const { page, limit } = PageLimitUtils(request.qs())

        //Voucher partner is type General and Member exclusive
        const vouchers = await Voucher.query()
            .where(voucherTypeQuery => {
                voucherTypeQuery.where('voucherType', Voucher.TYPE.MEMBER_EXCLUSIVE)
                    .orWhere('voucherType', Voucher.TYPE.GENERAL)
            })
            .andWhere('start_date', '<=', DateTime.now().toFormat(DatetimeUtils.FORMAT_DATETIME_WITH_SQL))
            .andWhere('end_date', '>=', DateTime.now().toFormat(DatetimeUtils.FORMAT_DATETIME_WITH_SQL))
            // Không gợi ý mã giảm giá đã sử dụng
            // Và cũng không được sử dụng
            .andWhereNotExists(voucherUsed => {
                voucherUsed.from('voucher_usage_histories')
                    .whereColumn('voucher_usage_histories.voucher_id', 'vouchers.id')
                    .andWhereColumn('voucher_usage_histories.user_id', userAuth.id)
            })
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
                // Không gợi ý mã giảm giá đã sử dụng
                // Và cũng không được sử dụng
                .andWhereNotExists(voucherUsed => {
                    voucherUsed.from('voucher_usage_histories')
                        .whereColumn('voucher_usage_histories.voucher_id', 'vouchers.id')
                        .andWhereColumn('voucher_usage_histories.user_id', userAuth.id)
                })
                .paginate(page, limit)
            return response.json(vouchers)
        }
        catch (e) {//userAuth might be undefined without get thought middleware
            return response.json([])
        }
    }
}
