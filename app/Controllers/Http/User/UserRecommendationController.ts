import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database';
import Book from 'App/Models/Book';
import { DateTime } from 'luxon';

export default class UserRecommendationController {
    // Thống kê lịch sử hoạt động
    // Để khuyến nghị thể loại sách
    // Hoặc sách theo khung giờ truy cập

    public async index({ auth, response }: HttpContextContract) {

        const SHOW_MAX = 8

        const userAuth = await auth.use('api').authenticate()

        // Lấy thời gian hiện tại
        const now = DateTime.now()

        const bookRecommendIsbnCodeArray: string[] = []
        // Thống kê sách mà người dùng hay ghé thăm
        // Theo từng buổi thực tế
        const bookVisited = await Database.from('user_activities')
            .select('isbn_code_visited')
            .count('id as count')
            .where('user_id', userAuth.id)
            .whereRaw(this.determineTimeOfDay(now))
            .groupBy('isbn_code_visited')
            .orderBy('count', 'desc')

        for (const item of bookVisited) {
            if (item.isbn_code_visited === null) continue
            if (bookRecommendIsbnCodeArray.includes(item.isbn_code_visited)) continue

            // if(item.isbn_code_visited.includes('qt') || item.isbn_code_visited.includes('combo')) continue
            bookRecommendIsbnCodeArray.push(item.isbn_code_visited)
        }

        // Nếu danh sách này không đủ SHOW_MAX cuốn
        // Thì lấy danh sách thể loại mà người dùng hay ghé thăm
        if (bookVisited.length < SHOW_MAX) {
            // Thống kê thể loại con mà người dùng hay ghé thăm
            // Theo từng buổi thực tế
            const ccategoiesVisited = await Database.from('user_activities')
                .select('child_category_id_visited')
                .count('id as count')
                .where('user_id', userAuth.id)
                .whereRaw(this.determineTimeOfDay(now))
                .groupBy('child_category_id_visited')
                .orderBy('count', 'desc')

            if (ccategoiesVisited.length > 0) {
                // Lấy hết sách của thể loại này ra
                // Thêm vào danh sách khuyến nghị
                // Cho đến khi đủ SHOW_MAX cuốn trở lên
                for (const ccategoryVisited of ccategoiesVisited) {
                    if (ccategoryVisited.child_category_id_visited === null) continue
                    const books = await Database.from('books')
                        .select('isbn_code')
                        .where('ccategory_id', ccategoryVisited.child_category_id_visited)
                        .limit(SHOW_MAX - bookVisited.length)
                    for (const book of books) {
                        if (bookRecommendIsbnCodeArray.includes(book.isbn_code)) continue
                        // if(book.isbn_code.includes('qt') || book.isbn_code.includes('combo')) continue
                        bookRecommendIsbnCodeArray.push(book.isbn_code)
                    }
                    if (bookRecommendIsbnCodeArray.length >= 8) break
                }
            }
        }

        if(bookRecommendIsbnCodeArray.length === 0) {
            return response.json([])
        }

        const bookRecommend = await Book.query()
            .whereIn('isbn_code', bookRecommendIsbnCodeArray)
            .preload('ccategory')
            .preload('author')
            .preload('bookForm')
            .preload('images', images => images.groupLimit(1))
            .preload('language')
            .preload('publisher')
            .preload('provider')
            //.orderByRaw(`field(isbn_code, ${bookRecommendIsbnCodeArray.join(',')})`)
            .orderByRaw(`
                CASE 
                    ${bookRecommendIsbnCodeArray.map((isbn, index) => `WHEN isbn_code = '${isbn}' THEN ${index + 1}`).join(' ')}
                    ELSE ${bookRecommendIsbnCodeArray.length + 1}
                END
            `)
        return response.json(bookRecommend)
    }

    private determineTimeOfDay(dateTime: DateTime): string {
        const morningStart = DateTime.fromObject({ hour: 5, minute: 0, second: 0 });
        const morningEnd = DateTime.fromObject({ hour: 10, minute: 59, second: 59 });
        const noonStart = DateTime.fromObject({ hour: 11, minute: 0, second: 0 });
        const noonEnd = DateTime.fromObject({ hour: 12, minute: 59, second: 59 });
        const afternoonStart = DateTime.fromObject({ hour: 13, minute: 0, second: 0 });
        const afternoonEnd = DateTime.fromObject({ hour: 18, minute: 59, second: 59 });

        if (dateTime >= morningStart && dateTime <= morningEnd) {
            return 'extract(hour from created_at) >= 5 and extract(hour from created_at) < 11';
        } else if (dateTime >= noonStart && dateTime <= noonEnd) {
            return 'extract(hour from created_at) >= 11 and extract(hour from created_at) < 13';
        } else if (dateTime >= afternoonStart && dateTime <= afternoonEnd) {
            return 'extract(hour from created_at) >= 13 and extract(hour from created_at) < 19';
        } else {
            return '(extract(hour from created_at) >= 19 and extract(hour from created_at) < 24) or ((extract(hour from created_at) >= 0 and extract(hour from created_at) < 5))';
        }
    }
}
