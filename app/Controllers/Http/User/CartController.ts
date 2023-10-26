import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Book from 'App/Models/Book'
import Cart from 'App/Models/Cart'

export default class CartController {
    public async addProductToCart({auth, request, response}: HttpContextContract) {
        const newCartSchema = schema.create({
            "isbn_code": schema.string([rules.exists({
                table: 'books',
                column: 'isbn_code'
            })]),
            "quantity": schema.number([
                rules.unsigned()
            ])
        })

        const payload  = await request.validate({
            schema: newCartSchema,
            messages: {
                'isbn_code.exists': 'Mã ISBN sách không tồn tại trong dữ liệu.',
                'quantity.unsigned': 'Số lượng phải là số dương.'
            }
        })

        const book = await Book.findOrFail(payload.isbn_code)
        if(payload.quantity > book.quantity) {
            return response.json({
                message: 'Đã hết hàng.'
            })
        }
        
        await Cart.create({
            userId: (await auth.use('api').authenticate()).id,
            isbnCode: payload.isbn_code,
            quantity: payload.quantity
        })

        return response.ok({
            message: 'Thêm sản phẩm vào giỏ hàng thành công.'
        })
    }
}
