import Route from '@ioc:Adonis/Core/Route'


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

