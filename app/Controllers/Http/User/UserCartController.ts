import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import VoucherFilterFields from 'App/FilterFields/API/VoucherFilterFields'
import CartFilterFields from 'App/FilterFields/CartFilterFields'
import Book from 'App/Models/Book'
import Cart from 'App/Models/Cart'
import PaymentMethod from 'App/Models/PaymentMethod'
import User from 'App/Models/User'
import Voucher from 'App/Models/Voucher'
import { DateTime } from 'luxon'
import { types } from '@ioc:Adonis/Core/Helpers'
import DatetimeUtils from 'App/Utils/DatetimeUtils'
import UserNotification from 'App/Models/UserNotification'
import { calculateFee } from 'App/Services/GHNService'
import UserAddress from 'App/Models/UserAddress'

export default class UserCartController {
    public async getMyCart({ auth, response }: HttpContextContract) {
        const userAuth = await auth.use('api').authenticate()
        const myCarts = await Cart.query()
            .where('userId', userAuth.id)
            .preload('book', book => {
                book.withTrashed()
                    .preload('images', images => images.groupLimit(1))
            })

        // Kiểm tra hàng hiện tại còn không
        try {
            for (const myCart of myCarts) {
                try {
                    // Nếu không còn hàng thì xóa luôn
                    if (myCart.book.quantity === 0) {
                        await myCart.forceDelete()

                        // Thông báo cho người dùng
                        try {
                            await UserNotification.create({
                                title: 'Sản phẩm đã hết hàng',
                                message: `Sản phẩm ${myCart.book.name} đã hết hàng`,
                                userId: userAuth.id
                            })
                        } catch { }
                    }
                    // Nếu số lượng trong giỏ hàng lớn hơn số lượng hiện tại
                    // Thì giảm số lượng trong giỏ hàng xuống
                    else if (myCart.quantity > myCart.book.quantity) {
                        myCart.quantity = myCart.book.quantity
                        await myCart.save()

                        // Thông báo cho người dùng
                        try {
                            await UserNotification.create({
                                title: 'Sản phẩm không còn đủ số lượng',
                                message: `Đã cập nhật số lượng giỏi hàng với sản phẩm ${myCart.book.name} với lý do không đủ hàng`,
                                userId: userAuth.id
                            })
                        } catch { }
                    }
                } catch { }
            }
        } catch { }

        return response.json(myCarts.map((myCart) => {
            return myCart.serialize(CartFilterFields)
        }))
    }

    public async addProductToCart({ auth, request, response }: HttpContextContract) {
        const newCartSchema = schema.create({
            "isbn_code": schema.string([rules.exists({
                table: 'books',
                column: 'isbn_code'
            })]),
            "quantity": schema.number([
                rules.unsigned()
            ])
        })

        const payload = await request.validate({
            schema: newCartSchema,
            messages: {
                'isbn_code.exists': 'Mã ISBN sách không tồn tại trong dữ liệu.',
                'quantity.unsigned': 'Số lượng phải là số dương.'
            }
        })

        const book = await Book.findByOrFail('isbnCode', payload.isbn_code)
        if (payload.quantity > book.quantity) {
            return response.badRequest({
                message: 'Không đủ hàng'
            })
        }
        const userId = auth.use('api').user!.id
        const cart = await Cart.withTrashed()
            .where('userId', userId)
            .andWhere('isbnCode', payload.isbn_code)
            .first()
        if (cart) {
            const cartDeleted = await Cart.onlyTrashed()
                .where('userId', userId)
                .andWhere('isbnCode', payload.isbn_code)
                .first()
            if (cartDeleted) {
                cartDeleted.quantity = 0
                await cartDeleted.save()
                await cartDeleted.restore()
            }

            await cart.refresh()
            if (cart.quantity + payload.quantity > book.quantity) {
                cart.quantity = book.quantity
            } else {
                cart.quantity += payload.quantity
            }
            await cart.save()
        } else {
            try {
                await Cart.create({
                    userId,
                    isbnCode: payload.isbn_code,
                    quantity: payload.quantity
                })
            }
            catch {
                return response.serviceUnavailable({
                    'message': 'Hiện không thể thêm sản phẩm này vào giỏ hàng. Vui lòng quay lại sau'
                })
            }
        }

        return response.ok({
            message: 'Thêm sản phẩm vào giỏ hàng thành công.'
        })
    }

    public async updateQuantityFromCart({ auth, request, response }: HttpContextContract) {
        const newCartSchema = schema.create({
            "isbn_code": schema.string([rules.exists({
                table: 'books',
                column: 'isbn_code'
            })]),
            "quantity": schema.number([
                rules.unsigned()
            ])
        })

        const payload = await request.validate({
            schema: newCartSchema,
            messages: {
                'isbn_code.exists': 'Mã ISBN sách không tồn tại trong dữ liệu.',
                'quantity.unsigned': 'Số lượng phải là số dương.'
            }
        })

        const book = await Book.findByOrFail('isbnCode', payload.isbn_code)
        if (payload.quantity > book.quantity) {
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

    public async increase({ auth, params, response }: HttpContextContract) {
        const cart = await Cart.query().where('user_id', auth.use('api').user!.id)
            .andWhere('id', params.id).first()
        if (!cart) {
            return response.badRequest({
                message: 'Yêu cầu không hợp lệ'
            })
        }

        const book = await Book.findBy('isbn_code', cart.isbnCode)
        if (!book) {
            return response.badRequest({
                message: 'Yêu cầu không hợp lệ'
            })
        }

        if (cart.quantity + 1 > book.quantity) {
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

    public async decrease({ auth, params, response }: HttpContextContract) {
        const cart = await Cart.query().where('user_id', auth.use('api').user!.id)
            .andWhere('id', params.id).first()
        if (!cart) {
            return response.badRequest({
                message: 'Yêu cầu không hợp lệ'
            })
        }

        if (cart.quantity == 1) {
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

    public async deleteBookFromCart({ auth, params, response }: HttpContextContract) {
        await Cart.query()
            .where('userId', auth.use('api').user!.id)
            .andWhere('isbn_code', params.isbn_code)
            .delete()

        return response.ok({
            message: `Đã xóa sản phẩm ra khỏi giỏ hàng thành công`
        })
    }

    public async preOrder({ auth, request, response }: HttpContextContract) {
        const userAuth = await auth.use('api').authenticate()

        const user = await User.findOrFail(userAuth.id)

        const {
            ids,
            voucherCode,
            userAddressId
        } = request.body()

        if (!types.isArray(ids)) {
            return response.badRequest({
                message: 'Yêu cầu không hợp lệ'
            })
        }

        const carts = await Cart.query().where('userId', user.id)
            .andWhereIn('id', ids)
            .preload('book', book => {
                book.withTrashed()
                    .preload('images', images => images.groupLimit(1))
            })

        if (carts.length === 0) {
            return response.badRequest({
                message: 'Yêu cầu không hợp lệ'
            })
        }

        let userAddress: UserAddress | null = null
        if (userAddressId) {
            userAddress = await UserAddress.query()
                .where('user_id', userAuth.id)
                .andWhere('id', userAddressId)
                .first()
            if (!userAddress) {
                return response.badRequest({
                    message: 'Địa chỉ không tồn tại'
                })
            }
        } else {
            userAddress = await UserAddress.query()
                .where('user_id', userAuth.id)
                .andWhere('default', true)
                .first()
        }

        const productPrice = carts.reduce((sum, cart) => sum + (cart.book.price * cart.quantity), 0)

        const paymentMethods = await PaymentMethod.query().where('status', 'active')

        // Gợi ý mã giảm giá
        const voucherAvailables = await Voucher.query()
            .where('status', Voucher.STATUS.ACTIVE)
            .andWhere('start_date', '<=', DateTime.now().toFormat(DatetimeUtils.FORMAT_DATETIME_WITH_SQL))
            .andWhere('end_date', '>=', DateTime.now().toFormat(DatetimeUtils.FORMAT_DATETIME_WITH_SQL))
            .andWhere('require_order_min_price', '<=', productPrice)
            .andWhere(voucherAvailable => {
                voucherAvailable.where('voucherType', Voucher.TYPE.GENERAL)
                    .orWhere('userId', user.id)
                    .orWhere('userLevelId', user.userLevelId)
            })
            // Không gợi ý mã giảm giá đã sử dụng
            // Và cũng không được sử dụng
            .andWhereNotExists(voucherUsed => {
                voucherUsed.from('voucher_usage_histories')
                    .whereColumn('voucher_usage_histories.voucher_id', 'vouchers.id')
                    .andWhereColumn('voucher_usage_histories.user_id', userAuth.id)
            })

        // Phí ship tạm thời mặc định 29k
        // Tính toán ở dưới
        let shipFee = 29000
        // Tính toán tiền vận chuyển
        try {
            if (userAddress) {
                shipFee = await calculateFee(userAddress, carts)
            }
        } catch { }

        const price = {
            productPrice,
            shipFee: shipFee,
            discountPrice: 0,
            total: productPrice + shipFee
        }

        // Nếu có sử dụng mã giảm giá
        if (voucherCode) {
            for (const voucherAvailable of voucherAvailables) {
                // Mã giảm giá phải hợp lệ
                // Thì mới tính toán giảm giá tiền
                if (voucherAvailable.voucherCode === voucherCode) {
                    price.discountPrice = price.productPrice * (voucherAvailable.discountPercentage / 100)
                    if (voucherAvailable.discountMaxPrice) {
                        if (price.discountPrice > voucherAvailable.discountMaxPrice) {
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
