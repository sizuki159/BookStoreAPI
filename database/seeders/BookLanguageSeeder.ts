import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import BookLanguage from 'App/Models/BookLanguage'

export default class extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    await BookLanguage.createMany([
      {
        languageName: 'Tiếng Việt',
      },
      {
        languageName: 'Tiếng Anh',
      },
      {
        languageName: 'Song Ngữ Anh - Việt',
      },
      {
        languageName: 'Tiếng Nhật',
      },
      {
        languageName: 'Tiếng Trung',
      },
      {
        languageName: 'Tiếng Hàn',
      },
      {
        languageName: 'Tiếng Pháp',
      },
    ])
  }
}
