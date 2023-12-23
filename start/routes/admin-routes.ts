import Route from '@ioc:Adonis/Core/Route'


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
        Route.get('/statistic', 'AdminBookOrderedController.getStatisticAllOrder')
        Route.get('/all', 'AdminBookOrderedController.getAllOrder')
        Route.get('/detail/:order_id', 'AdminBookOrderedController.orderDetail')

        Route.put('/confirmed/:order_id', 'AdminBookOrderedController.confirmOrder')
        Route.put('/delivering/:order_id', 'AdminBookOrderedController.deliveringOrder')
        Route.delete('/cancel/:order_id', 'AdminBookOrderedController.cancelOrder')

    }).prefix('order')
    //#endregion

    //#region Thống kê hệ thống
    Route.group(() => {
        Route.get('/top-product', 'AdminStatisticController.topProductBestSeller')
        Route.get('/revenue', 'AdminStatisticController.getRevenueWithYear')
        Route.get('/revenue/current-year', 'AdminStatisticController.getRevenueCurrentYear')
        Route.get('/revenue/current-month', 'AdminStatisticController.getRevenueCurrentMonth')

        Route.get('/recent-transactions', 'AdminStatisticController.getRecentTransactions')
    }).prefix('statistic')
    //#endregion

    //#region Quản lý người dùng
    Route.group(() => {
        Route.get('', 'AdminUserController.getAllUsers')
        Route.get('/detail/:user_id', 'AdminUserController.getUserInformation')

        Route.put('/locked/:user_id', 'AdminUserController.lockUser')
        Route.put('/unlocked/:user_id', 'AdminUserController.unlockUser')
    }).prefix('user')
    //#endregion

}).prefix('admin').namespace('App/Controllers/Http/Admin').middleware(['auth', 'admin'])
