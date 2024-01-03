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
                startDate: DateTime.fromFormat('01-01-2024 00:00:00', 'dd-MM-yyyy HH:mm:ss'),
                endDate: DateTime.fromFormat('31-01-2024 23:59:59', 'dd-MM-yyyy HH:mm:ss'),
                status: Voucher.STATUS.ACTIVE,
            },
            {
                voucherName: 'Khai trương 01',
                voucherType: 'General',
                voucherCode: 'MUNGKHAITRUONG01',
                discountPercentage: 40,
                limited: 100,
                desc: 'Chào mừng khai trương, giảm giá lên đến 40%',
                startDate: DateTime.fromFormat('01-01-2024 00:00:00', 'dd-MM-yyyy HH:mm:ss'),
                endDate: DateTime.fromFormat('31-01-2024 23:59:59', 'dd-MM-yyyy HH:mm:ss'),
                status: Voucher.STATUS.ACTIVE,
            },
            {
                voucherName: 'Khai trương 02',
                voucherType: 'General',
                voucherCode: 'MUNGKHAITRUONG02',
                discountPercentage: 40,
                limited: 100,
                desc: 'Chào mừng khai trương, giảm giá lên đến 40%',
                startDate: DateTime.fromFormat('01-01-2024 00:00:00', 'dd-MM-yyyy HH:mm:ss'),
                endDate: DateTime.fromFormat('31-01-2024 23:59:59', 'dd-MM-yyyy HH:mm:ss'),
                status: Voucher.STATUS.ACTIVE,
            },
            {
                voucherName: 'Khai trương 03',
                voucherType: 'General',
                voucherCode: 'MUNGKHAITRUONG03',
                discountPercentage: 40,
                limited: 100,
                desc: 'Chào mừng khai trương, giảm giá lên đến 40%',
                startDate: DateTime.fromFormat('01-01-2024 00:00:00', 'dd-MM-yyyy HH:mm:ss'),
                endDate: DateTime.fromFormat('31-01-2024 23:59:59', 'dd-MM-yyyy HH:mm:ss'),
                status: Voucher.STATUS.ACTIVE,
            },
            {
                voucherName: 'Khai trương 04',
                voucherType: 'General',
                voucherCode: 'MUNGKHAITRUONG04',
                discountPercentage: 40,
                limited: 100,
                desc: 'Chào mừng khai trương, giảm giá lên đến 40%',
                startDate: DateTime.fromFormat('01-01-2024 00:00:00', 'dd-MM-yyyy HH:mm:ss'),
                endDate: DateTime.fromFormat('31-01-2024 23:59:59', 'dd-MM-yyyy HH:mm:ss'),
                status: Voucher.STATUS.ACTIVE,
            },
        ])
    }
}
