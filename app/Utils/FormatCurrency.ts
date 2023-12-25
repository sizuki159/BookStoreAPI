export function formatCurrency(amount: number): string {
    // Sử dụng hàm toLocaleString để định dạng số thành chuỗi tiền tệ
    const formattedAmount = amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    return formattedAmount;
}