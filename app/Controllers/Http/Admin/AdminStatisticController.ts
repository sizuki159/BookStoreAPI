import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Invoice from 'App/Models/Invoice';
import Order from 'App/Models/Order';
import PageLimitUtils from 'App/Utils/PageLimitUtils';
import { DateTime } from 'luxon';

interface MonthlyData {
    month: number,
    year: number,
    total_revenue: number,
}

interface IRevenueYearData {
    year: number,
    total_revenue: number,
}

interface IRevenueMonthData {
    year: number;
    month: number;
    total_revenue: number;
}

interface IRecentTransaction {
    transaction_date: string,
    user_email: string,
    invoice_status: string,
    final_price: number
}

interface IRecentTransactionResponse {
    transaction_date: string,
    invoice_status: string,
    message: string,
}

export default class AdminStatisticController {

    public async topProductBestSeller({ request, response }: HttpContextContract) {
        const { page, limit } = PageLimitUtils(request.qs())
        // Top 5 sản phẩm bán chạy nhất
        const topProductBestSeller = await Database.from('order_items')
            .select(
                'order_items.isbn_code',
                Database.raw('SUM(order_items.quantity) as total_quantity_sold'),
                Database.raw('SUM(order_items.price_per_unit) as total_revenue'),
                'books.book_name',
                'child_categories.name as ccategory_name'
            )
            .innerJoin('books', 'books.isbn_code', '=', 'order_items.isbn_code')
            .innerJoin('child_categories', 'child_categories.id', '=', 'books.ccategory_id')
            .groupBy('order_items.isbn_code')
            .orderBy('total_quantity_sold', 'desc')
            .paginate(page, limit)

        return response.json(topProductBestSeller)
    }

    public async getRevenueWithYear({ request, response }: HttpContextContract) {

        const { year } = request.qs()

        if (!year || year.length !== 4) {
            return response.badRequest({
                message: 'Năm truyền vào không hợp lệ'
            })
        }

        // Lấy doanh thu theo tháng của năm
        // Chỉ lấy đơn hàng hoàn thành và đã thanh toán
        const revenueByYear = await Database.from('orders')
            .select(
                Database.raw('extract(month from created_at) as month'),
                Database.raw('extract(year from created_at) as year'),
                Database.raw('SUM(final_price) as total_revenue')
            )
            .where('status', Order.STATUS.COMPLETED)
            .andWhere('payment_status', Order.PAYMENT_STATUS.PAID)
            .andWhere(Database.raw('extract(year from created_at)'), year)
            .groupByRaw('extract(month from created_at)')
            .groupByRaw('extract(year from created_at)')

        return response.json(this.fillMissingMonths(revenueByYear, year))
    }

    public async getRevenueCurrentYear({ response }: HttpContextContract) {

        const currentYear = DateTime.now().get('year');
        const previousYear = currentYear - 1;

        // Lấy toàn bộ doanh thu của năm hiện tại và năm ngoái
        // Chỉ lấy đơn hàng hoàn thành và đã thanh toán
        const revenueInTheLast2Year = await Database.from('orders')
            .select(
                Database.raw('extract(year from created_at) as year'),
                Database.raw('SUM(final_price) as total_revenue')
            )
            .where('status', Order.STATUS.COMPLETED)
            .andWhere('payment_status', Order.PAYMENT_STATUS.PAID)
            .andWhere(yearCondition => {
                yearCondition.where(Database.raw('extract(year from created_at)'), currentYear)
                    .orWhere(Database.raw('extract(year from created_at)'), previousYear)
            })
            .groupByRaw('extract(year from created_at)')
            .orderBy('year', 'asc')


        // Nếu mảng là rỗng thì doanh số 2 năm gần nhất là 0
        if (revenueInTheLast2Year.length === 0) {
            return response.json({
                previous_year: previousYear,
                previous_year_revenue: 0,
                current_year: currentYear,
                current_year_revenue: 0,
                total_revenue_for_2_year: 0,
                percentage_change: 0,
                financial_performance: 'stagnant',
            })
        }

        // Nếu mảng là 1 thì kiểm tra xem năm đó là năm nào
        // Rồi trả về dữ liệu chuẩn
        // Năm nào thì doanh thu của năm đó
        // Năm còn lại sẽ là doanh thu 0
        if (revenueInTheLast2Year.length === 1) {
            const year = revenueInTheLast2Year[0].year
            const isCurrentYear = year === currentYear ? true : false
            if (isCurrentYear) {
                revenueInTheLast2Year.unshift({
                    year: isCurrentYear ? previousYear : currentYear,
                    total_revenue: 1 // Mặc định doanh thu 1
                })
            } else {
                revenueInTheLast2Year.push({
                    year: isCurrentYear ? previousYear : currentYear,
                    total_revenue: 0
                })
            }
        }

        // So sánh doanh thu của năm hiện tại và năm trước đó
        const percentageChange = this.calculateRevenuePercentageChange(revenueInTheLast2Year);

        const compareResult = {
            previous_year: previousYear,
            previous_year_revenue: revenueInTheLast2Year[0].total_revenue,
            current_year: currentYear,
            current_year_revenue: revenueInTheLast2Year[1].total_revenue,
            total_revenue_for_2_year: revenueInTheLast2Year[0].total_revenue + revenueInTheLast2Year[1].total_revenue,
            percentage_change: Math.abs(percentageChange).toFixed(2),
            financial_performance: percentageChange > 0 ? 'increase' : (percentageChange < 0 ? 'decrease' : 'stagnant'),
        }

        return response.json(compareResult)
    }

    public async getRevenueCurrentMonth({ response }: HttpContextContract) {
        const currentYear = DateTime.now().get('year');
        const previousYear = currentYear - 1;
        const currentMonth = DateTime.now().get('month');

        // Lấy doanh thu theo tháng hiện tại của năm hiện tại
        // Và tháng hiện tại của năm ngoái
        // Mục đích để so sánh tháng năm nay với tháng năm trước
        // Chỉ lấy đơn hàng hoàn thành và đã thanh toán
        const revenueInThisMonthCurrentYearAndPreviousYear = await Database.from('orders')
            .select(
                Database.raw('extract(year from created_at) as year'),
                Database.raw('extract(month from created_at) as month'),
                Database.raw('SUM(final_price) as total_revenue')
            )
            .where('status', Order.STATUS.COMPLETED)
            .andWhere('payment_status', Order.PAYMENT_STATUS.PAID)
            .andWhere(monthCondition => {
                monthCondition.where(Database.raw('extract(month from created_at)'), currentMonth)
                    .andWhere(Database.raw('extract(year from created_at)'), currentYear)
                    .orWhere(monthCondition => {
                        monthCondition.where(Database.raw('extract(month from created_at)'), currentMonth)
                            .andWhere(Database.raw('extract(year from created_at)'), previousYear)
                    })
            })
            .groupByRaw('extract(year from created_at)')
            .groupByRaw('extract(month from created_at)')
            .orderBy('year', 'asc')


        // Nếu mảng là rỗng thì doanh số 2 tháng của 2 năm là 0
        if (revenueInThisMonthCurrentYearAndPreviousYear.length === 0) {
            return response.json({
                previous_month_year_revenue: 0,
                current_month_year_revenue: 0,
                total_revenue_for_2_month: 0,
                percentage_change: 0,
                financial_performance: 'stagnant',
            })
        }

        // Nếu mảng là 1 thì kiểm tra xem tháng đó của năm nào
        // Rồi trả về dữ liệu chuẩn
        // Tháng của năm nào thì doanh thu theo tháng của năm đó
        // Tháng của năm còn lại sẽ là doanh thu 0
        if (revenueInThisMonthCurrentYearAndPreviousYear.length === 1) {
            const year = revenueInThisMonthCurrentYearAndPreviousYear[0].year
            const isCurrentYear = year === currentYear ? true : false
            if (isCurrentYear) {
                revenueInThisMonthCurrentYearAndPreviousYear.unshift({
                    year: isCurrentYear ? previousYear : currentYear,
                    month: currentMonth,
                    total_revenue: 1 // Mặc định doanh thu 1
                })
            } else {
                revenueInThisMonthCurrentYearAndPreviousYear.push({
                    year: isCurrentYear ? previousYear : currentYear,
                    month: currentMonth,
                    total_revenue: 0
                })
            }
        }

        const percentageChange = this.calculateRevenuePercentageIncrease(revenueInThisMonthCurrentYearAndPreviousYear);

        const compareResult = {
            previous_month_year_revenue: revenueInThisMonthCurrentYearAndPreviousYear[0].total_revenue,
            current_month_year_revenue: revenueInThisMonthCurrentYearAndPreviousYear[1].total_revenue,
            total_revenue_for_2_month: revenueInThisMonthCurrentYearAndPreviousYear[0].total_revenue + revenueInThisMonthCurrentYearAndPreviousYear[1].total_revenue,
            percentage_change: Math.abs(percentageChange).toFixed(2),
            financial_performance: percentageChange > 0 ? 'increase' : (percentageChange < 0 ? 'decrease' : 'stagnant'),
        }

        return response.json(compareResult)
    }

    public async getRecentTransactions({ request, response }: HttpContextContract) {

        const { limit } = PageLimitUtils(request.qs())

        const recentTransactions = await Database.from('invoices')
            .select(
                'invoices.created_at AS transaction_date',
                'users.email AS user_email',
                'invoices.status AS invoice_status',
                'orders.final_price AS final_price',
            )
            .join('orders', 'orders.order_id', '=', 'invoices.order_id')
            .join('users', 'users.id', '=', 'orders.user_id')
            .orderBy('invoices.created_at', 'desc')
            .limit(limit)

        return response.json(this.convertToRecentTransactionResponse(recentTransactions))
    }

    // Sử dụng cho thống kê giao dịch gần nhất
    private convertToRecentTransactionResponse(datas: IRecentTransaction[]): IRecentTransactionResponse[] {
        const result: Array<IRecentTransactionResponse> = []

        for (const data of datas) {
            let message = ''
            if (data.invoice_status === Invoice.STATUS.PAID) {
                message = `Đã nhận thanh toán ${data.final_price.toLocaleString()}đ từ ${data.user_email}`
            } else if (data.invoice_status === Invoice.STATUS.UNPAID) {
                message = `${data.user_email} tạo hóa đơn ${data.final_price.toLocaleString()}đ`
            } else if (data.invoice_status === Invoice.STATUS.CANCEL) {
                message = `${data.user_email} đã hủy hóa đơn ${data.final_price.toLocaleString()}đ`
            }

            result.push({
                message,
                invoice_status: data.invoice_status,
                transaction_date: DateTime.fromJSDate(new Date(data.transaction_date)).toFormat('dd/MM/yyyy hh:mm a'),
            })
        }

        return result
    }

    // Sử dụng cho tháng
    private calculateRevenuePercentageIncrease(data: IRevenueMonthData[]): number {
        if (data.length === 2) {
            const lastYearRevenue = data[0].total_revenue;
            const currentYearRevenue = data[1].total_revenue;

            const percentageIncrease = ((currentYearRevenue - lastYearRevenue) / lastYearRevenue) * 100;

            return percentageIncrease;
        }

        return 0; // Default to 0 if data is not available for either year
    }

    // Sử dụng cho năm
    private calculateRevenuePercentageChange(data: IRevenueYearData[]): number {
        if (data.length !== 2) {
            console.error("Invalid data format. The array must have exactly 2 elements.");
            return 0;
        }

        const currentYearRevenue = data[1].total_revenue; // Đổi thành phần tử của năm hiện tại
        const previousYearRevenue = data[0].total_revenue; // Đổi thành phần tử của năm trước đó

        const revenueChange = currentYearRevenue - previousYearRevenue;
        const percentageChange = (revenueChange / Math.abs(previousYearRevenue)) * 100;

        return percentageChange;
    }


    private fillMissingMonths(data: MonthlyData[], year: number): MonthlyData[] {
        const result: MonthlyData[] = [];

        // Sắp xếp mảng theo tháng
        data.sort((a, b) => a.month - b.month);

        for (let i = 1; i <= 12; i++) {
            const existingData = data.find(item => item.month === i);

            if (existingData) {
                // Nếu có dữ liệu cho tháng i, thêm vào mảng kết quả
                result.push(existingData);
            } else {
                // Nếu không có dữ liệu, thêm tháng với total_revenue = 0
                result.push({
                    month: i,
                    year: data.length > 0 ? data[0].year : year, // Sử dụng năm đầu tiên trong mảng hoặc năm hiện tại
                    total_revenue: 0,
                });
            }
        }

        return result;
    }
}
