import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import FlashSale from 'App/Models/FlashSale'
import { DateTime } from 'luxon'

export default class extends BaseSeeder {
    public async run() {
        // Write your database queries inside the run method

        // Ngày 1 đến 10 tháng 1 năm 2024
        for (let day = 1; day <= 10; day++) {
            const formattedDay = day.toString().padStart(2, '0');
            await FlashSale.create({
                eventName: `Flash sale tưng bừng ${formattedDay}/01/2024`,
                eventDate: DateTime.fromFormat(`${formattedDay}-01-2024`, 'dd-MM-yyyy'),
            })
        }
    }
}
