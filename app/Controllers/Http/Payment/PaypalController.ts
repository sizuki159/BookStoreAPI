import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import paypal from 'paypal-rest-sdk'
import Env from '@ioc:Adonis/Core/Env'
import Cart from 'App/Models/Cart';

export default class PaypalController {

    public static create() {
        paypal.configure({
            'mode': Env.get('PAYPAL_MODE'),
            'client_id': Env.get('PAYPAL_CLIENT_KEY'),
            'client_secret': Env.get('PAYPAL_SECRET_KEY')
        });

        const create_payment_json: paypal.Payment = {
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"
            },
            "redirect_urls": {
                "return_url": "http://localhost:3333/payment/paypal/success",
                "cancel_url": "http://localhost:3333/payment/paypal/cancel"
            },
            "transactions": [{
                "item_list": {
                    "items": [
                        {
                            "name": "Book",
                            "sku": "001",
                            "price": "25.00",
                            "currency": "USD",
                            "quantity": 1,
                        }
                    ]
                },
                "amount": {
                    "currency": "USD",
                    "total": "25.00"
                },
                "description": "Hat for the best team ever"
            }]
        };
    }

    public async success({ request, response }: HttpContextContract) {
        const { paymentId, token, PayerID } = request.qs()

        if (!paymentId || !token || !PayerID) {
            return response.badRequest({
                message: 'Yêu cầu không hợp lệ'
            })
        }

        const execute_payment_json: paypal.payment.ExecuteRequest = {
            payer_id: PayerID
        };

        paypal.payment.execute(paymentId, execute_payment_json, () => {

        })
    }
}
