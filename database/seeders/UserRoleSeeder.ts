import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import UserRole from 'App/Models/UserRole'

export default class extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    await UserRole.createMany([
      {
        name: 'Admin'
      },
      {
        name: 'Customer'
      }
    ])
  }
}
