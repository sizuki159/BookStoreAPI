export function isIsbnCodeValid(search: string): boolean {
    // Kiểm tra xem chuỗi có 13 kí tự hoặc 10 kí tự và chỉ chứa chữ số không
    const regex = /^(?:\d{10}|\d{13})$/;
    return regex.test(search);
}