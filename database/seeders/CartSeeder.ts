import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Book from 'App/Models/Book'
import User from 'App/Models/User'

export default class extends BaseSeeder {
    public async run() {
        // Write your database queries inside the run method
        const books = await Book.all()
        const users = await User.all()

        function getRandomObject<T>(array: T[]): T | undefined {
            const randomIndex = Math.floor(Math.random() * array.length)
            return array[randomIndex]
        }

        for (const user of users) {
            for (let i = 0; i < 5; i++) {
                const book = getRandomObject(books)
                if (book) {
                    try {
                        await user.related('carts').create({
                            userId: user.id,
                            isbnCode: book.isbnCode,
                            quantity: Math.round(book.quantity * 0.1),
                        })
                    } catch {}
                }
            }
        }
    }
}
