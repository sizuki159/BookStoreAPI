import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import BookPublisher from 'App/Models/BookPublisher'

export default class extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    await BookPublisher.createMany([
      {
          "name": "Nhà xuất bản Chính trị Quốc gia"
      },
      {
          "name": "Nhà xuất bản Tư pháp"
      },
      {
          "name": "Nhà xuất bản Hồng Đức"
      },
      {
          "name": "Nhà xuất bản Quân đội"
      },
      {
          "name": "Nhà xuất bản Công an nhân dân"
      },
      {
          "name": "Nhà xuất bản Kim Đồng"
      },
      {
          "name": "Nhà xuất bản Thanh niên"
      },
      {
          "name": "Nhà xuất bản Lao động"
      },
      {
          "name": "Nhà xuất bản Phụ nữ"
      },
      {
          "name": "Nhà xuất bản Mỹ thuật"
      },
      {
          "name": "Nhà xuất bản Sân khấu"
      },
      {
          "name": "Nhà xuất bản Hội nhà văn"
      },
      {
          "name": "Nhà xuất bản Lao động xã hội"
      },
      {
          "name": "Nhà xuất bản Khoa học xã hội"
      },
      {
          "name": "Nhà xuất bản Tôn giáo"
      },
      {
          "name": "Nhà xuất bản Thông tấn"
      },
      {
          "name": "Nhà xuất bản Bản đồ"
      },
      {
          "name": "Nhà xuất bản Bưu điện"
      },
      {
          "name": "Nhà xuất bản Giao thông"
      },
      {
          "name": "Nhà xuất bản Khoa học và kỹ thuật"
      },
      {
          "name": "Nhà xuất bản Khoa học tự nhiên và Công nghệ"
      },
      {
          "name": "Nhà xuất bản Nông nghiệp"
      },
      {
          "name": "Nhà xuất bản Tài chính"
      },
      {
          "name": "Nhà xuất bản Thống kê"
      },
      {
          "name": "Nhà xuất bản Thể dục thể thao"
      },
      {
          "name": "Nhà xuất bản Y học"
      },
      {
          "name": "Nhà xuất bản Xây dựng"
      },
      {
          "name": "Nhà xuất bản Từ điển bách khoa"
      },
      {
          "name": "Nhà xuất bản Tri thức"
      },
      {
          "name": "Nhà xuất bản Thế giới"
      },
      {
          "name": "Nhà xuất bản Âm nhạc"
      },
      {
          "name": "Nhà xuất bản Văn học"
      },
      {
          "name": "Nhà xuất bản Văn hoá dân tộc"
      },
      {
          "name": "Nhà xuất bản Văn hoá - Thông tin"
      },
      {
          "name": "Nhà xuất bản Lý luận chính trị"
      },
      {
          "name": "Nhà xuất bản Đại học kinh tế quốc dân"
      },
      {
          "name": "Nhà xuất bản Đại học Bách khoa Hà Nội"
      },
      {
          "name": "Nhà xuất bản Đại học Huế"
      },
      {
          "name": "Nhà xuất bản Đại học Quốc gia Hà Nội"
      },
      {
          "name": "Nhà xuất bản Đại học sư phạm"
      },
      {
          "name": "Nhà xuất bản Đại học Quốc gia thành phố Hồ Chí Minh"
      },
      {
          "name": "Nhà xuất bản Giáo dục"
      },
      {
          "name": "Nhà xuất bản Đại học Thái Nguyên"
      },
      {
          "name": "Nhà xuất bản Hà Nội"
      },
      {
          "name": "Nhà xuất bản Hải phòng"
      },
      {
          "name": "Nhà xuất bản Thanh Hoá"
      },
      {
          "name": "Nhà xuất bản Nghệ An"
      },
      {
          "name": "Nhà xuất bản Thuận Hoá"
      },
      {
          "name": "Nhà xuất bản Đà Nẵng"
      },
      {
          "name": "Nhà xuất bản Văn hoá Sài gòn"
      },
      {
          "name": "Nhà xuất bản Tổng hợp thành phố Hồ Chí Minh"
      },
      {
          "name": "Nhà xuất bản Trẻ"
      },
      {
          "name": "Nhà xuất bản Văn nghệ"
      },
      {
          "name": "Nhà xuất bản Đồng Nai"
      },
      {
          "name": "Nhà xuất bản Phương Đông"
      }
  ])
  }
}
