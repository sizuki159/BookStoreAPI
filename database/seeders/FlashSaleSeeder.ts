import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import FlashSale from 'App/Models/FlashSale'
import { DateTime } from 'luxon'

export default class extends BaseSeeder {
    public async run() {
        // Write your database queries inside the run method

        // // Ngày 1 đến 10 tháng 1 năm 2024
        // for (let day = 1; day <= 10; day++) {
        //     const formattedDay = day.toString().padStart(2, '0');
        //     await FlashSale.create({
        //         eventName: `Flash sale tưng bừng ${formattedDay}/01/2024`,
        //         eventDate: DateTime.fromFormat(`${formattedDay}-01-2024`, 'dd-MM-yyyy'),
        //     })
        // }

        // Ngày 20/1 đến 31/12 năm 2024
        for (let month = 1; month <= 12; month++) {
            for (let day = 1; day <= this.getLastDayOfMonth(2024, month); day++) {
                const formattedDay = day.toString().padStart(2, '0');
                const formattedMonth = month.toString().padStart(2, '0');
                await FlashSale.create({
                    eventName: `Flash sale tưng bừng ${formattedDay}/${formattedMonth}/2024`,
                    eventDate: DateTime.fromFormat(`${formattedDay}-${formattedMonth}-2024`, 'dd-MM-yyyy'),
                });
            }
        }
    }

    // Hàm để lấy số ngày cuối cùng của một tháng trong một năm
    private getLastDayOfMonth(year, month) {
        return new Date(year, month, 0).getDate();
    }

}
