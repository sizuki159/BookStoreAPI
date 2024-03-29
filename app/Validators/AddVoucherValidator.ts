import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Voucher from 'App/Models/Voucher'

export default class AddVoucherValidator {
    constructor(protected ctx: HttpContextContract) { }

    /*
    * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
    *
    * For example:
    * 1. The username must be of data type string. But then also, it should
    *    not contain special characters or numbers.
    *    ```
    *     schema.string({}, [ rules.alpha() ])
    *    ```
    *
    * 2. The email must be of data type string, formatted as a valid
    *    email. But also, not used by any other user.
    *    ```
    *     schema.string({}, [
    *       rules.email(),
    *       rules.unique({ table: 'users', column: 'email' }),
    *     ])
    *    ```
    */
    public schema = schema.create({
        'voucher_name': schema.string.optional(),
        'voucher_type': schema.enum(
            Object.values(Voucher.TYPE)
        ),
        'voucher_code': schema.string([
            rules.unique({
                column: 'voucher_code',
                table: 'vouchers'
            })
        ]),
        'require_order_min_price': schema.number([
            rules.unsigned()
        ]),
        'discount_percentage': schema.number([
            rules.range(0, 100)
        ]),
        'discount_max_price': schema.number.optional([
            rules.unsigned()
        ]),
        'limited': schema.number.optional([
            rules.unsigned()
        ]),
        'desc': schema.string.optional(),
        'start_date': schema.date({
            format: 'dd-MM-yyyy HH:mm:ss',
        }),
        'end_date': schema.date({
            format: 'dd-MM-yyyy HH:mm:ss',
        }),
        'status': schema.enum(
            Object.values(Voucher.STATUS)
        ),
        'user_email': schema.string.optional([
            rules.email(),
            rules.exists({
                table: 'users',
                column: 'email',
            })
        ]),
        'user_id': schema.number.optional(),
        'user_level_id': schema.number.optional([
            rules.exists({
                table: 'user_levels',
                column: 'id',
            })
        ])
    })

    /**
     * Custom messages for validation failures. You can make use of dot notation `(.)`
     * for targeting nested fields and array expressions `(*)` for targeting all
     * children of an array. For example:
     *
     * {
     *   'profile.username.required': 'Username is required',
     *   'scores.*.number': 'Define scores as valid numbers'
     * }
     *
     */
    public messages: CustomMessages = {
        'voucher_type.required': 'Thiếu loại voucher',
        'voucher_type.enum': 'Hãy chọn đúng loại voucher',

        'voucher_code.required': 'Thiếu mã voucher',
        'voucher_code.unique': 'Mã này đã tồn tại trong dữ liệu',

        'require_order_min_price.required': 'Thiếu yêu cầu tối thiểu đơn hàng bao nhiêu tiền',
        'require_order_min_price.unsigned': 'Số tiền tối thiểu của đơn hàng không là số âm',

        'discount_percentage.required': 'Thiếu phần trăm giảm giá',
        'discount_percentage.range': 'Phần trăm phải từ 0% -> 100%',

        'discount_max_price.unsigned': 'Số tiền giảm giá tối đa không được âm',

        'limited.unsigned': 'Tổng số lượng sử dụng không được âm',

        'start_date.required': 'Thêm thời gian voucher bắt đầu có hiệu lực',
        'start_date.date.format': 'Định dạng thời gian không đúng',

        'end_date.required': 'Thêm thời gian voucher hết hạn',
        'end_date.date.format': 'Định dạng thời gian không đúng',

        'status.enum': 'Hãy chọn đúng loại status',

        'user_email.email': 'Email người dùng không đúng định dạng',
        'user_email.exists': 'Không tìm thấy email của người dùng này',

        'user_level_id.exists': 'Không tìm thấy ID User Level này'
    }
}
