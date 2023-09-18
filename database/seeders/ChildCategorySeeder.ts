import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import ChildCategory from 'App/Models/ChildCategory'

export default class extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    await ChildCategory.createMany([
      //#region Văn học
      {
        name: 'Tiểu Thuyết',
        parentCategoryId: 1
      },
      {
        name: 'Truyện Ngắn - Tản Văn',
        parentCategoryId: 1
      },
      {
        name: 'Light Novel',
        parentCategoryId: 1
      },
      {
        name: 'Ngôn Tình',
        parentCategoryId: 1
      },
      {
        name: 'Thơ Ca, Tục Ngữ, Ca Dao, Thành Ngữ',
        parentCategoryId: 1
      },
      {
        name: 'Phóng Sự - Ký Sự - Phê Bình Văn Học',
        parentCategoryId: 1
      },
      {
        name: 'Du Ký',
        parentCategoryId: 1
      },
      {
        name: 'Tác Giả - Tác Phẩm',
        parentCategoryId: 1
      },
      {
        name: '12 Cung Hoàng Đạo',
        parentCategoryId: 1
      },
      {
        name: 'Tuổi Teen',
        parentCategoryId: 1
      },
      {
        name: 'Hài Hước - Truyện Cười',
        parentCategoryId: 1
      },
      {
        name: 'Sách Tô Màu Dành Cho Người Lớn',
        parentCategoryId: 1
      },
      {
        name: 'Sách Ảnh',
        parentCategoryId: 1
      },
      {
        name: 'Combo Văn Học',
        parentCategoryId: 1
      },
      {
        name: 'Thể Loại Khác',
        parentCategoryId: 1
      },
      {
        name: 'Truyện Tranh',
        parentCategoryId: 1
      },
      //#endregion

      //#region Kinh tế
      {
        name: 'Nhân Vật - Bài Học Kinh Doanh',
        parentCategoryId: 2
      },
      {
        name: 'Quản Trị - Lãnh Đạo',
        parentCategoryId: 2
      },
      {
        name: 'Marketing - Bán Hàng',
        parentCategoryId: 2
      },
      {
        name: 'Khởi Nghiệp - Làm Giàu',
        parentCategoryId: 2
      },
      {
        name: 'Phân Tích Kinh Tế',
        parentCategoryId: 2
      },
      {
        name: 'Chứng Khoán - Bất Động Sản - Đầu Tư',
        parentCategoryId: 2
      },
      {
        name: 'Tài Chính - Ngân Hàng',
        parentCategoryId: 2
      },
      {
        name: 'Kế Toán - Kiểm Toán - Thuế',
        parentCategoryId: 2
      },
      {
        name: 'Nhân Sự - Việc Làm',
        parentCategoryId: 2
      },
      {
        name: 'Ngoại Thương',
        parentCategoryId: 2
      },
      //#endregion
      
      //#region Tâm lý - Kĩ năng sống
      {
        name: 'Kỹ Năng Sống',
        parentCategoryId: 3,
      },
      {
        name: 'Tâm Lý',
        parentCategoryId: 3,
      },
      {
        name: 'Sách Cho Tuổi Mới Lớn',
        parentCategoryId: 3,
      },
      {
        name: 'Chicken Soup - Hạt Giống Tâm Hồn',
        parentCategoryId: 3,
      },
      {
        name: 'Rèn Luyện Nhân Cách',
        parentCategoryId: 3,
      },
      //#endregion
    
      //#region Nuôi dạy con
      {
        name: 'Cẩm Nang Làm Cha Mẹ',
        parentCategoryId: 4,
      },
      {
        name: 'Phát Triển Kỹ Năng - Trí Tuệ Cho Trẻ',
        parentCategoryId: 4,
      },
      {
        name: 'Phương Pháp Giáo Dục Trẻ Các Nước',
        parentCategoryId: 4,
      },
      {
        name: 'Dinh Dưỡng - Sức Khỏe Cho Trẻ',
        parentCategoryId: 4,
      },
      {
        name: 'Giáo Dục Trẻ Tuổi Teen',
        parentCategoryId: 4,
      },
      {
        name: 'Dành Cho Mẹ Bầu',
        parentCategoryId: 4,
      },
      //#endregion
    
      //#region Sách thiếu nhi
      {
        name: 'Truyện Thiếu Nhi',
        parentCategoryId: 5,
      },
      {
        name: 'Kiến Thức - Kỹ Năng Sống Cho Trẻ',
        parentCategoryId: 5,
      },
      {
        name: 'Kiến Thức Bách Khoa',
        parentCategoryId: 5,
      },
      {
        name: 'Tô Màu, Luyện Chữ',
        parentCategoryId: 5,
      },
      {
        name: 'Từ Điển Thiếu Nhi',
        parentCategoryId: 5,
      },
      {
        name: 'Flashcard - Thẻ Học Thông Minh',
        parentCategoryId: 5,
      },
      {
        name: 'Sách Nói',
        parentCategoryId: 5,
      },
      {
        name: 'Tạp Chí Thiếu Nhi',
        parentCategoryId: 5,
      },
      //#endregion

      //#region Tiểu sử - Hồi ký
      {
        name: 'Câu Chuyện Cuộc Đời',
        parentCategoryId: 6,
      },
      {
        name: 'Lịch Sử',
        parentCategoryId: 6,
      },
      {
        name: 'Nghệ Thuật - Giải Trí',
        parentCategoryId: 6,
      },
      {
        name: 'Chính Trị',
        parentCategoryId: 6,
      },
      {
        name: 'Kinh Tế',
        parentCategoryId: 6,
      },
      {
        name: 'Thể Thao',
        parentCategoryId: 6,
      },
      //#endregion

      //#region Giáo khoa - Tham khảo
      {
        name: 'Sách Tham Khảo',
        parentCategoryId: 7,
      },
      {
        name: 'Sách Giáo Khoa',
        parentCategoryId: 7,
      },
      {
        name: 'Mẫu Giáo',
        parentCategoryId: 7,
      },
      {
        name: 'Sách Giáo Viên',
        parentCategoryId: 7,
      },
      {
        name: 'Đại Học',
        parentCategoryId: 7,
      },
      //#endregion

      //#region Sách học ngoại ngữ
      {
        name: 'Tiếng Anh',
        parentCategoryId: 8,
      },
      {
        name: 'Tiếng Hoa',
        parentCategoryId: 8,
      },
      {
        name: 'Tiếng Nhật',
        parentCategoryId: 8,
      },
      {
        name: 'Tiếng Hàn',
        parentCategoryId: 8,
      },
      {
        name: 'Tiếng Việt Cho Người Nước Ngoài',
        parentCategoryId: 8,
      },
      {
        name: 'Tiếng Pháp',
        parentCategoryId: 8,
      },
      {
        name: 'Ngoại Ngữ Khác',
        parentCategoryId: 8,
      },
      {
        name: 'Tiếng Đức',
        parentCategoryId: 8,
      },
      {
        name: 'Flashcard',
        parentCategoryId: 8,
      },
      //#endregion
    ])
  }
}
