import Route from '@ioc:Adonis/Core/Route'

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
        Route.get('/my-order', 'UserOrderController.getAllMyOrders')
        Route.get('/my-order/:order_id', 'UserOrderController.orderDetail')
        Route.get('/my-order/status/:status', 'UserOrderController.getMyOrdersWithStatus')
        Route.get('/statistic', 'UserOrderController.getStatisticMyOrder')

        Route.post('/review/write', 'UserOrderReviewController.writeReview')
        Route.delete('/review/delete/:review_id', 'UserOrderReviewController.deleteReview')

        Route.put('/completed/:order_id', 'UserOrderController.confirmedCompletedOrder')
        Route.delete('/cancel/:order_id', 'UserOrderController.cancelOrder')

        Route.get('/my-order/:order_id/invoice', 'UserInvoiceController.requestPrintInvoice')


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
