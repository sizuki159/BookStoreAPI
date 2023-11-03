import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Voucher from 'App/Models/Voucher'
import { DateTime } from 'luxon'

export default class extends BaseSeeder {
    public async run() {
        // Write your database queries inside the run method
        await Voucher.createMany([
            {
                voucherName: 'Khai trương tưng bừng',
                voucherType: 'General',
                voucherCode: 'MUNGKHAITRUONG2023',
                discountPercentage: 40,
                limited: 100,
                desc: 'Chào mừng khai trương, giảm giá lên đến 40%',
                startDate: DateTime.fromFormat('02-11-2023 00:00:00', 'dd-MM-yyyy HH:mm:ss'),
                endDate: DateTime.fromFormat('30-11-2023 23:59:59', 'dd-MM-yyyy HH:mm:ss'),
                status: Voucher.STATUS.ACTIVE,
            }
        ])
    }
}
