import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Invoice from 'App/Models/Invoice'

export default class InvoiceAPIController {
    public async printInvoice({ params, request, view }: HttpContextContract) {
        const invoice_id = params.invoice_id
        const { hash } = request.qs()

        const invoice = await Invoice.query()
            .where('id', invoice_id)
            .first()

        if (!invoice) {
            return view.render('default')
        }

        if (invoice.hashPrinter !== hash) {
            return view.render('default')
        }

        await invoice.load('order', (order) => {
            order.preload('userAddress', (userAddress) => {
                userAddress.preload('wards', (wards) => {
                    wards.preload('district', (district) => {
                        district.preload('province')
                    })
                })
            })
                .preload('items', (items) => {
                    items.preload('product')
                })
        })

        return view.render('invoice', {
            id: invoice.id,
            date: invoice.createdAt.toFormat('dd/MM/yyyy HH:mm:ss'),
            recipient_name: invoice.order.userAddress.recipientName,
            street: invoice.order.userAddress.street,
            ward: invoice.order.userAddress.wards.name,
            district: invoice.order.userAddress.wards.district.name,
            province: invoice.order.userAddress.wards.district.province.name,
            price: {
                product_price: invoice.order.productPrice,
                fee_price: invoice.order.feePrice,
                final_price: invoice.order.finalPrice,
            },
            items: invoice.order.items.map((item) => {
                return {
                    quantity: item.quantity,
                    price_per_unit: item.pricePerUnit,
                    name: item.product.name,
                }
            })
        })
    }
}
