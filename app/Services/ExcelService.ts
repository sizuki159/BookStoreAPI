import { Workbook } from 'exceljs'

export async function exportRevenueFromTo(dataArr: { [key: string]: any }[]) {
    let workbook = new Workbook()
    let worksheet = workbook.addWorksheet('Revenue')
    worksheet.columns = [
        {
            header: 'Mã đơn hàng',
            key: 'order_id',
        },
        {
            header: 'Giá sản phẩm',
            key: 'product_price',
        },
        {
            header: 'Phí vận chuyển',
            key: 'fee_price',
        },
        {
            header: 'Giảm giá',
            key: 'discount_price',
        },
        {
            header: 'Thành tiền',
            key: 'final_price',
        },
        {
            header: 'Phương thức thanh toán',
            key: 'payment_method',
        },
        {
            header: 'Email khách hàng',
            key: 'user_email',
        },
        {
            header: 'Ngày tạo đơn',
            key: 'created_at',
        },
    ]

    for(const data of dataArr) {
        worksheet.addRow({
            order_id: data.order_id,
            product_price: data.product_price,
            fee_price: data.fee_price,
            discount_price: data.discount_price,
            final_price: data.final_price,
            payment_method: data.payment_method,
            user_email: data.user_email,
            created_at: data.created_at,
        })
    }
}
