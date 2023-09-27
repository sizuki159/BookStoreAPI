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


Route.group(() => {
  Route.get('', 'TestsController.index').middleware('auth')
}).prefix('test')

//#region Address
Route.group(() => {
  Route.group(() => {
    Route.get('/', 'AddressController.getProvince')
    Route.get('/:provinceId', 'AddressController.getDistrictWithProvinceId')
  }).prefix('province')

  Route.get('/district/:districtId', 'AddressController.getWardsWithDistrictId')
}).prefix('address')
//#endregion


Route.group(() => {
  Route.get('', 'ParentCategoryController.getAll')
  Route.get('/:pcategory_id', 'ParentCategoryController.getDetail')
  Route.post('', 'ParentCategoryController.create')
  Route.put('', 'ParentCategoryController.update')
  Route.delete('', 'ParentCategoryController.delete')
}).prefix('parent_controller')

Route.group(() => {
  Route.get('', 'ChildCategoryController.getAll')
  Route.post('', 'ChildCategoryController.create')
  Route.put('', 'ChildCategoryController.update')
  Route.delete('', 'ChildCategoryController.delete')
}).prefix('child_controller')

Route.group(() => {
  Route.post('register', 'AuthController.register')
  Route.post('login', 'AuthController.login')
  Route.post('refresh_token', 'AuthController.refreshToken')
}).prefix('auth')

