import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import ParentCategory from 'App/Models/ParentCategory'

export default class extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    await ParentCategory.createMany([
      {
        id: 1,
        name: 'Văn học'
      },
      {
        id: 2,
        name: 'Kinh tế'
      },
      {
        id: 3,
        name: 'Tâm lý - Kĩ năng sống'
      },
      {
        id: 4,
        name: 'Nuôi dạy con'
      },
      {
        id: 5,
        name: 'Sách thiếu nhi'
      },
      {
        id: 6,
        name: 'Tiểu sử - Hồi ký'
      },
      {
        id: 7,
        name: 'Giáo khoa - Tham khảo'
      },
      {
        id: 8,
        name: 'Sách học ngoại ngữ'
      }
    ])
  }
}
