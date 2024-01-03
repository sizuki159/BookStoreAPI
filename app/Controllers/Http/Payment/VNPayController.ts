import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import qs from 'qs'
import crypto from 'crypto'
import Env from '@ioc:Adonis/Core/Env'
import VnpayReceipt from 'App/Models/VnpayReceipt'
import Invoice from 'App/Models/Invoice'
import PaymentMethod from 'App/Models/PaymentMethod'
import SettingUtils from 'App/Utils/SettingUtils'
import Order from 'App/Models/Order'
import UserNotification from 'App/Models/UserNotification'
import { formatCurrency } from 'App/Utils/FormatCurrency'

export default class VNPayController {
    public async process({ request, view }: HttpContextContract) {

        const { vnp_SecureHash } = request.qs()

        let vnp_Params = request.qs()

        delete vnp_Params['vnp_SecureHash']
        // delete vnp_Params['vnp_SecureHashType']


        const sortObject = (obj: any) => {
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


        const homePageUrl = await SettingUtils.getSettingByKey(SettingUtils.KEY.FRONTEND_URL)

        if (vnp_SecureHash === signed) {

            // https://sandbox.vnpayment.vn/apis/docs/bang-ma-loi
            switch (vnp_Params.vnp_ResponseCode) {

                // Giao dịch thành công
                case '00': {

                    const paymentId = vnp_Params.vnp_TxnRef

                    const vnpayReceipt = await VnpayReceipt.findBy('payment_id', paymentId)
                    if (!vnpayReceipt) {
                        return view.render('payment_result', {
                            image: '/img/no_data.jpg',
                            width: '200px',
                            title: 'Hệ thống xảy ra sự cố',
                            content: 'Hệ thống không tìm thấy biên nhận này của bạn.',
                            button_url: homePageUrl,
                            button_content: 'Về trang chủ',
                        })
                    }

                    const invoice = await Invoice.query()
                        .where('payment_method', PaymentMethod.METHOD.VNPAY)
                        .andWhere('vnpay_payment_id', paymentId)
                        .first()

                    if (!invoice) {
                        return view.render('payment_result', {
                            image: '/img/no_data.jpg',
                            width: '200px',
                            title: 'Hệ thống xảy ra sự cố',
                            content: 'Hệ thống không tìm thấy hóa đơn này của bạn.',
                            button_url: homePageUrl,
                            button_content: 'Về trang chủ',
                        })
                    }

                    if (invoice.status === Invoice.STATUS.PAID) {
                        return view.render('payment_result', {
                            image: '/img/shopping.jpg',
                            width: '300px',
                            title: 'Thanh toán hoàn tất trước đó',
                            content: 'Đơn hàng đã được thanh toán trước đó. Hãy tiếp tục mua sắm nhé.',
                            button_url: `${homePageUrl}/product/searchengine`,
                            button_content: 'Tiếp tục mua sắm',
                        })
                    }

                    vnpayReceipt.merge({
                        amount: vnp_Params.vnp_Amount,
                        tmnCode: vnp_Params.vnp_TmnCode,
                        bankCode: vnp_Params.vnp_BankCode,
                        bankTranNo: vnp_Params.vnp_BankTranNo,
                        cardType: vnp_Params.vnp_CardType,
                        orderInfo: decodeURIComponent(vnp_Params.vnp_OrderInfo),
                        payDate: vnp_Params.vnp_PayDate,
                        responseCode: vnp_Params.vnp_ResponseCode,
                        transactionNo: vnp_Params.vnp_TransactionNo,
                        transactionStatus: vnp_Params.vnp_TransactionStatus,
                        secureHash: vnp_SecureHash,
                    })
                    await vnpayReceipt.save()

                    invoice.status = Invoice.STATUS.PAID
                    await invoice.save()

                    await invoice
                        .related('order').query()
                        .update('status', Order.STATUS.CONFIRMED)
                        .update('payment_status', Order.PAYMENT_STATUS.PAID)

                    // Thông báo cho người dùng là bạn thanh toán thành công cho đơn hàng
                    try {
                        await invoice.load('order')
                        await UserNotification.create({
                            title: 'Thanh toán thành công',
                            message: `Bạn vừa thanh toán ${formatCurrency(invoice.order.finalPrice)} cho đơn hàng #${invoice.orderId} thành công.}`,
                            userId: invoice.order.userId,
                        })
                    } catch { }

                    return view.render('payment_result', {
                        image: '/img/payment_success.jpg',
                        width: '300px',
                        title: 'Thanh toán hoàn tất',
                        content: 'Đơn hàng của bạn đã được thanh toán thành công. Cảm ơn bạn đã mua hàng.',
                        button_url: `${homePageUrl}/account/order/history`,
                        button_content: 'Đơn hàng của tôi',
                    })
                }

                default: {
                    return view.render('payment_result', {
                        image: '/img/payment_fail.jpg',
                        width: '300px',
                        title: 'Thanh toán thất bại',
                        content: 'Đơn hàng chưa được thanh toán. Vui lòng thử lại.',
                        button_url: `${homePageUrl}/account/order/history`,
                        button_content: 'Đơn hàng của tôi',
                    })
                }
            }
        }

        return view.render('payment_result', {
            image: '/img/delete.png',
            width: '100px',
            title: 'Yêu cầu không hợp lệ',
            content: '',
            button_url: homePageUrl,
            button_content: 'Về trang chủ',
        })
    }
}
