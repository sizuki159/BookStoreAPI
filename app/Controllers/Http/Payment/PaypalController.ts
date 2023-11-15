import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import paypal from 'App/Services/Paypal';
import PaypalReceipt from 'App/Models/PaypalReceipt';
import Invoice from 'App/Models/Invoice';
import PaymentMethod from 'App/Models/PaymentMethod';
import Order from 'App/Models/Order';
import SettingUtils from 'App/Utils/SettingUtils';

export default class PaypalController {

    public async success({ request, response }: HttpContextContract) {
        const { paymentId, token, PayerID } = request.qs()

        if (!paymentId || !token || !PayerID) {
            return response.redirect(await SettingUtils.getSettingByKey(SettingUtils.KEY.FRONTEND_URL))
        }

        const paypalReceipt = await PaypalReceipt.findBy('payment_id', paymentId)
        if (!paypalReceipt) {
            return response.redirect(await SettingUtils.getSettingByKey(SettingUtils.KEY.FRONTEND_URL))
        }

        const execute_payment_json: paypal.payment.ExecuteRequest = {
            payer_id: PayerID
        };

        const invoice = await Invoice.query()
            .where('payment_method', PaymentMethod.METHOD.PAYPAL)
            .andWhere('paypal_payment_id', paypalReceipt.paymentId)
            .andWhere('status', Invoice.STATUS.UNPAID)
            .first()

        if(!invoice) {
            return response.redirect(await SettingUtils.getSettingByKey(SettingUtils.KEY.FRONTEND_URL))
        }


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

                await invoice.related('order').query().update('status', Order.STATUS.PAID)

                return response.redirect(await SettingUtils.getSettingByKey(SettingUtils.KEY.FRONTEND_URL) + '/payment/success')

            }

        } catch (e) {
            return e
        }
    }

    public async cancel({ response }: HttpContextContract) {
        return response.redirect(await SettingUtils.getSettingByKey(SettingUtils.KEY.FRONTEND_URL) + '/payment/fail')
    }
}
