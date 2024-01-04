import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Book from 'App/Models/Book'

export default class BookPreviewAudioController {
    // Hàm tạo link audio mô tả sách
    public async getAudioDesc({ params, response }: HttpContextContract) {
        const isbn_code = params.isbn_code

        const book = await Book.query()
            .where('isbn_code', isbn_code)
            .first()

        if (!book) {
            return response.status(404).json({
                message: 'Không tìm thấy sách này'
            })
        }

        const desc = book.desc

        const descArr = this.catChuoi(desc)

        return response.json(
            descArr.map(desc => {
                return `https://translate.googleapis.com/translate_tts?client=gtx&ie=UTF-8&tl=vi&q=${encodeURIComponent(desc.trim())}`
            })
        )
    }

    private catChuoi(input: string): string[] {
        const doDaiToiDa = 200;
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
