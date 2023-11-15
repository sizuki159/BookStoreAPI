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

//#region Auth
Route.group(() => {
    Route.post('register', 'AuthController.register')
    Route.post('login', 'AuthController.login')
    Route.post('refresh_token', 'AuthController.refreshToken')
}).prefix('auth')
//#endregion

//#region Administrator

Route.group(() => {

    Route.group(() => {
        //#region Book Language
        Route.group(() => {
            Route.get('', 'BookLanguageController.getAll')
            Route.get('/trashed', 'BookLanguageController.getAllWithTrashed')
            Route.post('', 'BookLanguageController.add')
            Route.put('', 'BookLanguageController.update')
            Route.delete('/delete/:language_id', 'BookLanguageController.delete')
            Route.delete('/destroy/:language_id', 'BookLanguageController.destroy')
            Route.patch('/restore/:language_id', 'BookLanguageController.restore')
        }).prefix('language')
        //#endregion

        //#region Book Form
        Route.group(() => {
            Route.get('', 'BookFormController.getAll')
            Route.get('/trashed', 'BookFormController.getAllWithTrashed')
            Route.post('', 'BookFormController.add')
            Route.put('', 'BookFormController.update')
            Route.delete('/delete/:book_form_id', 'BookFormController.delete')
            Route.delete('/destroy/:book_form_id', 'BookFormController.destroy')
            Route.patch('/restore/:book_form_id', 'BookFormController.restore')
        }).prefix('form')
        //#endregion

        //#region Book Author
        Route.group(() => {
            Route.get('', 'BookAuthorController.getAll')
            Route.get('/trashed', 'BookAuthorController.getAllWithTrashed')
            Route.post('', 'BookAuthorController.add')
            Route.put('', 'BookAuthorController.update')
            Route.delete('/delete/:book_author_id', 'BookAuthorController.delete')
            Route.delete('/destroy/:book_author_id', 'BookAuthorController.destroy')
            Route.patch('/restore/:book_author_id', 'BookAuthorController.restore')
        }).prefix('author')
        //#endregion

        //#region Book Publisher
        Route.group(() => {
            Route.get('', 'BookPublisherController.getAll')
            Route.get('/trashed', 'BookPublisherController.getAllWithTrashed')
            Route.post('', 'BookPublisherController.add')
            Route.put('', 'BookPublisherController.update')
            Route.delete('/delete/:book_publisher_id', 'BookPublisherController.delete')
            Route.delete('/destroy/:book_publisher_id', 'BookPublisherController.destroy')
            Route.patch('/restore/:book_publisher_id', 'BookPublisherController.restore')
        }).prefix('publisher')
        //#endregion

        //#region Book Provider
        Route.group(() => {
            Route.get('', 'BookProviderController.getAll')
            Route.get('/trashed', 'BookProviderController.getAllWithTrashed')
            Route.post('', 'BookProviderController.add')
            Route.put('', 'BookProviderController.update')
            Route.delete('/delete/:book_provider_id', 'BookProviderController.delete')
            Route.delete('/destroy/:book_provider_id', 'BookProviderController.destroy')
            Route.patch('/restore/:book_provider_id', 'BookProviderController.restore')
        }).prefix('provider')
        //#endregion


        //#region Book Product
        Route.group(() => {
            Route.get('/', 'BookController.getListBook')
            Route.get('/trashed', 'BookController.getListBookTrashed')
            Route.get('/:isbn_code', 'BookController.getBookDetail')
            Route.post('/', 'BookController.add')
            Route.put('/', 'BookController.edit')
            Route.delete('/delete/:isbn_code', 'BookController.delete')
            Route.delete('/destroy/:isbn_code', 'BookController.destroy')
            Route.patch('/restore/:isbn_code', 'BookController.restore')

            Route.group(() => {
                Route.post('/:isbn_code', 'BookController.addImage')
                Route.delete('/:book_image_id', 'BookController.deleteImage')
            }).prefix('image')

        }).prefix('product')
        //#endregion

    }).prefix('book')

    //#region Category
    Route.group(() => {
        Route.group(() => {
            Route.get('', 'ParentCategoryController.getAll')
            Route.get('/trashed', 'ParentCategoryController.getAllWithTrashed')
            Route.get('/:pcategory_id', 'ParentCategoryController.getDetail')
            Route.post('', 'ParentCategoryController.create')
            Route.put('', 'ParentCategoryController.update')
            Route.delete('/delete/:pcategory_id', 'ParentCategoryController.delete')
            Route.delete('/destroy/:pcategory_id', 'ParentCategoryController.destroy')
            Route.patch('/restore/:pcategory_id', 'ParentCategoryController.restore')
        }).prefix('parent')


        Route.group(() => {
            Route.get('', 'ChildCategoryController.getAll')
            Route.get('/trashed', 'ChildCategoryController.getAllWithTrashed')
            Route.post('', 'ChildCategoryController.create')
            Route.put('', 'ChildCategoryController.update')
            Route.delete('/delete/:ccategory_id', 'ChildCategoryController.delete')
            Route.delete('/destroy/:ccategory_id', 'ChildCategoryController.destroy')
            Route.patch('/restore/:ccategory_id', 'ChildCategoryController.restore')
        }).prefix('child')

    }).prefix('category')
    //#endregion

    Route.group(() => {
        Route.get('', 'VoucherController.getAll')
        Route.get('/general', 'VoucherController.getVoucherGeneral')
        Route.get('/personalized', 'VoucherController.getVoucherPersonalized')
        Route.get('/member_exclusive', 'VoucherController.getVoucherMemberExclusive')
        Route.post('', 'VoucherController.addVoucher')
    }).prefix('voucher')


}).prefix('admin').namespace('App/Controllers/Http/Admin').middleware(['auth', 'admin'])
//#endregion

Route.group(() => {

    //#region User Profile
    Route.group(() => {
        Route.get('', 'UserProfileController.getInfo')
        Route.post('', 'UserProfileController.updateOrCreate')
        Route.patch('/password', 'UserProfileController.changePassword')
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


    Route.group(() => {
        Route.post('/create', 'UserOrderController.createOrder')
        Route.get('/my-order', 'UserOrderController.getMyOrder')
        Route.get('/my-order/:orderId', 'UserOrderController.orderDetail')
    }).prefix('order')

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
        Route.get('/slug/:book(slug)', 'BookAPIController.getBookBySlug')
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


    Route.group(() => {
        Route.group(() => {
            Route.get('success', 'PaypalController.success')
            Route.get('cancel', 'PaypalController.cancel')
        }).prefix('paypal')
    }).prefix('payment').namespace('App/Controllers/Http/Payment')

}).prefix('api').namespace('App/Controllers/Http/API')





