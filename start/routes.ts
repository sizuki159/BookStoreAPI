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

//#region Address
Route.group(() => {
  Route.group(() => {
    Route.get('/', 'AddressController.getProvince').middleware('auth')
    Route.get('/:provinceId', 'AddressController.getDistrictWithProvinceId')
  }).prefix('province')

  Route.get('/district/:districtId', 'AddressController.getWardsWithDistrictId')
}).prefix('address')
//#endregion

Route.group(() => {
  Route.post('register', 'AuthController.register')
  Route.post('login', 'AuthController.login')
}).prefix('auth')

