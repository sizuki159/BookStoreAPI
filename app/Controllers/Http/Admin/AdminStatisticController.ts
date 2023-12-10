import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'

export default class AdminStatisticController {
    public async getStatistic({ }: HttpContextContract) {
        // Top 5 sản phẩm bán chạy nhất
        const top5Product = await Database.from('order_items')
            .select('isbn_code', Database.raw('SUM(quantity) as total_quantity'))
            .groupBy('isbn_code')
            .orderBy('total_quantity', 'desc')
            .limit(5);
        return top5Product
    }
}
