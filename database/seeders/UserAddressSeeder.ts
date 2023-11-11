import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import UserAddress from 'App/Models/UserAddress'

export default class extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    await UserAddress.createMany([
      {
        recipientName: 'Nguyễn Thành Trung',
        recipientPhone: '0334674390',
        street: 'D1/3 đường 385',
        userId: 1,
        isDefault: true,
        wardsId: 8782
      }
    ])
  }
}
