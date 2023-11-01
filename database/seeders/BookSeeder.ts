import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Book from 'App/Models/Book'

export default class extends BaseSeeder {
    public async run() {
        // Write your database queries inside the run method
        await Book.createMany([
        ])
    }
}
