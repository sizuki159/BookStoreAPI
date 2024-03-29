import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AdminVoucherFilterFields from 'App/FilterFields/Admin/AdminVoucherFilterFields'
import User from 'App/Models/User'
import Voucher from 'App/Models/Voucher'
import DatetimeUtils from 'App/Utils/DatetimeUtils'
import PageLimitUtils from 'App/Utils/PageLimitUtils'
import AddVoucherValidator from 'App/Validators/AddVoucherValidator'
import { DateTime } from 'luxon'

export default class AdminVoucherController {
    public async getAll({ request, response }: HttpContextContract) {
        const { page, limit } = PageLimitUtils(request.qs())
        const vouchers = await Voucher.query()
            .where('end_date', '>=', DateTime.now().toFormat(DatetimeUtils.FORMAT_DATETIME_WITH_SQL))
            .paginate(page, limit)
        return response.json(vouchers.serialize(AdminVoucherFilterFields))
    }

    public async getVoucherGeneral({ request, response }: HttpContextContract) {
        const { page, limit } = PageLimitUtils(request.qs())
        const vouchers = await Voucher.query()
            .where('voucherType', Voucher.TYPE.GENERAL)
            .andWhere('end_date', '>=', DateTime.now().toFormat(DatetimeUtils.FORMAT_DATETIME_WITH_SQL))
            .paginate(page, limit)
        return response.json(vouchers.serialize(AdminVoucherFilterFields))
    }

    public async getVoucherPersonalized({ request, response }: HttpContextContract) {
        const { page, limit } = PageLimitUtils(request.qs())
        const vouchers = await Voucher.query()
            .where('voucherType', Voucher.TYPE.PERSONALIZED)
            .andWhere('end_date', '>=', DateTime.now().toFormat(DatetimeUtils.FORMAT_DATETIME_WITH_SQL))
            .paginate(page, limit)
        return response.json(vouchers.serialize(AdminVoucherFilterFields))
    }

    public async getVoucherMemberExclusive({ request, response }: HttpContextContract) {
        const { page, limit } = PageLimitUtils(request.qs())
        const vouchers = await Voucher.query()
            .where('voucherType', Voucher.TYPE.MEMBER_EXCLUSIVE)
            .andWhere('end_date', '>=', DateTime.now().toFormat(DatetimeUtils.FORMAT_DATETIME_WITH_SQL))
            .paginate(page, limit)
        return response.json(vouchers.serialize(AdminVoucherFilterFields))
    }

    public async getVoucherDetail({ params, response }: HttpContextContract) {
        const voucherId = params.voucher_id
        const voucher = await Voucher.findBy('id', voucherId)
        if (!voucher) {
            return response.notFound({
                message: `Không tìm thấy voucher mang id <${voucherId}>.`
            })
        }
        return response.json(voucher.serialize(AdminVoucherFilterFields))
    }

    public async addVoucher({ request, response }: HttpContextContract) {
        const payload = await request.validate(AddVoucherValidator)
        const {
            voucher_name,
            voucher_code,
            require_order_min_price,
            discount_percentage,
            discount_max_price,
            limited,
            desc,
            start_date,
            end_date,
            status,
            user_email,
            user_level_id,
        } = payload
        try {
            switch (payload.voucher_type) {
                case Voucher.TYPE.GENERAL: {
                    const voucher = await Voucher.create(
                        {
                            voucherName: voucher_name,
                            voucherType: 'General',
                            voucherCode: voucher_code,
                            requireOrderMinPrice: require_order_min_price,
                            discountPercentage: discount_percentage,
                            discountMaxPrice: discount_max_price,
                            limited: limited,
                            desc: desc,
                            startDate: start_date,
                            endDate: end_date,
                            status: status
                        }
                    )
                    return response.ok({
                        message: 'Thêm voucher thành công.',
                        voucher
                    })
                }
                case Voucher.TYPE.MEMBER_EXCLUSIVE: {
                    if (!payload.user_level_id) {
                        return response.badRequest({
                            message: 'Loại thành viên thì yêu cầu ID Level User'
                        })
                    }
                    const voucher = await Voucher.create(
                        {
                            voucherName: voucher_name,
                            voucherType: 'Member Exclusive',
                            voucherCode: voucher_code,
                            requireOrderMinPrice: require_order_min_price,
                            discountPercentage: discount_percentage,
                            discountMaxPrice: discount_max_price,
                            limited: limited,
                            desc: desc,
                            startDate: start_date,
                            endDate: end_date,
                            status: status,
                            userLevelId: user_level_id
                        }
                    )
                    return response.ok({
                        message: 'Thêm voucher thành công.',
                        voucher
                    })
                }
                case Voucher.TYPE.PERSONALIZED: {
                    if (!payload.user_email) { //Validate
                        return response.badRequest({
                            message: 'Loại mã cá nhân thì yêu cầu email của người dùng'
                        })
                    }
                    const user = await User.findBy('email', user_email)
                    if (!user) {
                        return response.badRequest({
                            message: `Nguời dùng với email ${user_email} không tồn tại`
                        })
                    }
                    const voucher = await Voucher.create(
                        {
                            voucherName: voucher_name,
                            voucherType: 'Personalized',
                            voucherCode: voucher_code,
                            requireOrderMinPrice: require_order_min_price,
                            discountPercentage: discount_percentage,
                            discountMaxPrice: discount_max_price,
                            limited: limited,
                            desc: desc,
                            startDate: start_date,
                            endDate: end_date,
                            status: status,
                            userId: user.id
                        }
                    )
                    return response.ok({
                        message: 'Thêm voucher thành công.',
                        voucher
                    })
                }
            }

        } catch (e) {
            return response.serviceUnavailable({
                message: 'Hệ thống có lỗi xảy ra'
            })
        }
    }
}
