import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Order from 'App/Models/Order'
import PaymentMethod from 'App/Models/PaymentMethod'

export default class UserInvoiceController {
    public async requestPrintInvoice({ params, auth, response }: HttpContextContract) {
        const userAuth = await auth.use('api').authenticate()
        const order_id = params.order_id


        const order = await Order.query()
            .where('order_id', order_id)
            .andWhere('user_id', userAuth.id)
            .first()

        if (!order) {
            return response.notFound({
                message: 'Không tìm thấy đơn hàng này của bạn'
            })
        }

        if (order.paymentMethod === PaymentMethod.METHOD.COD) {
            return response.badRequest({
                message: 'Đơn hàng thanh toán bằng tiền mặt không thể in hóa đơn'
            })
        }

        if (order.paymentStatus === Order.PAYMENT_STATUS.UNPAID) {
            return response.badRequest({
                message: 'Đơn hàng chưa được thanh toán'
            })
        }

        // In hóa đơn
        await order.load('invoice')
        if(order.invoice) {
            const invoiceUrl = await order.invoice.printInvoice()
            return response.ok(invoiceUrl)
        }

        return response.notFound({
            message: 'Không tìm thấy hóa đơn của đơn hàng này'
        })
    }
}