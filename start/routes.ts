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
  //#region Book Language
  Route.group(() => {
    Route.get('', 'BookLanguageController.getAll')
    Route.get('/trashed', 'BookLanguageController.getAllWithTrashed')
    Route.post('', 'BookLanguageController.add')
    Route.put('', 'BookLanguageController.update')
    Route.delete('/delete/:language_id', 'BookLanguageController.delete')
    Route.delete('/destroy/:language_id', 'BookLanguageController.destroy')
    Route.patch('/restore/:language_id', 'BookLanguageController.restore')
  }).prefix('book_language')
  //#endregion

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
  }).prefix('parent_category')
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
  }).prefix('child_category')
  //#endregion

}).prefix('admin')

//#endregion

Route.group(() => {
  
}).prefix('user').middleware('auth')


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
}).prefix('api')












Route.group(() => {
  Route.get('', 'TestsController.index').middleware('auth')
}).prefix('test')

