import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import paypal from 'App/Services/Paypal';
import PaypalReceipt from 'App/Models/PaypalReceipt';
import Invoice from 'App/Models/Invoice';
import PaymentMethod from 'App/Models/PaymentMethod';
import Order from 'App/Models/Order';
import SettingUtils from 'App/Utils/SettingUtils';
import UserNotification from 'App/Models/UserNotification';
import { formatCurrency } from 'App/Utils/FormatCurrency';

export default class PaypalController {


    public async success({ request, view }: HttpContextContract) {
        const { paymentId, token, PayerID } = request.qs()

        const homePageUrl = await SettingUtils.getSettingByKey(SettingUtils.KEY.FRONTEND_URL)


        if (!paymentId || !token || !PayerID) {
            return view.render('payment_result', {
                image: '/img/delete.png',
                width: '100px',
                title: 'Yêu cầu không hợp lệ',
                content: '',
                button_url: homePageUrl,
                button_content: 'Về trang chủ',
            })
        }

        const paypalReceipt = await PaypalReceipt.findBy('payment_id', paymentId)
        if (!paypalReceipt) {
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
            .where('payment_method', PaymentMethod.METHOD.PAYPAL)
            .andWhere('paypal_payment_id', paypalReceipt.paymentId)
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

        const execute_payment_json: paypal.payment.ExecuteRequest = {
            payer_id: PayerID
        };

        const checkPaymentSync = (paymentId: string, execute_payment_json: paypal.payment.ExecuteRequest): Promise<paypal.PaymentResponse> => {
            return new Promise((resolve, reject) => {
                paypal.payment.execute(paymentId, execute_payment_json, (err, payment) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(payment)
                    }
                })
            })
        }
        try {
            const paymentResponse = await checkPaymentSync(paymentId, execute_payment_json)
            if (paymentResponse.state && paymentResponse.state === 'approved') {

                paypalReceipt.merge({
                    token,
                    payerId: PayerID
                })
                await paypalReceipt.save()

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
                        message: `Bạn vừa thanh toán ${formatCurrency(invoice.order.finalPrice)} cho đơn hàng #${invoice.orderId} thành công.`,
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

            return view.render('payment_result', {
                image: '/img/system_error.jpg',
                width: '300px',
                title: 'Lỗi thanh toán',
                content: 'Không thể kết nối với hệ thống Paypal. Vui lòng thử lại sau.',
                button_url: `${homePageUrl}/account/order/history`,
                button_content: 'Đơn hàng của tôi',
            })

        } catch (e) {
            return e
        }
    }

    public async cancel({ view }: HttpContextContract) {
        const homePageUrl = await SettingUtils.getSettingByKey(SettingUtils.KEY.FRONTEND_URL)

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
