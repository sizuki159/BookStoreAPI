import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import qs from 'qs'
import crypto from 'crypto'
import Env from '@ioc:Adonis/Core/Env'

export default class VNPayController {
    public async process({ request, response }: HttpContextContract) {
        const { vnp_Amount,
            vnp_BankCode,
            vnp_CardType,
            vnp_OrderInfo,
            vnp_PayDate,
            vnp_ResponseCode,
            vnp_TmnCode,
            vnp_TransactionNo,
            vnp_TransactionStatus,
            vnp_TxnRef,
            vnp_SecureHash } = request.qs()

        let vnp_Params = request.qs()

        delete vnp_Params['vnp_SecureHash']
        delete vnp_Params['vnp_SecureHashType']

        const sortObject = (obj) => {
            let sorted = {};
            let str: any = [];
            let key: any = '';
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

        vnp_Params = sortObject(vnp_Params);


        var signData = qs.stringify(vnp_Params, { encode: false });
        const hmac = crypto.createHmac('sha512', Env.get('VNP_SECRET_KEY', 'SRZNZVBBDUXKDQLSUPSFOJAWPTLVEERF'));
        var signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');

        if(vnp_SecureHash === signed) {
            return response.json({
                RspCode: '00',
                Message: 'success'
            })
        }
        return response.status(200).json({RspCode: '97', Message: 'Fail checksum'})
    }
}
