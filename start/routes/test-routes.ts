import Route from '@ioc:Adonis/Core/Route'


Route.get('test', 'TestsController.test')
Route.get('test/result', 'TestsController.result')