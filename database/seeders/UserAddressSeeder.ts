import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import UserAddress from 'App/Models/UserAddress'

export default class extends BaseSeeder {
    public async run() {
        // Write your database queries inside the run method
        await UserAddress.createMany([
            {
                recipientName: 'Nguyễn Thành Trung',
                recipientPhone: '0334674390',
                street: 'D1/3 đường 385',
                userId: 1,
                isDefault: true,
                wardsId: 8782
            },
            {
                recipientName: 'Quách Diệu Khánh',
                recipientPhone: '0938427896',
                street: '12/6/8 Hoàng Hoa Thám',
                userId: 2,
                isDefault: true,
                wardsId: 8714
            },
        ])
    }
}
