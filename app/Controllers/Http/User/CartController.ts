import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import CartFilterFields from 'App/FilterFields/CartFilterFields'
import Book from 'App/Models/Book'
import Cart from 'App/Models/Cart'

export default class CartController {
    public async getMyCart({auth, response}: HttpContextContract) {
        const myCarts = await Cart.query().where('userId', auth.use('api').user!.id)
                                    .preload('book', book => {
                                        book.preload('images', image => image.first())
                                    })
        return response.json(myCarts.map((myCart) => {
            return myCart.serialize(CartFilterFields)
        }))
    }

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

        const book = await Book.findByOrFail('isbnCode', payload.isbn_code)
        if(payload.quantity > book.quantity) {
            return response.badRequest({
                message: 'Không đủ hàng'
            })
        }
        const userId = auth.use('api').user!.id
        const cart = await Cart.query().where('userId', userId).andWhere('isbnCode', payload.isbn_code).first()
        if(cart) {
            cart.quantity += payload.quantity
            await cart.save()
        } else {
            await Cart.create({
                userId,
                isbnCode: payload.isbn_code,
                quantity: payload.quantity
            })
        }
        
        return response.ok({
            message: 'Thêm sản phẩm vào giỏ hàng thành công.'
        })
    }

    public async updateQuantityFromCart({auth, request, response}: HttpContextContract) {
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

        const book = await Book.findByOrFail('isbnCode', payload.isbn_code)
        if(payload.quantity > book.quantity) {
            return response.badRequest({
                message: 'Không đủ hàng'
            })
        }

        await Cart.updateOrCreate({
            userId: auth.use('api').user!.id,
            isbnCode: payload.isbn_code
        }, {
            userId: auth.use('api').user!.id,
            isbnCode: payload.isbn_code,
            quantity: payload.quantity
        })

        return response.ok({
            message: 'Thành công'
        })
    }

    public async increase({auth, params, response}: HttpContextContract) {
        const cart = await Cart.query().where('user_id', auth.use('api').user!.id)
                                .andWhere('id', params.id).first()
        if(!cart) {
            return response.badRequest({
                message: 'Yêu cầu không hợp lệ'
            })
        }

        const book = await Book.findBy('isbn_code', cart.isbnCode)
        if(!book) {
            return response.badRequest({
                message: 'Yêu cầu không hợp lệ'
            }) 
        }

        if(cart.quantity + 1 > book.quantity) {
            return response.badRequest({
                message: 'Không đủ hàng'
            })
        }

        cart.quantity += 1
        await cart.save()

        await cart.refresh()

        return response.ok({
            message: 'Thành công',
            quantity: cart.quantity
        })
        
    }

    public async decrease({auth, params, response}: HttpContextContract) {
        const cart = await Cart.query().where('user_id', auth.use('api').user!.id)
                                .andWhere('id', params.id).first()
        if(!cart) {
            return response.badRequest({
                message: 'Yêu cầu không hợp lệ'
            })
        }

        if(cart.quantity == 1) {
            return response.ok({
                message: 'Thành công',
                quantity: cart.quantity
            })
        }

        cart.quantity -= 1
        await cart.save()
        await cart.refresh()
        return response.ok({
            message: 'Thành công',
            quantity: cart.quantity
        })
        
    }

    public async deleteBookFromCart({auth, params, response}: HttpContextContract) {
        await Cart.query()
                .where('userId', auth.use('api').user!.id)
                .andWhere('isbn_code', params.isbn_code)
                .delete()
        return response.ok({
            message: `Đã xóa sản phẩm ra khỏi giỏ hàng thành công`
        })
    }
}
