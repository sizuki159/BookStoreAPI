import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { DateTime } from 'luxon';
import qs from 'qs'
import crypto from 'crypto'

export default class TestsController {
    public async test({ request, response }: HttpContextContract) {
        var tmnCode = 'E4CR4S5D'
        var secretKey = 'SRZNZVBBDUXKDQLSUPSFOJAWPTLVEERF'
        var vnpUrl = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html'
        var returnUrl = 'https://sandbox.vnpayment.vn/tryitnow/Home/VnPayIPN'

        const date = DateTime.now()
        var createDate = date.toFormat('yyyyMMddHHmmss')
        var orderId = date.toFormat('HHmmss')

        var amount = 500000;
        var bankCode = 'NCB';
        var orderInfo = 'Đơn hàng';
        var orderType = 150000;
        var locale = 'vn';
        var currCode = 'VND';
        var vnp_Params = {};
        vnp_Params['vnp_Version'] = '2.1.0';
        vnp_Params['vnp_Command'] = 'pay';
        vnp_Params['vnp_TmnCode'] = tmnCode;
        vnp_Params['vnp_Merchant'] = 'Sách Việt'
        vnp_Params['vnp_Locale'] = locale;
        vnp_Params['vnp_CurrCode'] = currCode;
        vnp_Params['vnp_TxnRef'] = orderId;
        vnp_Params['vnp_OrderInfo'] = orderInfo;
        vnp_Params['vnp_OrderType'] = orderType;
        vnp_Params['vnp_Amount'] = amount * 100;
        vnp_Params['vnp_ReturnUrl'] = returnUrl;
        vnp_Params['vnp_IpAddr'] = '127.0.0.1';
        vnp_Params['vnp_CreateDate'] = createDate;
        if (bankCode !== null && bankCode !== '') {
            vnp_Params['vnp_BankCode'] = bankCode;
        }
        vnp_Params = this.sortObject(vnp_Params);


        var signData = qs.stringify(vnp_Params, { encode: false });
        var hmac = crypto.createHmac("sha512", secretKey);
        var signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");
        vnp_Params['vnp_SecureHash'] = signed;
        vnpUrl += '?' + qs.stringify(vnp_Params, { encode: false });

        return vnpUrl

    }

    private sortObject(obj) {
        let sorted = {};
        let str: any = [];
        let key:any = '';
        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                str.push(encodeURIComponent(key));
            }
        }
        str.sort();
        for (key = 0; key < str.length; key++) {
            sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
        }
        return sorted;
    }


    public async result({ request, response }: HttpContextContract) {
        return 'hihi'
    }

}
