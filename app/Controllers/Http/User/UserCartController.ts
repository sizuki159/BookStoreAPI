import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import VoucherFilterFields from 'App/FilterFields/API/VoucherFilterFields'
import CartFilterFields from 'App/FilterFields/CartFilterFields'
import UserAddressFilterFields from 'App/FilterFields/UserAddressFilterFields'
import Book from 'App/Models/Book'
import Cart from 'App/Models/Cart'
import PaymentMethod from 'App/Models/PaymentMethod'
import User from 'App/Models/User'
import UserAddress from 'App/Models/UserAddress'
import Voucher from 'App/Models/Voucher'
import { DateTime } from 'luxon'
import { types } from '@ioc:Adonis/Core/Helpers'

export default class UserCartController {
    public async getMyCart({auth, response}: HttpContextContract) {
        const myCarts = await Cart.query().where('userId', auth.use('api').user!.id)
                                    .preload('book', book => {
                                        book.preload('images')
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
            if(cart.quantity + payload.quantity > book.quantity) {
                cart.quantity = book.quantity
            } else {
                cart.quantity += payload.quantity
            }
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

    public async preOrder({auth, request, response}: HttpContextContract) {
        const userAuth = await auth.use('api').authenticate()

        const user = await User.findOrFail(userAuth.id)

        const {ids, voucherCode} = request.body()

        if(!types.isArray(ids)) {
            return response.badRequest({
                message: 'Yêu cầu không hợp lệ'
            })
        }

        const carts = await Cart.query().where('userId', user.id)
                                    .andWhereIn('id', ids)
                                    .preload('book', book => {
                                        book.preload('images')
                                    })

        if(carts.length === 0) {
            return response.badRequest({
                message: 'Yêu cầu không hợp lệ'
            })
        }

        const productPrice = carts.reduce((sum, cart) => sum + (cart.book.price * cart.quantity), 0)


        const paymentMethods = await PaymentMethod.query().where('status', 'active')
    

        const voucherAvailables = await Voucher.query()
                                .where('status', Voucher.STATUS.ACTIVE)
                                .andWhere('start_date', '<=', DateTime.now().toFormat('yyyy-MM-dd HH:mm:ss'))
                                .andWhere('end_date', '>=', DateTime.now().toFormat('yyyy-MM-dd HH:mm:ss'))
                                .andWhere('require_order_min_price', '<=', productPrice)
                                .andWhere(voucherAvailable => {
                                    voucherAvailable.where('voucherType', Voucher.TYPE.GENERAL)
                                                .orWhere('userId', user.id)
                                                .orWhere('userLevelId', user.userLevelId)
                                })

        // Phí ship tạm thời mặc định 29k
        const price = {
            productPrice,
            shipFee: 29000,
            discountPrice: 0,
            total: productPrice + 29000
        }
        
        if(voucherCode) {
            for(const voucherAvailable of voucherAvailables) {
                if(voucherAvailable.voucherCode === voucherCode) {
                    price.discountPrice = price.total * (voucherAvailable.discountPercentage / 100 )
                    if(voucherAvailable.discountMaxPrice) {
                        if(price.discountPrice > voucherAvailable.discountMaxPrice) {
                            price.discountPrice = voucherAvailable.discountMaxPrice
                        }
                    }
                    price.total -= price.discountPrice
                }
            }
        }
                              
        return response.json({
            user: {
                voucher: {
                    hints: voucherAvailables.map((voucherHint) => voucherHint.serialize(VoucherFilterFields))
                }
            },
            paymentMethods,
            orders: {
                price,
                carts: carts.map((cart) => {
                    return cart.serialize(CartFilterFields)
                })
            }
        })
    }
}
