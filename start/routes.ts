/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('test', 'TestsController.test')
Route.get('test/result', 'TestsController.result')

//#region Auth
Route.group(() => {
    Route.post('register', 'AuthController.register')
    Route.post('login', 'AuthController.login')
    Route.post('refresh_token', 'AuthController.refreshToken')

    // Verify Email
    Route.get('/verify/email/:token', 'VerifyEmailController.verify')
    Route.post('/request-verify', 'AuthController.requestEmailVerify')
    Route.get('/check/is-verified', 'VerifyEmailController.checkEmailVerified')

    // Recovery password Email
    Route.post('/verify/email/reset_password', 'VerifyEmailController.verifyResetPassword')

    Route.post('request-recovery', 'AuthController.requestRecovery')
}).prefix('auth')
//#endregion

//#region Administrator

Route.group(() => {

    Route.group(() => {
        //#region Book Language
        Route.group(() => {
            Route.get('', 'AdminBookLanguageController.getAll')
            Route.get('/trashed', 'AdminBookLanguageController.getAllWithTrashed')
            Route.post('', 'AdminBookLanguageController.add')
            Route.put('', 'AdminBookLanguageController.update')
            Route.delete('/delete/:language_id', 'AdminBookLanguageController.delete')
            Route.delete('/destroy/:language_id', 'AdminBookLanguageController.destroy')
            Route.patch('/restore/:language_id', 'AdminBookLanguageController.restore')
        }).prefix('language')
        //#endregion

        //#region Book Form
        Route.group(() => {
            Route.get('', 'AdminBookFormController.getAll')
            Route.get('/trashed', 'AdminBookFormController.getAllWithTrashed')
            Route.post('', 'AdminBookFormController.add')
            Route.put('', 'AdminBookFormController.update')
            Route.delete('/delete/:book_form_id', 'AdminBookFormController.delete')
            Route.delete('/destroy/:book_form_id', 'AdminBookFormController.destroy')
            Route.patch('/restore/:book_form_id', 'AdminBookFormController.restore')
        }).prefix('form')
        //#endregion

        //#region Book Author
        Route.group(() => {
            Route.get('', 'AdminBookAuthorController.getAll')
            Route.get('/trashed', 'AdminBookAuthorController.getAllWithTrashed')
            Route.post('', 'AdminBookAuthorController.add')
            Route.put('', 'AdminBookAuthorController.update')
            Route.delete('/delete/:book_author_id', 'AdminBookAuthorController.delete')
            Route.delete('/destroy/:book_author_id', 'AdminBookAuthorController.destroy')
            Route.patch('/restore/:book_author_id', 'AdminBookAuthorController.restore')
        }).prefix('author')
        //#endregion

        //#region Book Publisher
        Route.group(() => {
            Route.get('', 'AdminBookPublisherController.getAll')
            Route.get('/trashed', 'AdminBookPublisherController.getAllWithTrashed')
            Route.post('', 'AdminBookPublisherController.add')
            Route.put('', 'AdminBookPublisherController.update')
            Route.delete('/delete/:book_publisher_id', 'AdminBookPublisherController.delete')
            Route.delete('/destroy/:book_publisher_id', 'AdminBookPublisherController.destroy')
            Route.patch('/restore/:book_publisher_id', 'AdminBookPublisherController.restore')
        }).prefix('publisher')
        //#endregion

        //#region Book Provider
        Route.group(() => {
            Route.get('', 'AdminBookProviderController.getAll')
            Route.get('/trashed', 'AdminBookProviderController.getAllWithTrashed')
            Route.post('', 'AdminBookProviderController.add')
            Route.put('', 'AdminBookProviderController.update')
            Route.delete('/delete/:book_provider_id', 'AdminBookProviderController.delete')
            Route.delete('/destroy/:book_provider_id', 'AdminBookProviderController.destroy')
            Route.patch('/restore/:book_provider_id', 'AdminBookProviderController.restore')
        }).prefix('provider')
        //#endregion


        //#region Book Product
        Route.group(() => {
            Route.get('/', 'AdminBookController.getListBook')
            Route.get('/trashed', 'AdminBookController.getListBookTrashed')
            Route.get('/:isbn_code', 'AdminBookController.getBookDetail')
            Route.post('/', 'AdminBookController.add')
            Route.put('/', 'AdminBookController.edit')
            Route.delete('/delete/:isbn_code', 'AdminBookController.delete')
            Route.delete('/destroy/:isbn_code', 'AdminBookController.destroy')
            Route.patch('/restore/:isbn_code', 'AdminBookController.restore')

            Route.group(() => {
                Route.post('/:isbn_code', 'AdminBookController.addImage')
                Route.delete('/:book_image_id', 'AdminBookController.deleteImage')
            }).prefix('image')

        }).prefix('product')
        //#endregion

    }).prefix('book')

    //#region Quản lý Category
    Route.group(() => {
        Route.group(() => {
            Route.get('', 'AdminParentCategoryController.getAll')
            Route.get('/trashed', 'AdminParentCategoryController.getAllWithTrashed')
            Route.get('/:pcategory_id', 'AdminParentCategoryController.getDetail')
            Route.post('', 'AdminParentCategoryController.create')
            Route.put('', 'AdminParentCategoryController.update')
            Route.delete('/delete/:pcategory_id', 'AdminParentCategoryController.delete')
            Route.delete('/destroy/:pcategory_id', 'AdminParentCategoryController.destroy')
            Route.patch('/restore/:pcategory_id', 'AdminParentCategoryController.restore')
        }).prefix('parent')


        Route.group(() => {
            Route.get('', 'AdminChildCategoryController.getAll')
            Route.get('/trashed', 'AdminChildCategoryController.getAllWithTrashed')
            Route.post('', 'AdminChildCategoryController.create')
            Route.put('', 'AdminChildCategoryController.update')
            Route.delete('/delete/:ccategory_id', 'AdminChildCategoryController.delete')
            Route.delete('/destroy/:ccategory_id', 'AdminChildCategoryController.destroy')
            Route.patch('/restore/:ccategory_id', 'AdminChildCategoryController.restore')
        }).prefix('child')

    }).prefix('category')
    //#endregion

    Route.group(() => {
        Route.get('', 'AdminVoucherController.getAll')
        Route.get('/general', 'AdminVoucherController.getVoucherGeneral')
        Route.get('/personalized', 'AdminVoucherController.getVoucherPersonalized')
        Route.get('/member_exclusive', 'AdminVoucherController.getVoucherMemberExclusive')
        Route.get('/detail/:voucher_id', 'AdminVoucherController.getVoucherDetail')
        Route.post('', 'AdminVoucherController.addVoucher')
    }).prefix('voucher')

    //#region Quản lý Flash Sale
    Route.group(() => {
        Route.get('/all', 'AdminFlashSaleController.getAllFlashSale')
        Route.get('/:flash_sale_id/hour', 'AdminFlashSaleController.getFlashSaleAllHour')
        Route.get('/hour/:flash_sale_hour_id', 'AdminFlashSaleController.getFlashSaleHourDetail')


        Route.post('/create', 'AdminFlashSaleController.createFlashSale')
        Route.post('/hour/create', 'AdminFlashSaleController.createHourOnFlashSaleEvent')
        Route.post('/hour/add-product', 'AdminFlashSaleController.addProductToFlashSaleHour')

        Route.delete('/hour/:flash_sale_hour_id/delete-product/:isbn_code', 'AdminFlashSaleController.deleteProductFromFlashSaleHour')
        Route.put('/hour/update', 'AdminFlashSaleController.updateFlashSaleHour')
    }).prefix('flash-sale')
    //#endregion

    //#region Quản lý Đơn hàng
    Route.group(() => {
        Route.get('/all', 'AdminBookOrderedController.getAllOrder')
        Route.get('/detail/:order_id', 'AdminBookOrderedController.orderDetail')

        Route.put('/confirmed/:order_id', 'AdminBookOrderedController.confirmOrder')
        Route.put('/delivering/:order_id', 'AdminBookOrderedController.deliveringOrder')
        Route.delete('/cancel/:order_id', 'AdminBookOrderedController.cancelOrder')

    }).prefix('order')
    //#endregion

    //#region Thống kê hệ thống
    Route.group(() => {
        Route.get('', 'AdminStatisticController.getStatistic')
    }).prefix('statistic')
    //#endregion

    //#region Quản lý người dùng
    Route.group(() => {
        Route.get('', 'AdminUserController.getAllUsers')
        Route.put('/locked/:user_id', 'AdminUserController.lockUser')
        Route.put('/unlocked/:user_id', 'AdminUserController.unlockUser')
    }).prefix('user')
    //#endregion

}).prefix('admin').namespace('App/Controllers/Http/Admin').middleware(['auth', 'admin'])
//#endregion

Route.group(() => {

    //#region User Profile
    Route.group(() => {
        Route.get('', 'UserProfileController.getInfo')
        Route.post('', 'UserProfileController.updateOrCreate')
        Route.patch('/password', 'UserProfileController.changePassword')

        Route.post('/upload-avatar', 'UserProfileController.uploadAvatar')
    }).prefix('profile')
    //#endregion

    Route.group(() => {
        Route.group(() => {
            Route.get('', 'UserAddressController.getAll')
            Route.post('', 'UserAddressController.store')
            Route.get('/default', 'UserAddressController.getDefault')
            Route.get('/not_default', 'UserAddressController.getNonDefault')
            Route.put('/:user_address_id', 'UserAddressController.update')
            Route.delete('/destroy/:user_address_id', 'UserAddressController.destroy')
            Route.put('/set_default/:user_address_id', 'UserAddressController.setDefault')
        }).prefix('address')

    }).prefix('info')

    Route.group(() => {
        Route.get('', 'UserCartController.getMyCart')
        Route.post('', 'UserCartController.addProductToCart')
        Route.put('', 'UserCartController.updateQuantityFromCart')
        Route.put('/increase/:id', 'UserCartController.increase')
        Route.put('/decrease/:id', 'UserCartController.decrease')
        Route.delete('/:isbn_code', 'UserCartController.deleteBookFromCart')

        Route.post('/pre_order', 'UserCartController.preOrder')
    }).prefix('cart')

    // User Order
    Route.group(() => {
        Route.post('/create', 'UserOrderController.createOrder')
        Route.get('/my-order', 'UserOrderController.getMyOrder')
        Route.get('/my-order/:order_id', 'UserOrderController.orderDetail')

        Route.post('/review/write', 'UserOrderReviewController.writeReview')
        Route.delete('/review/delete/:review_id', 'UserOrderReviewController.deleteReview')

        Route.put('/completed/:order_id', 'UserOrderController.confirmedCompletedOrder')
        Route.delete('/cancel/:order_id', 'UserOrderController.cancelOrder')
    }).prefix('order')

    Route.group(() => {
        Route.get('/voucher-partner', 'UserVoucherController.getVoucherPartner')
        Route.get('/voucher-personalized', 'UserVoucherController.getVoucherPersonalized')
    }).prefix('voucher')

    Route.group(() => {
        Route.post('/write', 'UserBookCommentController.writeComment')
        Route.put('/edit', 'UserBookCommentController.editComment')
        Route.delete('/delete/:comment_id', 'UserBookCommentController.deleteComment')
    }).prefix('comment')

}).prefix('user').namespace('App/Controllers/Http/User').middleware('auth')


Route.group(() => {
    //#region Address
    Route.group(() => {
        Route.group(() => {
            Route.get('/', 'AddressController.getProvince')
            Route.get('/:provinceId', 'AddressController.getDistrictWithProvinceId')
        }).prefix('province')

        Route.get('/district/:districtId', 'AddressController.getWardsWithDistrictId')
    }).prefix('address')
    //#endregion

    //#region Book Product
    Route.group(() => {
        Route.get('/', 'BookAPIController.getBookWithFilter')
        Route.get('/:isbn_code', 'BookAPIController.getBookByIBSNCode')
        Route.get('/slug/:slug', 'BookAPIController.getBookBySlug')

        Route.group(() => {
            Route.get('/:isbn_code', 'BookCommentAPIController.getCommentByISBNCode')
        }).prefix('comment')

    }).prefix('book')
    //#endregion

    //#region category
    Route.group(() => {
        Route.get('/', 'CategoryAPIController.getAllCategory')
        Route.get('/detail/:pcategory_id', 'CategoryAPIController.getPCategoryDetail')
    }).prefix('category')
    //#endregion

    //#region book form
    Route.group(() => {
        Route.get('/', 'BookFormAPIController.getAllBookForm')
    }).prefix('book-form')
    //#endregion

    //#region bool publisher
    Route.group(() => {
        Route.get('/', 'BookPublisherAPIController.getAllPublisher')
    }).prefix('book-publisher')
    //#endregion

    //#region bool author
    Route.group(() => {
        Route.get('/', 'BookAuthorAPIController.getAll')
    }).prefix('book-author')
    //#endregion

    //#region bool lang
    Route.group(() => {
        Route.get('/', 'BookLanguageAPIController.getAll')
    }).prefix('book-lang')
    //#endregion

    //#region bool provider
    Route.group(() => {
        Route.get('/', 'BookProviderAPIController.getAll')
    }).prefix('book-provider')
    //#endregion

    //#region Flash Sale
    Route.group(() => {

        Route.get('/now', 'FlashSaleAPIController.getFlashSaleNow')

        Route.get('/today/accessable-periods', 'FlashSaleAPIController.getFlashSaleTodayAccessable')
        Route.get('/hour/:flash_sale_hour_id', 'FlashSaleAPIController.getFlashSaleHourProducts')

    }).prefix('flash-sale')
    //#endregion


    //#region Payment Process
    Route.group(() => {
        Route.group(() => {
            Route.get('success', 'PaypalController.success')
            Route.get('cancel', 'PaypalController.cancel')
        }).prefix('paypal')

        Route.group(() => {
            Route.get('process', 'VNPayController.process')
        }).prefix('vnpay')

    }).prefix('payment').namespace('App/Controllers/Http/Payment')

    //#endregion

}).prefix('api').namespace('App/Controllers/Http/API')

