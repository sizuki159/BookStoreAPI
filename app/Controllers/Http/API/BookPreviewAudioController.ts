import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Book from 'App/Models/Book'

export default class BookPreviewAudioController {
    // Hàm tạo link audio mô tả sách
    public async getAudioDesc({ params, view }: HttpContextContract) {
        const slug = params.slug

        const book = await Book.query()
            .where('slug', slug)
            .preload('images', (imgQuery) => {
                imgQuery.groupLimit(1)
            })
            .first()

        if (!book) {

            return view.render('book_preview_audio', {
                bookName: 'Sách không tồn tại trên hệ thống',
                bookImg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png',
                descArr: ['Hệ thống không tìm thấy sách này theo yêu cầu của bạn'],
                bookDesc: 'Hệ thống không tìm thấy sách này theo yêu cầu của bạn'
            })
        }

        const desc = book.desc
        const descArr = this.catChuoi(desc)
        const bookImg = book.images.length > 0 ? book.images[0].imageSource : 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png'

        return view.render('book_preview_audio', {
            bookName: book.name,
            bookDesc: book.desc,
            bookImg,
            descArr
        })
    }

    private catChuoi(input: string): string[] {
        const doDaiToiDa = 180;
        const mangKetQua: string[] = [];

        for (let i = 0; i < input.length; i += doDaiToiDa) {
            let phanChuoi = input.substring(i, i + doDaiToiDa);

            // Kiểm tra xem có từ nằm ở cuối phần chuỗi hay không
            if (i + doDaiToiDa < input.length) {
                const indexSpace = phanChuoi.lastIndexOf(' ');

                if (indexSpace !== -1) {
                    // Nếu có từ, cắt tới từ đó
                    phanChuoi = phanChuoi.substring(0, indexSpace);
                    i += indexSpace; // Cập nhật vị trí bắt đầu cho lần lặp tiếp theo
                }
            }

            mangKetQua.push(phanChuoi);
        }

        return mangKetQua;
    }
}
