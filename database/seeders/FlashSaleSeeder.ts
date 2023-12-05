import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import FlashSale from 'App/Models/FlashSale'
import { DateTime } from 'luxon'

export default class extends BaseSeeder {
    public async run() {
        // Write your database queries inside the run method
        await FlashSale.createMany([
            {
                id: 1,
                eventName: 'Flash sale tưng bừng 05/12/2023',
                eventDate: DateTime.fromFormat('05-12-2023', 'dd-MM-yyyy'),
            },
            {
                id: 2,
                eventName: 'Flash sale tưng bừng 06/12/2023',
                eventDate: DateTime.fromFormat('06-12-2023', 'dd-MM-yyyy'),
            },
            {
                id: 3,
                eventName: 'Flash sale tưng bừng 07/12/2023',
                eventDate: DateTime.fromFormat('07-12-2023', 'dd-MM-yyyy'),
            },
            {
                id: 4,
                eventName: 'Flash sale tưng bừng 08/12/2023',
                eventDate: DateTime.fromFormat('08-12-2023', 'dd-MM-yyyy'),
            },
            {
                id: 5,
                eventName: 'Flash sale tưng bừng 09/12/2023',
                eventDate: DateTime.fromFormat('09-12-2023', 'dd-MM-yyyy'),
            },
            {
                id: 6,
                eventName: 'Flash sale tưng bừng 10/12/2023',
                eventDate: DateTime.fromFormat('10-12-2023', 'dd-MM-yyyy'),
            },
        ])
    }
}
