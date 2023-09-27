import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import BookForm from 'App/Models/BookForm'

export default class extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    await BookForm.createMany([
      {
        name: 'Bìa Mềm'
      },
      {
        name: 'Bìa Cứng'
      },
      {
        name: 'CD/DVD'
      },
      {
        name: 'Sách Kèm Đĩa'
      },
      {
        name: 'Bộ Hộp'
      },
      {
        name: 'Cards'
      },
    ])
  }
}
