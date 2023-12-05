import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import FlashSale from 'App/Models/FlashSale'
import FlashSaleHour from 'App/Models/FlashSaleHour'
import { DateTime } from 'luxon'

export default class extends BaseSeeder {
    public async run() {
        // Write your database queries inside the run method

        const flashSales = await FlashSale.all()
        for(const flashSale of flashSales) {
            await flashSale.related('hours').createMany([
                {
                    percentDiscount: 90,
                    timeStart: DateTime.fromFormat('06:00:00', 'HH:mm:ss'),
                    timeEnd: DateTime.fromFormat('07:59:59', 'HH:mm:ss'),
                },
                {
                    percentDiscount: 80,
                    timeStart: DateTime.fromFormat('08:00:00', 'HH:mm:ss'),
                    timeEnd: DateTime.fromFormat('09:59:59', 'HH:mm:ss'),
                },
                {
                    percentDiscount: 70,
                    timeStart: DateTime.fromFormat('10:00:00', 'HH:mm:ss'),
                    timeEnd: DateTime.fromFormat('11:59:59', 'HH:mm:ss'),
                },
                {
                    percentDiscount: 60,
                    timeStart: DateTime.fromFormat('12:00:00', 'HH:mm:ss'),
                    timeEnd: DateTime.fromFormat('13:59:59', 'HH:mm:ss'),
                },
                {
                    percentDiscount: 50,
                    timeStart: DateTime.fromFormat('14:00:00', 'HH:mm:ss'),
                    timeEnd: DateTime.fromFormat('15:59:59', 'HH:mm:ss'),
                },
                {
                    percentDiscount: 40,
                    timeStart: DateTime.fromFormat('14:00:00', 'HH:mm:ss'),
                    timeEnd: DateTime.fromFormat('15:59:59', 'HH:mm:ss'),
                },
                {
                    percentDiscount: 30,
                    timeStart: DateTime.fromFormat('16:00:00', 'HH:mm:ss'),
                    timeEnd: DateTime.fromFormat('17:59:59', 'HH:mm:ss'),
                },
                {
                    percentDiscount: 20,
                    timeStart: DateTime.fromFormat('18:00:00', 'HH:mm:ss'),
                    timeEnd: DateTime.fromFormat('19:59:59', 'HH:mm:ss'),
                },
                {
                    percentDiscount: 10,
                    timeStart: DateTime.fromFormat('20:00:00', 'HH:mm:ss'),
                    timeEnd: DateTime.fromFormat('21:59:59', 'HH:mm:ss'),
                },
            ])
        }
    }
}
