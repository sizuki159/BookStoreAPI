import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Levels from 'App/Enums/Levels'
import Roles from 'App/Enums/Roles'
import User from 'App/Models/User'

export default class extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    await User.createMany([
      {
        email: 'admin@gmail.com',
        password: '12345',
        userRoleId: Roles.ADMIN,
        userLevelId: Levels.SILVER,
      }
    ])
  }
}
