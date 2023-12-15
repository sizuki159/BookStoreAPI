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


        // Lấy doanh thu theo tháng của năm
        const revenueByMonth = await Database.from('orders')
            .select(Database.raw('SUM(final_price) as total_revenue'))
            .groupByRaw('extract(month from created_at)')
        return revenueByMonth
    }
}
