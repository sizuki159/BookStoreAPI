import Env from '@ioc:Adonis/Core/Env'
import qs from 'qs'
import crypto from 'crypto'
import { DateTime } from 'luxon'
import Order from 'App/Models/Order'
import Invoice from 'App/Models/Invoice'
import PaymentMethod from 'App/Models/PaymentMethod'
import VnpayReceipt from 'App/Models/VnpayReceipt'

class VNPayService {

    public static async create(order: Order) {
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

        const now = DateTime.now()
        var createDate = now.toFormat('yyyyMMddHHmmss')
        var orderId = `${order.id}-${now.toFormat('HHmmss')}`

        let vnp_Params = {};
        vnp_Params['vnp_Version'] = '2.1.0';
        vnp_Params['vnp_Command'] = 'pay';
        vnp_Params['vnp_TmnCode'] = Env.get('VNP_TMN_CODE', 'E4CR4S5D');
        vnp_Params['vnp_Merchant'] = 'SachViet'
        vnp_Params['vnp_Locale'] = 'vn'; // vn or en
        vnp_Params['vnp_CurrCode'] = 'VND';
        vnp_Params['vnp_TxnRef'] = orderId;
        vnp_Params['vnp_OrderInfo'] = `Order #${order.id}`;
        vnp_Params['vnp_OrderType'] = 150000;
        vnp_Params['vnp_Amount'] = order.finalPrice * 100;
        vnp_Params['vnp_ReturnUrl'] = Env.get('VNP_CALLBACK_URL', 'http://127.0.0.1:3333/api/payment/vnpay/process');
        vnp_Params['vnp_IpAddr'] = '127.0.0.1';
        vnp_Params['vnp_CreateDate'] = createDate;
        vnp_Params['vnp_BankCode'] = 'NCB';

        vnp_Params = sortObject(vnp_Params);

        var signData = qs.stringify(vnp_Params, { encode: false });
        const hmac = crypto.createHmac("sha512", Env.get('VNP_SECRET_KEY', 'SRZNZVBBDUXKDQLSUPSFOJAWPTLVEERF'));
        // var signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex');
        var signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex')
        vnp_Params['vnp_SecureHash'] = signed;

        const paymentURL = Env.get('VNP_URL', 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html') + '?' + qs.stringify(vnp_Params, { encode: false });

        await VnpayReceipt.create({
            paymentId: orderId
        })

        await Invoice.create({
            orderId: order.id,
            paymentMethod: PaymentMethod.METHOD.VNPAY,
            payUrl: paymentURL,
            vnpayPaymentId: orderId
        })

        return paymentURL
    }

}


export default VNPayService