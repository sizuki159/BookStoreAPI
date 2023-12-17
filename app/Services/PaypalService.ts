import PaypalReceipt from "App/Models/PaypalReceipt"
import paypal from "./Paypal"
import axios from 'axios';
import Order from "App/Models/Order";
import Invoice from "App/Models/Invoice";
import PaymentMethod from "App/Models/PaymentMethod";
import Env from '@ioc:Adonis/Core/Env'

class PaypalService {
    public static async create(order: Order): Promise<string | null> {
        try {
            let priceToUSD
            try {
                const exchangeRate = await axios.get('https://open.er-api.com/v6/latest')
                if (exchangeRate.data.rates) {
                    priceToUSD = order.finalPrice / exchangeRate.data.rates.VND
                } else {
                    priceToUSD = order.finalPrice / 24291.775268
                }
            }
            catch {
                priceToUSD = order.finalPrice / 24291.775268
            }
            priceToUSD = priceToUSD.toFixed(2)

            const create_payment_json: paypal.Payment = {
                "intent": "sale",
                "payer": {
                    "payment_method": "paypal"
                },
                "redirect_urls": {
                    "return_url": Env.get('PAYPAL_CALLBACK_URL'),
                    "cancel_url": Env.get('PAYPAL_CALLBACK_CANCEL_URL')
                },
                "transactions": [{
                    "item_list": {
                        items: [
                            {
                                name: `Đơn hàng #${order.id}`,
                                price: priceToUSD,
                                quantity: 1,
                                currency: 'USD'
                            }
                        ]
                    },
                    "amount": {
                        "currency": 'USD',
                        "total": priceToUSD
                    },
                    "description": "Book Store"
                }]

            };



            const createPaymentSync = (create_payment_json: paypal.Payment): Promise<paypal.PaymentResponse> => {
                return new Promise((resolve, reject) => {
                    paypal.payment.create(create_payment_json, (err, payment: paypal.PaymentResponse) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(payment)
                        }
                    });
                });
            };



            try {
                const payment = await createPaymentSync(create_payment_json)
                if(payment.id && payment.links) {
                    for(const link of payment.links) {
                        if(link.rel === 'approval_url') {
                            const urlSearchParams = new URLSearchParams(link.href)
                            const token = urlSearchParams.get('token')
                            if(!token) {
                                return null
                            }
                            await PaypalReceipt.create({
                                paymentId: payment.id,
                                token: token
                            })
                            await Invoice.create({
                                orderId: order.id,
                                paymentMethod: PaymentMethod.METHOD.PAYPAL,
                                paypalPaymentId: payment.id,
                                payUrl: link.href
                            })

                            return link.href
                        }
                    }
                }

                return null

            } catch (e) {
                console.log(e.message)
                return null
            }

        } catch (e) {
            return null
        }
    }
}

export default PaypalService

