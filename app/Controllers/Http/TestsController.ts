import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BookImage from 'App/Models/BookImage'

import paypal from 'paypal-rest-sdk'

export default class TestsController {
    public async test({ }: HttpContextContract) {

        paypal.configure({
            'mode': 'sandbox', //sandbox or live
            'client_id': 'ASDvcF7gq4G7Mt_7ZksXUoirRCCejo6NK37IE5wnUbM7HsFzFAc2hAxubdDeiAi9YkN6bZ_6Hy_8p11g',
            'client_secret': 'EOqfAdtTrMViE6WBog9cnSGFxUcVW4aY8oUIKnrD_C4SWDXPaQ2GDmd956ANEzgfi9RENp2Y3Zq9NvMR'
        });

        const create_payment_json: paypal.Payment = {
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"
            },
            "redirect_urls": {
                "return_url": "http://localhost:3333/success",
                "cancel_url": "http://localhost:3333/cancel"
            },
            "transactions": [{
                "amount": {
                    "currency": "USD",
                    "total": "60"

                },
                "description": "Con cặc"
            }]
        };

        const createPaymentSync = (create_payment_json: paypal.Payment) => {
            return new Promise((resolve, reject) => {
                paypal.payment.create(create_payment_json, (err, payment: paypal.PaymentResponse) => {
                    if (err) {
                        reject(err);
                    } else {
                        if (payment.links) {
                            for (let i = 0; i < payment.links.length; i++) {
                                if (payment.links[i].rel === 'approval_url') {
                                    resolve(payment.links[i].href);
                                    return; // Kết thúc vòng lặp khi đã tìm thấy approval_url
                                }
                            }
                        }
                        reject(new Error('No approval_url found in payment response.'));
                    }
                });
            });
        };

        const payment = await createPaymentSync(create_payment_json)
        return payment
    }


}
