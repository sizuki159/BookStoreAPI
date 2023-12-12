import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import FlashSale from 'App/Models/FlashSale'
import { DateTime } from 'luxon'

export default class extends BaseSeeder {
    public async run() {
        // Write your database queries inside the run method
        for(let day = 12; day <= 31; day++) {
            await FlashSale.create({
                eventName: `Flash sale tưng bừng ${day}/12/2023`,
                eventDate: DateTime.fromFormat(`${day}-12-2023`, 'dd-MM-yyyy'),
            })
        }
    }
}
