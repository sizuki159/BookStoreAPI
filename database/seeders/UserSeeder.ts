import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    await User.createMany([
      {
        email: 'admin@gmail.com',
        fullname: 'Quách Diệu Khánh',
        password: '12345',
        userRoleId: 1,
        userLevelId: 1,
      }
    ])
  }
}
