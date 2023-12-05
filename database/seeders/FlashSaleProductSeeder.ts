import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Book from 'App/Models/Book'
import FlashSaleHour from 'App/Models/FlashSaleHour'

export default class extends BaseSeeder {
    public async run() {
        // Write your database queries inside the run method

        const flashSaleHours = await FlashSaleHour.all()
        const allProducts = await Book.all()

        for (const flashSaleHour of flashSaleHours) {
            for (let i = 1; i <= 10; i++) {
                try {
                    await flashSaleHour.related('products').create(
                        {
                            isbnCode: this.getRandomObject(allProducts)?.isbnCode
                        }
                    )
                } catch {

                }
            }
        }
    }

    private getRandomObject<T>(array: T[]): T | undefined {
        const randomIndex = Math.floor(Math.random() * array.length)
        return array[randomIndex]
    }
}
