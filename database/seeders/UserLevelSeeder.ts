import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import UserLevel from 'App/Models/UserLevel'

export default class extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    await UserLevel.createMany([
      {
        'levelName': 'Basic',
        'discount': 0
      },
      {
        'levelName': 'Bronze',
        'discount': 3
      },
      {
        'levelName': 'Silver',
        'discount': 8
      },
      {
        'levelName': 'Golden',
        'discount': 15
      },
      {
        'levelName': 'Diamond',
        'discount': 24
      },
    ])
  }
}
