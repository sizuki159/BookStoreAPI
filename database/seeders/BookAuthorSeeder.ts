import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import BookAuthor from 'App/Models/BookAuthor'

export default class extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    await BookAuthor.createMany([
      {
        authorName: 'Hồ Anh Thái'
      },
      {
        authorName: 'Nguyễn Vĩnh Nguyên'
      },
      {
        authorName: 'Nguyễn Trương Quý'
      },
      {
        authorName: 'Đỗ Bích Thúy'
      },
      {
        authorName: 'Nguyễn Mai Chi'
      },
      {
        authorName: 'Nguyễn Nhật Ánh'
      },
      {
        authorName: 'Trang Hạ'
      },
      {
        authorName: 'Nguyễn Phong Việt'
      },
      {
        authorName: 'Anh Khang'
      },
      {
        authorName: 'Sơn Paris'
      },
      {
        authorName: 'Gào'
      },
      {
        authorName: 'Nguyễn Ngọc Thạch'
      },
      {
        authorName: 'Đỗ Nhật Nam'
      },
      {
        authorName: 'Hamlet Trương'
      },
      {
        authorName: 'Hamlet Trương'
      },
    ])
  }
}
