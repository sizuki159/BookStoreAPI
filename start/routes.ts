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
      Route.get('/:isbn_code', 'BookController.getBookDetail')
      Route.post('/', 'BookController.add')
      Route.put('/', 'BookController.edit')
      Route.delete('/delete/:isbn_code', 'BookController.delete')
      Route.delete('/destroy/:isbn_code', 'BookController.destroy')
      Route.patch('/restore/:isbn_code', 'BookController.restore')

      Route.group(() => {
        Route.post('/:isbn_code', 'BookController.addImage')
      }).prefix('image')

    }).prefix('product')
    //#endregion
    
  }).prefix('book')
  
  Route.group(() => {
    //#region Parent Category
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
    //#endregion
  
  
    //#region Child Category
    Route.group(() => {
      Route.get('', 'ChildCategoryController.getAll')
      Route.get('/trashed', 'ChildCategoryController.getAllWithTrashed')
      Route.post('', 'ChildCategoryController.create')
      Route.put('', 'ChildCategoryController.update')
      Route.delete('/delete/:ccategory_id', 'ChildCategoryController.delete')
      Route.delete('/destroy/:ccategory_id', 'ChildCategoryController.destroy')
      Route.patch('/restore/:ccategory_id', 'ChildCategoryController.restore')
    }).prefix('child')
    //#endregion

  }).prefix('category')
  
  

}).prefix('admin').namespace('App/Controllers/Http/Admin').middleware(['auth', 'admin'])
//#endregion

Route.group(() => {

  Route.group(() => {
    Route.get('', 'UserProfileController.getInfo')
    Route.post('', 'UserProfileController.updateOrCreate')
    Route.patch('/password', 'UserProfileController.changePassword')
  }).prefix('profile')

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
  }).prefix('book')
  //#endregion
}).prefix('api').namespace('App/Controllers/Http/API')



