import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import AddressDistrict from 'App/Models/AddressDistrict'

export default class extends BaseSeeder {
    public async run() {
        // Write your database queries inside the run method

        await AddressDistrict.createMany(
            [
                {
                    "districtId": 2264,
                    "provinceId": 269,
                    "name": "Huyện Xi Ma Cai (test)"
                },
                {
                    "districtId": 2171,
                    "provinceId": 269,
                    "name": "Huyện Mường Khương"
                },
                {
                    "districtId": 2073,
                    "provinceId": 269,
                    "name": "Huyện Bảo Thắng"
                },
                {
                    "districtId": 2043,
                    "provinceId": 269,
                    "name": "Huyện Văn Bàn"
                },
                {
                    "districtId": 2005,
                    "provinceId": 269,
                    "name": "Thị xã Sa Pa"
                },
                {
                    "districtId": 1892,
                    "provinceId": 269,
                    "name": "Huyện Bắc Hà"
                },
                {
                    "districtId": 1891,
                    "provinceId": 269,
                    "name": "Huyện Bảo Yên"
                },
                {
                    "districtId": 1744,
                    "provinceId": 269,
                    "name": "Huyện Bát Xát"
                },
                {
                    "districtId": 1682,
                    "provinceId": 269,
                    "name": "Thành phố Lào Cai"
                },
                {
                    "districtId": 3451,
                    "provinceId": 268,
                    "name": "Quận Đặc Biệt"
                },
                {
                    "districtId": 2194,
                    "provinceId": 268,
                    "name": "Huyện Phù Cừ"
                },
                {
                    "districtId": 2046,
                    "provinceId": 268,
                    "name": "Huyện Văn Lâm"
                },
                {
                    "districtId": 2045,
                    "provinceId": 268,
                    "name": "Huyện Văn Giang"
                },
                {
                    "districtId": 2018,
                    "provinceId": 268,
                    "name": "Huyện Tiên Lữ"
                },
                {
                    "districtId": 1828,
                    "provinceId": 268,
                    "name": "Huyện Yên Mỹ"
                },
                {
                    "districtId": 1827,
                    "provinceId": 268,
                    "name": "Thị xã Mỹ Hào"
                },
                {
                    "districtId": 1826,
                    "provinceId": 268,
                    "name": "Huyện Khoái Châu"
                },
                {
                    "districtId": 1825,
                    "provinceId": 268,
                    "name": "Huyện Ân Thi"
                },
                {
                    "districtId": 1717,
                    "provinceId": 268,
                    "name": "Huyện Kim Động"
                },
                {
                    "districtId": 1680,
                    "provinceId": 268,
                    "name": "Thành phố Hưng Yên"
                },
                {
                    "districtId": 2270,
                    "provinceId": 267,
                    "name": "Huyện Yên Thủy"
                },
                {
                    "districtId": 2163,
                    "provinceId": 267,
                    "name": "Huyện Mai Châu"
                },
                {
                    "districtId": 2157,
                    "provinceId": 267,
                    "name": "Huyện Lạc Thủy"
                },
                {
                    "districtId": 2156,
                    "provinceId": 267,
                    "name": "Huyện Lạc Sơn"
                },
                {
                    "districtId": 2146,
                    "provinceId": 267,
                    "name": "Huyện Kim Bôi"
                },
                {
                    "districtId": 2087,
                    "provinceId": 267,
                    "name": "Huyện Cao Phong"
                },
                {
                    "districtId": 2014,
                    "provinceId": 267,
                    "name": "Huyện Tân Lạc"
                },
                {
                    "districtId": 1968,
                    "provinceId": 267,
                    "name": "Huyện Lương Sơn"
                },
                {
                    "districtId": 1955,
                    "provinceId": 267,
                    "name": "Huyện Kỳ Sơn"
                },
                {
                    "districtId": 1916,
                    "provinceId": 267,
                    "name": "Huyện Đà Bắc"
                },
                {
                    "districtId": 1678,
                    "provinceId": 267,
                    "name": "Thành phố Hòa Bình"
                },
                {
                    "districtId": 3266,
                    "provinceId": 266,
                    "name": "huyện Sốp Cộp"
                },
                {
                    "districtId": 3230,
                    "provinceId": 266,
                    "name": "Huyện Mường La"
                },
                {
                    "districtId": 2267,
                    "provinceId": 266,
                    "name": "Huyện Yên Châu"
                },
                {
                    "districtId": 2255,
                    "provinceId": 266,
                    "name": "Huyện Vân Hồ"
                },
                {
                    "districtId": 2204,
                    "provinceId": 266,
                    "name": "Huyện Quỳnh Nhai"
                },
                {
                    "districtId": 2079,
                    "provinceId": 266,
                    "name": "Huyện Bắc Yên"
                },
                {
                    "districtId": 2032,
                    "provinceId": 266,
                    "name": "Huyện Thuận Châu"
                },
                {
                    "districtId": 2007,
                    "provinceId": 266,
                    "name": "Huyện Sông Mã"
                },
                {
                    "districtId": 1996,
                    "provinceId": 266,
                    "name": "Huyện Phù Yên"
                },
                {
                    "districtId": 1976,
                    "provinceId": 266,
                    "name": "Huyện Mộc Châu"
                },
                {
                    "districtId": 1971,
                    "provinceId": 266,
                    "name": "Huyện Mai Sơn"
                },
                {
                    "districtId": 1677,
                    "provinceId": 266,
                    "name": "Thành phố Sơn La"
                },
                {
                    "districtId": 2179,
                    "provinceId": 265,
                    "name": "Huyện Nậm Pồ"
                },
                {
                    "districtId": 2170,
                    "provinceId": 265,
                    "name": "Huyện Mường Ảng"
                },
                {
                    "districtId": 2123,
                    "provinceId": 265,
                    "name": "Huyện Điện Biên Đông"
                },
                {
                    "districtId": 2060,
                    "provinceId": 265,
                    "name": "Thị xã Mường Lay"
                },
                {
                    "districtId": 2022,
                    "provinceId": 265,
                    "name": "Huyện Tuần Giáo"
                },
                {
                    "districtId": 2021,
                    "provinceId": 265,
                    "name": "Huyện Tủa Chùa"
                },
                {
                    "districtId": 1979,
                    "provinceId": 265,
                    "name": "Huyện Mường Nhé"
                },
                {
                    "districtId": 1978,
                    "provinceId": 265,
                    "name": "Huyện Mường Chà"
                },
                {
                    "districtId": 1923,
                    "provinceId": 265,
                    "name": "Huyện Điện Biên"
                },
                {
                    "districtId": 1676,
                    "provinceId": 265,
                    "name": "Thành phố Điện Biên Phủ"
                },
                {
                    "districtId": 2025,
                    "provinceId": 264,
                    "name": "Huyện Than Uyên"
                },
                {
                    "districtId": 2017,
                    "provinceId": 264,
                    "name": "Huyện Tân Uyên"
                },
                {
                    "districtId": 2010,
                    "provinceId": 264,
                    "name": "Huyện Tam Đường"
                },
                {
                    "districtId": 2006,
                    "provinceId": 264,
                    "name": "Huyện Sìn Hồ"
                },
                {
                    "districtId": 1989,
                    "provinceId": 264,
                    "name": "Huyện Phong Thổ"
                },
                {
                    "districtId": 1984,
                    "provinceId": 264,
                    "name": "Huyện Nậm Nhùn"
                },
                {
                    "districtId": 1980,
                    "provinceId": 264,
                    "name": "Huyện Mường Tè"
                },
                {
                    "districtId": 1675,
                    "provinceId": 264,
                    "name": "Thành phố Lai Châu"
                },
                {
                    "districtId": 2266,
                    "provinceId": 263,
                    "name": "Huyện Yên Bình"
                },
                {
                    "districtId": 2248,
                    "provinceId": 263,
                    "name": "Huyện Trạm Tấu"
                },
                {
                    "districtId": 2063,
                    "provinceId": 263,
                    "name": "Thị xã Nghĩa Lộ"
                },
                {
                    "districtId": 2047,
                    "provinceId": 263,
                    "name": "Huyện Văn Yên"
                },
                {
                    "districtId": 2044,
                    "provinceId": 263,
                    "name": "Huyện Văn Chấn"
                },
                {
                    "districtId": 2039,
                    "provinceId": 263,
                    "name": "Huyện Trấn Yên"
                },
                {
                    "districtId": 1977,
                    "provinceId": 263,
                    "name": "Huyện Mù Cang Chải"
                },
                {
                    "districtId": 1967,
                    "provinceId": 263,
                    "name": "Huyện Lục Yên"
                },
                {
                    "districtId": 1674,
                    "provinceId": 263,
                    "name": "Thành phố Yên Bái"
                },
                {
                    "districtId": 3312,
                    "provinceId": 262,
                    "name": "Huyện Vân Canh"
                },
                {
                    "districtId": 3279,
                    "provinceId": 262,
                    "name": "Huyện Tây Sơn"
                },
                {
                    "districtId": 3254,
                    "provinceId": 262,
                    "name": "Huyện Phù Mỹ"
                },
                {
                    "districtId": 2258,
                    "provinceId": 262,
                    "name": "Huyện Vĩnh Thạnh"
                },
                {
                    "districtId": 2140,
                    "provinceId": 262,
                    "name": "Huyện Hoài Ân"
                },
                {
                    "districtId": 2023,
                    "provinceId": 262,
                    "name": "Huyện Tuy Phước"
                },
                {
                    "districtId": 1886,
                    "provinceId": 262,
                    "name": "Huyện An Lão"
                },
                {
                    "districtId": 1771,
                    "provinceId": 262,
                    "name": "Thị xã Hoài Nhơn"
                },
                {
                    "districtId": 1770,
                    "provinceId": 262,
                    "name": "Huyện Phù Cát"
                },
                {
                    "districtId": 1769,
                    "provinceId": 262,
                    "name": "Thị xã An Nhơn"
                },
                {
                    "districtId": 1662,
                    "provinceId": 262,
                    "name": "Thành phố Quy Nhơn"
                },
                {
                    "districtId": 3302,
                    "provinceId": 261,
                    "name": "Huyện Thuận Nam"
                },
                {
                    "districtId": 3301,
                    "provinceId": 261,
                    "name": "Huyện Thuận Bắc"
                },
                {
                    "districtId": 3129,
                    "provinceId": 261,
                    "name": "Huyện Bác Ái"
                },
                {
                    "districtId": 1986,
                    "provinceId": 261,
                    "name": "Huyện Ninh Phước"
                },
                {
                    "districtId": 1985,
                    "provinceId": 261,
                    "name": "Huyện Ninh Hải"
                },
                {
                    "districtId": 1855,
                    "provinceId": 261,
                    "name": "Huyện Ninh Sơn"
                },
                {
                    "districtId": 1665,
                    "provinceId": 261,
                    "name": "Thành phố Phan Rang – Tháp Chàm"
                },
                {
                    "districtId": 3284,
                    "provinceId": 260,
                    "name": "Huyện Tuy An"
                },
                {
                    "districtId": 3278,
                    "provinceId": 260,
                    "name": "Huyện Tây Hòa"
                },
                {
                    "districtId": 3186,
                    "provinceId": 260,
                    "name": "Huyện Đồng Xuân"
                },
                {
                    "districtId": 3184,
                    "provinceId": 260,
                    "name": "Thị xã Đông Hòa"
                },
                {
                    "districtId": 2211,
                    "provinceId": 260,
                    "name": "Huyện Sơn Hòa"
                },
                {
                    "districtId": 2206,
                    "provinceId": 260,
                    "name": "Huyện Sông Hinh"
                },
                {
                    "districtId": 1993,
                    "provinceId": 260,
                    "name": "Huyện Phú Hòa"
                },
                {
                    "districtId": 1856,
                    "provinceId": 260,
                    "name": "Thị Xã Sông Cầu"
                },
                {
                    "districtId": 1663,
                    "provinceId": 260,
                    "name": "Thành phố Tuy Hòa"
                },
                {
                    "districtId": 3446,
                    "provinceId": 259,
                    "name": "Huyện Ia H Drai"
                },
                {
                    "districtId": 2225,
                    "provinceId": 259,
                    "name": "Huyện Tu Mơ Rông"
                },
                {
                    "districtId": 2205,
                    "provinceId": 259,
                    "name": "Huyện Sa Thầy"
                },
                {
                    "districtId": 2187,
                    "provinceId": 259,
                    "name": "Huyện Ngọc Hồi"
                },
                {
                    "districtId": 2148,
                    "provinceId": 259,
                    "name": "Huyện Kon Rẫy"
                },
                {
                    "districtId": 2121,
                    "provinceId": 259,
                    "name": "Huyện Đắk Tô"
                },
                {
                    "districtId": 1921,
                    "provinceId": 259,
                    "name": "Huyện Đắk Glei"
                },
                {
                    "districtId": 1835,
                    "provinceId": 259,
                    "name": "Huyện Đắk Hà"
                },
                {
                    "districtId": 1834,
                    "provinceId": 259,
                    "name": "Huyện Kon Plông"
                },
                {
                    "districtId": 1660,
                    "provinceId": 259,
                    "name": "Thành phố Kon Tum"
                },
                {
                    "districtId": 3196,
                    "provinceId": 258,
                    "name": "Huyện Hàm Tân"
                },
                {
                    "districtId": 2116,
                    "provinceId": 258,
                    "name": "Huyện đảo Phú Quý"
                },
                {
                    "districtId": 2012,
                    "provinceId": 258,
                    "name": "Huyện Tánh Linh"
                },
                {
                    "districtId": 1781,
                    "provinceId": 258,
                    "name": "Huyện Tuy Phong"
                },
                {
                    "districtId": 1780,
                    "provinceId": 258,
                    "name": "Huyện Bắc Bình"
                },
                {
                    "districtId": 1779,
                    "provinceId": 258,
                    "name": "Huyện Đức Linh"
                },
                {
                    "districtId": 1778,
                    "provinceId": 258,
                    "name": "Thị xã La Gi"
                },
                {
                    "districtId": 1777,
                    "provinceId": 258,
                    "name": "Huyện Hàm Thuận Bắc"
                },
                {
                    "districtId": 1776,
                    "provinceId": 258,
                    "name": "Huyện Hàm Thuận Nam"
                },
                {
                    "districtId": 1666,
                    "provinceId": 258,
                    "name": "Thành phố Phan Thiết"
                },
                {
                    "districtId": 2050,
                    "provinceId": 253,
                    "name": "Huyện Vĩnh Lợi"
                },
                {
                    "districtId": 1998,
                    "provinceId": 253,
                    "name": "Huyện Phước Long"
                },
                {
                    "districtId": 1946,
                    "provinceId": 253,
                    "name": "Huyện Hồng Dân"
                },
                {
                    "districtId": 1935,
                    "provinceId": 253,
                    "name": "Thị Xã Giá Rai"
                },
                {
                    "districtId": 1926,
                    "provinceId": 253,
                    "name": "Huyện Đông Hải"
                },
                {
                    "districtId": 1723,
                    "provinceId": 253,
                    "name": "Huyện Hòa Bình"
                },
                {
                    "districtId": 1655,
                    "provinceId": 253,
                    "name": "Thành phố Bạc Liêu"
                },
                {
                    "districtId": 2186,
                    "provinceId": 252,
                    "name": "Huyện Ngọc Hiển"
                },
                {
                    "districtId": 2042,
                    "provinceId": 252,
                    "name": "Huyện U Minh"
                },
                {
                    "districtId": 2038,
                    "provinceId": 252,
                    "name": "Huyện Trần Văn Thời"
                },
                {
                    "districtId": 1922,
                    "provinceId": 252,
                    "name": "Huyện Đầm Dơi"
                },
                {
                    "districtId": 1901,
                    "provinceId": 252,
                    "name": "Huyện Cái Nước"
                },
                {
                    "districtId": 1883,
                    "provinceId": 252,
                    "name": "Huyện Phú Tân"
                },
                {
                    "districtId": 1783,
                    "provinceId": 252,
                    "name": "Huyện Năm Căn"
                },
                {
                    "districtId": 1782,
                    "provinceId": 252,
                    "name": "Huyện Thới Bình"
                },
                {
                    "districtId": 1654,
                    "provinceId": 252,
                    "name": "Thành phố Cà Mau"
                },
                {
                    "districtId": 3445,
                    "provinceId": 250,
                    "name": "Huyện Long Mỹ"
                },
                {
                    "districtId": 3218,
                    "provinceId": 250,
                    "name": "Thị xã Long Mỹ"
                },
                {
                    "districtId": 2096,
                    "provinceId": 250,
                    "name": "Huyện Châu Thành"
                },
                {
                    "districtId": 2048,
                    "provinceId": 250,
                    "name": "Huyện Vị Thuỷ"
                },
                {
                    "districtId": 1912,
                    "provinceId": 250,
                    "name": "Huyện Châu Thành A"
                },
                {
                    "districtId": 1824,
                    "provinceId": 250,
                    "name": "Huyện Phụng Hiệp"
                },
                {
                    "districtId": 1823,
                    "provinceId": 250,
                    "name": "Thành phố Ngã Bảy"
                },
                {
                    "districtId": 1653,
                    "provinceId": 250,
                    "name": "Thành phố Vị Thanh"
                },
                {
                    "districtId": 1969,
                    "provinceId": 249,
                    "name": "Huyện Lương Tài"
                },
                {
                    "districtId": 1768,
                    "provinceId": 249,
                    "name": "Huyện Yên Phong"
                },
                {
                    "districtId": 1767,
                    "provinceId": 249,
                    "name": "Huyện Thuận Thành"
                },
                {
                    "districtId": 1766,
                    "provinceId": 249,
                    "name": "Huyện Gia Bình"
                },
                {
                    "districtId": 1730,
                    "provinceId": 249,
                    "name": "Thị xã Từ Sơn"
                },
                {
                    "districtId": 1729,
                    "provinceId": 249,
                    "name": "Huyện Tiên Du"
                },
                {
                    "districtId": 1728,
                    "provinceId": 249,
                    "name": "Huyện Quế Võ"
                },
                {
                    "districtId": 1644,
                    "provinceId": 249,
                    "name": "Thành phố Bắc Ninh"
                },
                {
                    "districtId": 1966,
                    "provinceId": 248,
                    "name": "Huyện Lục Ngạn"
                },
                {
                    "districtId": 1965,
                    "provinceId": 248,
                    "name": "Huyện Lục Nam"
                },
                {
                    "districtId": 1765,
                    "provinceId": 248,
                    "name": "Huyện Yên Thế"
                },
                {
                    "districtId": 1764,
                    "provinceId": 248,
                    "name": "Huyện Yên Dũng"
                },
                {
                    "districtId": 1763,
                    "provinceId": 248,
                    "name": "Huyện Việt Yên"
                },
                {
                    "districtId": 1762,
                    "provinceId": 248,
                    "name": "Huyện Tân Yên"
                },
                {
                    "districtId": 1761,
                    "provinceId": 248,
                    "name": "Huyện Sơn Động"
                },
                {
                    "districtId": 1760,
                    "provinceId": 248,
                    "name": "Huyện Lạng Giang"
                },
                {
                    "districtId": 1759,
                    "provinceId": 248,
                    "name": "Huyện Hiệp Hòa"
                },
                {
                    "districtId": 1643,
                    "provinceId": 248,
                    "name": "Thành phố Bắc Giang"
                },
                {
                    "districtId": 3311,
                    "provinceId": 247,
                    "name": "Huyện Văn Quan"
                },
                {
                    "districtId": 3310,
                    "provinceId": 247,
                    "name": "Huyện Văn Lãng"
                },
                {
                    "districtId": 3182,
                    "provinceId": 247,
                    "name": "Huyện Đình Lập"
                },
                {
                    "districtId": 3156,
                    "provinceId": 247,
                    "name": "Huyện Chi Lăng"
                },
                {
                    "districtId": 3138,
                    "provinceId": 247,
                    "name": "Huyện Bình Gia"
                },
                {
                    "districtId": 3134,
                    "provinceId": 247,
                    "name": "Huyện Bắc Sơn"
                },
                {
                    "districtId": 2036,
                    "provinceId": 247,
                    "name": "Huyện Tràng Định"
                },
                {
                    "districtId": 1963,
                    "provinceId": 247,
                    "name": "Huyện Lộc Bình"
                },
                {
                    "districtId": 1948,
                    "provinceId": 247,
                    "name": "Huyện Hữu Lũng"
                },
                {
                    "districtId": 1904,
                    "provinceId": 247,
                    "name": "Huyện Cao Lộc"
                },
                {
                    "districtId": 1642,
                    "provinceId": 247,
                    "name": "Thành phố Lạng Sơn"
                },
                {
                    "districtId": 3694,
                    "provinceId": 246,
                    "name": "Huyện Quảng Hòa"
                },
                {
                    "districtId": 3305,
                    "provinceId": 246,
                    "name": "Huyện Trà Lĩnh"
                },
                {
                    "districtId": 3299,
                    "provinceId": 246,
                    "name": "Huyện Thông Nông"
                },
                {
                    "districtId": 3289,
                    "provinceId": 246,
                    "name": "Huyện Thạch An"
                },
                {
                    "districtId": 3259,
                    "provinceId": 246,
                    "name": "Huyện Quảng Uyên"
                },
                {
                    "districtId": 3246,
                    "provinceId": 246,
                    "name": "Huyện Nguyên Bình"
                },
                {
                    "districtId": 3194,
                    "provinceId": 246,
                    "name": "Huyện Hạ Lang"
                },
                {
                    "districtId": 3130,
                    "provinceId": 246,
                    "name": "Huyện Bảo Lạc"
                },
                {
                    "districtId": 2041,
                    "provinceId": 246,
                    "name": "Huyện Trùng Khánh"
                },
                {
                    "districtId": 1997,
                    "provinceId": 246,
                    "name": "Huyện Phục Hòa"
                },
                {
                    "districtId": 1943,
                    "provinceId": 246,
                    "name": "Huyện Hòa An"
                },
                {
                    "districtId": 1939,
                    "provinceId": 246,
                    "name": "Huyện Hà Quảng"
                },
                {
                    "districtId": 1890,
                    "provinceId": 246,
                    "name": "Huyện Bảo Lâm"
                },
                {
                    "districtId": 1641,
                    "provinceId": 246,
                    "name": "Thành phố Cao Bằng"
                },
                {
                    "districtId": 3249,
                    "provinceId": 245,
                    "name": "Huyện Pác Nặm"
                },
                {
                    "districtId": 3242,
                    "provinceId": 245,
                    "name": "Huyện Ngân Sơn"
                },
                {
                    "districtId": 3232,
                    "provinceId": 245,
                    "name": "Huyện Na Rì"
                },
                {
                    "districtId": 1914,
                    "provinceId": 245,
                    "name": "Huyện Chợ Mới"
                },
                {
                    "districtId": 1913,
                    "provinceId": 245,
                    "name": "Huyện Chợ Đồn"
                },
                {
                    "districtId": 1889,
                    "provinceId": 245,
                    "name": "Huyện Bạch Thông"
                },
                {
                    "districtId": 1887,
                    "provinceId": 245,
                    "name": "Huyện Ba Bể"
                },
                {
                    "districtId": 1640,
                    "provinceId": 245,
                    "name": "Thành phố Bắc Kạn"
                },
                {
                    "districtId": 2195,
                    "provinceId": 244,
                    "name": "Huyện Phú Lương"
                },
                {
                    "districtId": 2051,
                    "provinceId": 244,
                    "name": "Huyện Võ Nhai"
                },
                {
                    "districtId": 1991,
                    "provinceId": 244,
                    "name": "Huyện Phú Bình"
                },
                {
                    "districtId": 1990,
                    "provinceId": 244,
                    "name": "Thị xã Phổ Yên"
                },
                {
                    "districtId": 1924,
                    "provinceId": 244,
                    "name": "Huyện Định Hóa"
                },
                {
                    "districtId": 1918,
                    "provinceId": 244,
                    "name": "Huyện Đại Từ"
                },
                {
                    "districtId": 1731,
                    "provinceId": 244,
                    "name": "Huyện Đồng Hỷ"
                },
                {
                    "districtId": 1684,
                    "provinceId": 244,
                    "name": "Thành Phố Sông Công"
                },
                {
                    "districtId": 1639,
                    "provinceId": 244,
                    "name": "Thành phố Thái Nguyên"
                },
                {
                    "districtId": 2239,
                    "provinceId": 243,
                    "name": "Huyện Thăng Bình"
                },
                {
                    "districtId": 2224,
                    "provinceId": 243,
                    "name": "Huyện Tiên Phước"
                },
                {
                    "districtId": 2219,
                    "provinceId": 243,
                    "name": "Huyện Tây Giang"
                },
                {
                    "districtId": 2198,
                    "provinceId": 243,
                    "name": "Huyện Phước Sơn"
                },
                {
                    "districtId": 2182,
                    "provinceId": 243,
                    "name": "Huyện Nông Sơn"
                },
                {
                    "districtId": 2178,
                    "provinceId": 243,
                    "name": "Huyện Nam Trà My"
                },
                {
                    "districtId": 2177,
                    "provinceId": 243,
                    "name": "Huyện Nam Giang"
                },
                {
                    "districtId": 2139,
                    "provinceId": 243,
                    "name": "Huyện Hiệp Đức"
                },
                {
                    "districtId": 2125,
                    "provinceId": 243,
                    "name": "Huyện Đông Giang"
                },
                {
                    "districtId": 2078,
                    "provinceId": 243,
                    "name": "Huyện Bắc Trà My"
                },
                {
                    "districtId": 2003,
                    "provinceId": 243,
                    "name": "Huyện Quế Sơn"
                },
                {
                    "districtId": 1995,
                    "provinceId": 243,
                    "name": "Huyện Phú Ninh"
                },
                {
                    "districtId": 1987,
                    "provinceId": 243,
                    "name": "Huyện Núi Thành"
                },
                {
                    "districtId": 1917,
                    "provinceId": 243,
                    "name": "Huyện Đại Lộc"
                },
                {
                    "districtId": 1736,
                    "provinceId": 243,
                    "name": "Thị xã Điện Bàn"
                },
                {
                    "districtId": 1735,
                    "provinceId": 243,
                    "name": "Huyện Duy Xuyên"
                },
                {
                    "districtId": 1632,
                    "provinceId": 243,
                    "name": "Thành phố Hội An"
                },
                {
                    "districtId": 1631,
                    "provinceId": 243,
                    "name": "Thành phố Tam Kỳ"
                },
                {
                    "districtId": 3304,
                    "provinceId": 242,
                    "name": "Huyện Trà Bồng"
                },
                {
                    "districtId": 3270,
                    "provinceId": 242,
                    "name": "Huyện Sơn Tây"
                },
                {
                    "districtId": 3226,
                    "provinceId": 242,
                    "name": "Huyện Mộ Đức"
                },
                {
                    "districtId": 3127,
                    "provinceId": 242,
                    "name": "Huyện Ba Tơ"
                },
                {
                    "districtId": 2222,
                    "provinceId": 242,
                    "name": "Huyện Tây Trà"
                },
                {
                    "districtId": 2210,
                    "provinceId": 242,
                    "name": "Huyện Sơn Hà"
                },
                {
                    "districtId": 2167,
                    "provinceId": 242,
                    "name": "Huyện Minh Long"
                },
                {
                    "districtId": 2114,
                    "provinceId": 242,
                    "name": "Huyện đảo Lý Sơn"
                },
                {
                    "districtId": 1988,
                    "provinceId": 242,
                    "name": "Huyện Nghĩa Hành"
                },
                {
                    "districtId": 1930,
                    "provinceId": 242,
                    "name": "Thị xã Đức Phổ"
                },
                {
                    "districtId": 1898,
                    "provinceId": 242,
                    "name": "Huyện Bình Sơn"
                },
                {
                    "districtId": 1738,
                    "provinceId": 242,
                    "name": "Huyện Tư Nghĩa"
                },
                {
                    "districtId": 1737,
                    "provinceId": 242,
                    "name": "Huyện Sơn Tịnh"
                },
                {
                    "districtId": 1630,
                    "provinceId": 242,
                    "name": "Thành phố Quảng Ngãi"
                },
                {
                    "districtId": 3152,
                    "provinceId": 241,
                    "name": "Huyện Cư Jút"
                },
                {
                    "districtId": 2227,
                    "provinceId": 241,
                    "name": "Huyện Tuy Đức"
                },
                {
                    "districtId": 2151,
                    "provinceId": 241,
                    "name": "Huyện Krông Nô"
                },
                {
                    "districtId": 2120,
                    "provinceId": 241,
                    "name": "Huyện Đắk Song"
                },
                {
                    "districtId": 1792,
                    "provinceId": 241,
                    "name": "Huyện Đắk Mil"
                },
                {
                    "districtId": 1791,
                    "provinceId": 241,
                    "name": "Huyện Đắk Glong"
                },
                {
                    "districtId": 1790,
                    "provinceId": 241,
                    "name": "Huyện Đắk R lấp"
                },
                {
                    "districtId": 1627,
                    "provinceId": 241,
                    "name": "Thành phố Gia Nghĩa"
                },
                {
                    "districtId": 2035,
                    "provinceId": 240,
                    "name": "Thị xã Trảng Bàng"
                },
                {
                    "districtId": 1866,
                    "provinceId": 240,
                    "name": "Huyện Gò Dầu"
                },
                {
                    "districtId": 1865,
                    "provinceId": 240,
                    "name": "Huyện Bến Cầu"
                },
                {
                    "districtId": 1864,
                    "provinceId": 240,
                    "name": "Huyện Dương Minh Châu"
                },
                {
                    "districtId": 1863,
                    "provinceId": 240,
                    "name": "Huyện Tân Châu"
                },
                {
                    "districtId": 1862,
                    "provinceId": 240,
                    "name": "Huyện Tân Biên"
                },
                {
                    "districtId": 1721,
                    "provinceId": 240,
                    "name": "Thị xã Hòa Thành"
                },
                {
                    "districtId": 1720,
                    "provinceId": 240,
                    "name": "Huyện Châu Thành"
                },
                {
                    "districtId": 1626,
                    "provinceId": 240,
                    "name": "Thành phố Tây Ninh"
                },
                {
                    "districtId": 3444,
                    "provinceId": 239,
                    "name": "Huyện Phú Riềng"
                },
                {
                    "districtId": 3141,
                    "provinceId": 239,
                    "name": "Huyện Bù Gia Mập"
                },
                {
                    "districtId": 3140,
                    "provinceId": 239,
                    "name": "Huyện Bù Đốp"
                },
                {
                    "districtId": 1964,
                    "provinceId": 239,
                    "name": "Huyện Lộc Ninh"
                },
                {
                    "districtId": 1899,
                    "provinceId": 239,
                    "name": "Huyện Bù Đăng"
                },
                {
                    "districtId": 1775,
                    "provinceId": 239,
                    "name": "Thị xã Phước Long"
                },
                {
                    "districtId": 1774,
                    "provinceId": 239,
                    "name": "Thị xã Bình Long"
                },
                {
                    "districtId": 1773,
                    "provinceId": 239,
                    "name": "Huyện Hớn Quản"
                },
                {
                    "districtId": 1772,
                    "provinceId": 239,
                    "name": "Huyện Chơn Thành"
                },
                {
                    "districtId": 1722,
                    "provinceId": 239,
                    "name": "Huyện Đồng Phú"
                },
                {
                    "districtId": 1625,
                    "provinceId": 239,
                    "name": "Thành phố Đồng Xoài"
                },
                {
                    "districtId": 2137,
                    "provinceId": 238,
                    "name": "Huyện Hải Lăng"
                },
                {
                    "districtId": 2110,
                    "provinceId": 238,
                    "name": "Huyện đảo Cồn Cỏ"
                },
                {
                    "districtId": 2105,
                    "provinceId": 238,
                    "name": "Huyện Đa Krông"
                },
                {
                    "districtId": 2040,
                    "provinceId": 238,
                    "name": "Huyện Triệu Phong"
                },
                {
                    "districtId": 1936,
                    "provinceId": 238,
                    "name": "Huyện Gio Linh"
                },
                {
                    "districtId": 1903,
                    "provinceId": 238,
                    "name": "Huyện Cam Lộ"
                },
                {
                    "districtId": 1861,
                    "provinceId": 238,
                    "name": "Huyện Vĩnh Linh"
                },
                {
                    "districtId": 1860,
                    "provinceId": 238,
                    "name": "Huyện Hướng Hóa"
                },
                {
                    "districtId": 1621,
                    "provinceId": 238,
                    "name": "Thị xã Quảng Trị"
                },
                {
                    "districtId": 1620,
                    "provinceId": 238,
                    "name": "Thành phố Đông Hà"
                },
                {
                    "districtId": 3286,
                    "provinceId": 237,
                    "name": "Huyện Tuyên Hóa"
                },
                {
                    "districtId": 3258,
                    "provinceId": 237,
                    "name": "Huyện Quảng Trạch"
                },
                {
                    "districtId": 3224,
                    "provinceId": 237,
                    "name": "Huyện Minh Hóa"
                },
                {
                    "districtId": 2002,
                    "provinceId": 237,
                    "name": "Huyện Quảng Ninh"
                },
                {
                    "districtId": 1859,
                    "provinceId": 237,
                    "name": "Thị xã Ba Đồn"
                },
                {
                    "districtId": 1858,
                    "provinceId": 237,
                    "name": "Huyện Bố Trạch"
                },
                {
                    "districtId": 1857,
                    "provinceId": 237,
                    "name": "Huyện Lệ Thủy"
                },
                {
                    "districtId": 1619,
                    "provinceId": 237,
                    "name": "Thành phố Đồng Hới"
                },
                {
                    "districtId": 3441,
                    "provinceId": 236,
                    "name": "Thị xã Kỳ Anh"
                },
                {
                    "districtId": 3320,
                    "provinceId": 236,
                    "name": "Huyện Vũ Quang"
                },
                {
                    "districtId": 3220,
                    "provinceId": 236,
                    "name": "Huyện Lộc Hà"
                },
                {
                    "districtId": 3201,
                    "provinceId": 236,
                    "name": "Huyện Hương Sơn"
                },
                {
                    "districtId": 3188,
                    "provinceId": 236,
                    "name": "Huyện Đức Thọ"
                },
                {
                    "districtId": 3143,
                    "provinceId": 236,
                    "name": "Huyện Can Lộc"
                },
                {
                    "districtId": 2024,
                    "provinceId": 236,
                    "name": "Huyện Thạch Hà"
                },
                {
                    "districtId": 1815,
                    "provinceId": 236,
                    "name": "Huyện Cẩm Xuyên"
                },
                {
                    "districtId": 1814,
                    "provinceId": 236,
                    "name": "Thị xã Hồng Lĩnh"
                },
                {
                    "districtId": 1813,
                    "provinceId": 236,
                    "name": "Huyện Nghi Xuân"
                },
                {
                    "districtId": 1812,
                    "provinceId": 236,
                    "name": "Huyện Hương Khê"
                },
                {
                    "districtId": 1811,
                    "provinceId": 236,
                    "name": "Huyện Kỳ Anh"
                },
                {
                    "districtId": 1618,
                    "provinceId": 236,
                    "name": "Thành phố Hà Tĩnh"
                },
                {
                    "districtId": 3291,
                    "provinceId": 235,
                    "name": "Huyện Thanh Chương"
                },
                {
                    "districtId": 3288,
                    "provinceId": 235,
                    "name": "Huyện Tương Dương"
                },
                {
                    "districtId": 3261,
                    "provinceId": 235,
                    "name": "Huyện Quỳ Châu"
                },
                {
                    "districtId": 3260,
                    "provinceId": 235,
                    "name": "Huyện Quế Phong"
                },
                {
                    "districtId": 3233,
                    "provinceId": 235,
                    "name": "Huyện Nam Đàn"
                },
                {
                    "districtId": 3211,
                    "provinceId": 235,
                    "name": "Huyện Kỳ Sơn"
                },
                {
                    "districtId": 1947,
                    "provinceId": 235,
                    "name": "Huyện Hưng Nguyên"
                },
                {
                    "districtId": 1854,
                    "provinceId": 235,
                    "name": "Huyện Nghi Lộc"
                },
                {
                    "districtId": 1853,
                    "provinceId": 235,
                    "name": "Huyện Con Cuông"
                },
                {
                    "districtId": 1852,
                    "provinceId": 235,
                    "name": "Huyện Quỳ Hợp"
                },
                {
                    "districtId": 1851,
                    "provinceId": 235,
                    "name": "Huyện Nghĩa Đàn"
                },
                {
                    "districtId": 1850,
                    "provinceId": 235,
                    "name": "Thị xã Thái Hòa"
                },
                {
                    "districtId": 1849,
                    "provinceId": 235,
                    "name": "Thị xã Hoàng Mai"
                },
                {
                    "districtId": 1848,
                    "provinceId": 235,
                    "name": "Huyện Quỳnh Lưu"
                },
                {
                    "districtId": 1847,
                    "provinceId": 235,
                    "name": "Huyện Diễn Châu"
                },
                {
                    "districtId": 1846,
                    "provinceId": 235,
                    "name": "Huyện Yên Thành"
                },
                {
                    "districtId": 1845,
                    "provinceId": 235,
                    "name": "Huyện Tân Kỳ"
                },
                {
                    "districtId": 1844,
                    "provinceId": 235,
                    "name": "Huyện Anh Sơn"
                },
                {
                    "districtId": 1843,
                    "provinceId": 235,
                    "name": "Huyện Đô Lương"
                },
                {
                    "districtId": 1842,
                    "provinceId": 235,
                    "name": "Thị xã Cửa Lò"
                },
                {
                    "districtId": 1617,
                    "provinceId": 235,
                    "name": "Thành phố Vinh"
                },
                {
                    "districtId": 3298,
                    "provinceId": 234,
                    "name": "Huyện Thiệu Hóa"
                },
                {
                    "districtId": 3241,
                    "provinceId": 234,
                    "name": "Huyện Nga Sơn"
                },
                {
                    "districtId": 3216,
                    "provinceId": 234,
                    "name": "Huyện Lang Chánh"
                },
                {
                    "districtId": 3147,
                    "provinceId": 234,
                    "name": "Huyện Cẩm Thủy"
                },
                {
                    "districtId": 2249,
                    "provinceId": 234,
                    "name": "Huyện Triệu Sơn"
                },
                {
                    "districtId": 2190,
                    "provinceId": 234,
                    "name": "Huyện Như Thanh"
                },
                {
                    "districtId": 2181,
                    "provinceId": 234,
                    "name": "Huyện Nông Cống"
                },
                {
                    "districtId": 2070,
                    "provinceId": 234,
                    "name": "Huyện Bá Thước"
                },
                {
                    "districtId": 2000,
                    "provinceId": 234,
                    "name": "Huyện Quan Sơn"
                },
                {
                    "districtId": 1942,
                    "provinceId": 234,
                    "name": "Huyện Hậu Lộc"
                },
                {
                    "districtId": 1927,
                    "provinceId": 234,
                    "name": "Huyện Đông Sơn"
                },
                {
                    "districtId": 1881,
                    "provinceId": 234,
                    "name": "Huyện Vĩnh Lộc"
                },
                {
                    "districtId": 1880,
                    "provinceId": 234,
                    "name": "Huyện Thạch Thành"
                },
                {
                    "districtId": 1879,
                    "provinceId": 234,
                    "name": "Huyện Quan Hóa"
                },
                {
                    "districtId": 1878,
                    "provinceId": 234,
                    "name": "Huyện Mường Lát"
                },
                {
                    "districtId": 1877,
                    "provinceId": 234,
                    "name": "Huyện Hà Trung"
                },
                {
                    "districtId": 1876,
                    "provinceId": 234,
                    "name": "Thị xã Bỉm Sơn"
                },
                {
                    "districtId": 1875,
                    "provinceId": 234,
                    "name": "Huyện Yên Định"
                },
                {
                    "districtId": 1874,
                    "provinceId": 234,
                    "name": "Huyện Ngọc Lặc"
                },
                {
                    "districtId": 1873,
                    "provinceId": 234,
                    "name": "Huyện Thọ Xuân"
                },
                {
                    "districtId": 1872,
                    "provinceId": 234,
                    "name": "Huyện Thường Xuân"
                },
                {
                    "districtId": 1871,
                    "provinceId": 234,
                    "name": "Huyện Như Xuân"
                },
                {
                    "districtId": 1870,
                    "provinceId": 234,
                    "name": "Thị Xã Nghi Sơn"
                },
                {
                    "districtId": 1748,
                    "provinceId": 234,
                    "name": "Huyện Hoằng Hóa"
                },
                {
                    "districtId": 1747,
                    "provinceId": 234,
                    "name": "Huyện Quảng Xương"
                },
                {
                    "districtId": 1712,
                    "provinceId": 234,
                    "name": "Thành phố Sầm Sơn"
                },
                {
                    "districtId": 1616,
                    "provinceId": 234,
                    "name": "Thành phố Thanh Hóa"
                },
                {
                    "districtId": 3327,
                    "provinceId": 233,
                    "name": "Huyện Yên Mô"
                },
                {
                    "districtId": 3247,
                    "provinceId": 233,
                    "name": "Huyện Nho Quan"
                },
                {
                    "districtId": 3205,
                    "provinceId": 233,
                    "name": "Huyện Kim Sơn"
                },
                {
                    "districtId": 3191,
                    "provinceId": 233,
                    "name": "Huyện Gia Viễn"
                },
                {
                    "districtId": 1944,
                    "provinceId": 233,
                    "name": "Huyện Hoa Lư"
                },
                {
                    "districtId": 1714,
                    "provinceId": 233,
                    "name": "Huyện Yên Khánh"
                },
                {
                    "districtId": 1713,
                    "provinceId": 233,
                    "name": "Thành phố Tam Điệp"
                },
                {
                    "districtId": 1615,
                    "provinceId": 233,
                    "name": "Thành phố Ninh Bình"
                },
                {
                    "districtId": 2027,
                    "provinceId": 232,
                    "name": "Huyện Thanh Liêm"
                },
                {
                    "districtId": 1970,
                    "provinceId": 232,
                    "name": "Huyện Lý Nhân"
                },
                {
                    "districtId": 1952,
                    "provinceId": 232,
                    "name": "Huyện Kim Bảng"
                },
                {
                    "districtId": 1897,
                    "provinceId": 232,
                    "name": "Huyện Bình Lục"
                },
                {
                    "districtId": 1802,
                    "provinceId": 232,
                    "name": "Thị xã Duy Tiên"
                },
                {
                    "districtId": 1614,
                    "provinceId": 232,
                    "name": "Thành phố Phủ Lý"
                },
                {
                    "districtId": 3323,
                    "provinceId": 231,
                    "name": "Huyện Xuân Trường"
                },
                {
                    "districtId": 3319,
                    "provinceId": 231,
                    "name": "Huyện Vụ Bản"
                },
                {
                    "districtId": 3308,
                    "provinceId": 231,
                    "name": "Huyện Trực Ninh"
                },
                {
                    "districtId": 3243,
                    "provinceId": 231,
                    "name": "Huyện Nghĩa Hưng"
                },
                {
                    "districtId": 3193,
                    "provinceId": 231,
                    "name": "Huyện Giao Thủy"
                },
                {
                    "districtId": 1983,
                    "provinceId": 231,
                    "name": "Huyện Nam Trực"
                },
                {
                    "districtId": 1981,
                    "provinceId": 231,
                    "name": "Huyện Mỹ Lộc"
                },
                {
                    "districtId": 1841,
                    "provinceId": 231,
                    "name": "Huyện Ý Yên"
                },
                {
                    "districtId": 1840,
                    "provinceId": 231,
                    "name": "Huyện Hải Hậu"
                },
                {
                    "districtId": 1613,
                    "provinceId": 231,
                    "name": "Thành phố Nam Định"
                },
                {
                    "districtId": 3199,
                    "provinceId": 230,
                    "name": "Huyện Hoành Bồ"
                },
                {
                    "districtId": 3185,
                    "provinceId": 230,
                    "name": "Thị xã Đông Triều"
                },
                {
                    "districtId": 3180,
                    "provinceId": 230,
                    "name": "Huyện Đầm Hà"
                },
                {
                    "districtId": 3126,
                    "provinceId": 230,
                    "name": "Huyện Ba Chẽ"
                },
                {
                    "districtId": 2109,
                    "provinceId": 230,
                    "name": "Huyện đảo Cô Tô"
                },
                {
                    "districtId": 2066,
                    "provinceId": 230,
                    "name": "Thị xã Quảng Yên"
                },
                {
                    "districtId": 2019,
                    "provinceId": 230,
                    "name": "Huyện Tiên Yên"
                },
                {
                    "districtId": 1940,
                    "provinceId": 230,
                    "name": "Huyện Hải Hà"
                },
                {
                    "districtId": 1920,
                    "provinceId": 230,
                    "name": "Huyện đảo Vân Đồn"
                },
                {
                    "districtId": 1896,
                    "provinceId": 230,
                    "name": "Huyện Bình Liêu"
                },
                {
                    "districtId": 1686,
                    "provinceId": 230,
                    "name": "Thành phố Uông Bí"
                },
                {
                    "districtId": 1683,
                    "provinceId": 230,
                    "name": "Thành phố Cẩm Phả"
                },
                {
                    "districtId": 1604,
                    "provinceId": 230,
                    "name": "Thành phố Hạ Long"
                },
                {
                    "districtId": 1603,
                    "provinceId": 230,
                    "name": "Thành phố Móng Cái"
                },
                {
                    "districtId": 3290,
                    "provinceId": 229,
                    "name": "Huyện Thanh Ba"
                },
                {
                    "districtId": 3272,
                    "provinceId": 229,
                    "name": "Huyện Tam Nông"
                },
                {
                    "districtId": 2268,
                    "provinceId": 229,
                    "name": "Huyện Yên Lập"
                },
                {
                    "districtId": 2237,
                    "provinceId": 229,
                    "name": "Huyện Thanh Thủy"
                },
                {
                    "districtId": 2064,
                    "provinceId": 229,
                    "name": "Thị xã Phú Thọ"
                },
                {
                    "districtId": 2029,
                    "provinceId": 229,
                    "name": "Huyện Thanh Sơn"
                },
                {
                    "districtId": 2015,
                    "provinceId": 229,
                    "name": "Huyện Tân Sơn"
                },
                {
                    "districtId": 1994,
                    "provinceId": 229,
                    "name": "Huyện Phù Ninh"
                },
                {
                    "districtId": 1959,
                    "provinceId": 229,
                    "name": "Huyện Lâm Thao"
                },
                {
                    "districtId": 1938,
                    "provinceId": 229,
                    "name": "Huyện Hạ Hòa"
                },
                {
                    "districtId": 1925,
                    "provinceId": 229,
                    "name": "Huyện Đoan Hùng"
                },
                {
                    "districtId": 1905,
                    "provinceId": 229,
                    "name": "Huyện Cẩm Khê"
                },
                {
                    "districtId": 1602,
                    "provinceId": 229,
                    "name": "Thành phố Việt Trì"
                },
                {
                    "districtId": 3267,
                    "provinceId": 228,
                    "name": "Huyện Sơn Dương"
                },
                {
                    "districtId": 3157,
                    "provinceId": 228,
                    "name": "Huyện Chiêm Hóa"
                },
                {
                    "districtId": 1982,
                    "provinceId": 228,
                    "name": "Huyện Na Hang"
                },
                {
                    "districtId": 1957,
                    "provinceId": 228,
                    "name": "Huyện Lâm Bình"
                },
                {
                    "districtId": 1941,
                    "provinceId": 228,
                    "name": "Huyện Hàm Yên"
                },
                {
                    "districtId": 1745,
                    "provinceId": 228,
                    "name": "Huyện Yên Sơn"
                },
                {
                    "districtId": 1601,
                    "provinceId": 228,
                    "name": "Thành phố Tuyên Quang"
                },
                {
                    "districtId": 2256,
                    "provinceId": 227,
                    "name": "Huyện Vị Xuyên"
                },
                {
                    "districtId": 2075,
                    "provinceId": 227,
                    "name": "Huyện Bắc Mê"
                },
                {
                    "districtId": 2053,
                    "provinceId": 227,
                    "name": "Huyện Yên Minh"
                },
                {
                    "districtId": 2052,
                    "provinceId": 227,
                    "name": "Huyện Xín Mần"
                },
                {
                    "districtId": 2001,
                    "provinceId": 227,
                    "name": "Huyện Quang Bình"
                },
                {
                    "districtId": 1999,
                    "provinceId": 227,
                    "name": "Huyện Quản Bạ"
                },
                {
                    "districtId": 1973,
                    "provinceId": 227,
                    "name": "Huyện Mèo Vạc"
                },
                {
                    "districtId": 1945,
                    "provinceId": 227,
                    "name": "Huyện Hoàng Su Phì"
                },
                {
                    "districtId": 1928,
                    "provinceId": 227,
                    "name": "Huyện Đồng Văn"
                },
                {
                    "districtId": 1893,
                    "provinceId": 227,
                    "name": "Huyện Bắc Quang"
                },
                {
                    "districtId": 1600,
                    "provinceId": 227,
                    "name": "Thành phố Hà Giang"
                },
                {
                    "districtId": 3281,
                    "provinceId": 226,
                    "name": "Huyện Tiền Hải"
                },
                {
                    "districtId": 1951,
                    "provinceId": 226,
                    "name": "Huyện Kiến Xương"
                },
                {
                    "districtId": 1869,
                    "provinceId": 226,
                    "name": "Huyện Thái Thụy"
                },
                {
                    "districtId": 1868,
                    "provinceId": 226,
                    "name": "Huyện Quỳnh Phụ"
                },
                {
                    "districtId": 1867,
                    "provinceId": 226,
                    "name": "Huyện Hưng Hà"
                },
                {
                    "districtId": 1716,
                    "provinceId": 226,
                    "name": "Huyện Vũ Thư"
                },
                {
                    "districtId": 1715,
                    "provinceId": 226,
                    "name": "Huyện Đông Hưng"
                },
                {
                    "districtId": 1599,
                    "provinceId": 226,
                    "name": "Thành phố Thái Bình"
                },
                {
                    "districtId": 3294,
                    "provinceId": 225,
                    "name": "Huyện Thanh Miện"
                },
                {
                    "districtId": 3292,
                    "provinceId": 225,
                    "name": "Huyện Thanh Hà"
                },
                {
                    "districtId": 3287,
                    "provinceId": 225,
                    "name": "Huyện Tứ Kỳ"
                },
                {
                    "districtId": 3238,
                    "provinceId": 225,
                    "name": "Huyện Ninh Giang"
                },
                {
                    "districtId": 2056,
                    "provinceId": 225,
                    "name": "Thành phố Chí Linh"
                },
                {
                    "districtId": 1953,
                    "provinceId": 225,
                    "name": "Huyện Kim Thành"
                },
                {
                    "districtId": 1934,
                    "provinceId": 225,
                    "name": "Huyện Gia Lộc"
                },
                {
                    "districtId": 1818,
                    "provinceId": 225,
                    "name": "Thị xã Kinh Môn"
                },
                {
                    "districtId": 1817,
                    "provinceId": 225,
                    "name": "Huyện Cẩm Giàng"
                },
                {
                    "districtId": 1816,
                    "provinceId": 225,
                    "name": "Huyện Bình Giang"
                },
                {
                    "districtId": 1727,
                    "provinceId": 225,
                    "name": "Huyện Nam Sách"
                },
                {
                    "districtId": 1598,
                    "provinceId": 225,
                    "name": "Thành phố Hải Dương"
                },
                {
                    "districtId": 3203,
                    "provinceId": 224,
                    "name": "Huyện Kiến Thụy"
                },
                {
                    "districtId": 2108,
                    "provinceId": 224,
                    "name": "Huyện đảo Cát Hải"
                },
                {
                    "districtId": 2107,
                    "provinceId": 224,
                    "name": "Huyện đảo Bạch Long Vĩ"
                },
                {
                    "districtId": 1822,
                    "provinceId": 224,
                    "name": "Huyện Vĩnh Bảo"
                },
                {
                    "districtId": 1821,
                    "provinceId": 224,
                    "name": "Huyện Tiên Lãng"
                },
                {
                    "districtId": 1820,
                    "provinceId": 224,
                    "name": "Huyện An Lão"
                },
                {
                    "districtId": 1819,
                    "provinceId": 224,
                    "name": "Huyện An Dương"
                },
                {
                    "districtId": 1726,
                    "provinceId": 224,
                    "name": "Huyện Thủy Nguyên"
                },
                {
                    "districtId": 1707,
                    "provinceId": 224,
                    "name": "Quận Đồ Sơn"
                },
                {
                    "districtId": 1706,
                    "provinceId": 224,
                    "name": "Quận Dương Kinh"
                },
                {
                    "districtId": 1591,
                    "provinceId": 224,
                    "name": "Quận Hải An"
                },
                {
                    "districtId": 1590,
                    "provinceId": 224,
                    "name": "Quận Kiến An"
                },
                {
                    "districtId": 1589,
                    "provinceId": 224,
                    "name": "Quận Hồng Bàng"
                },
                {
                    "districtId": 1588,
                    "provinceId": 224,
                    "name": "Quận Lê Chân"
                },
                {
                    "districtId": 1587,
                    "provinceId": 224,
                    "name": "Quận Ngô Quyền"
                },
                {
                    "districtId": 3257,
                    "provinceId": 223,
                    "name": "Huyện Quảng Điền"
                },
                {
                    "districtId": 3234,
                    "provinceId": 223,
                    "name": "Huyện Nam Đông"
                },
                {
                    "districtId": 2193,
                    "provinceId": 223,
                    "name": "Huyện Phong Điền"
                },
                {
                    "districtId": 1885,
                    "provinceId": 223,
                    "name": "Huyện A Lưới"
                },
                {
                    "districtId": 1882,
                    "provinceId": 223,
                    "name": "Huyện Phú Lộc"
                },
                {
                    "districtId": 1749,
                    "provinceId": 223,
                    "name": "Huyện Phú Vang"
                },
                {
                    "districtId": 1698,
                    "provinceId": 223,
                    "name": "Thị xã Hương Thủy"
                },
                {
                    "districtId": 1697,
                    "provinceId": 223,
                    "name": "Thị xã Hương Trà"
                },
                {
                    "districtId": 1585,
                    "provinceId": 223,
                    "name": "Thành phố Huế"
                },
                {
                    "districtId": 3271,
                    "provinceId": 221,
                    "name": "Huyện Tam Đảo"
                },
                {
                    "districtId": 3265,
                    "provinceId": 221,
                    "name": "Huyện Sông Lô"
                },
                {
                    "districtId": 2065,
                    "provinceId": 221,
                    "name": "Thành phố Phúc Yên"
                },
                {
                    "districtId": 2009,
                    "provinceId": 221,
                    "name": "Huyện Tam Dương"
                },
                {
                    "districtId": 1960,
                    "provinceId": 221,
                    "name": "Huyện Lập Thạch"
                },
                {
                    "districtId": 1734,
                    "provinceId": 221,
                    "name": "Huyện Yên Lạc"
                },
                {
                    "districtId": 1733,
                    "provinceId": 221,
                    "name": "Huyện Vĩnh Tường"
                },
                {
                    "districtId": 1732,
                    "provinceId": 221,
                    "name": "Huyện Bình Xuyên"
                },
                {
                    "districtId": 1578,
                    "provinceId": 221,
                    "name": "Thành phố Vĩnh Yên"
                },
                {
                    "districtId": 3317,
                    "provinceId": 220,
                    "name": "Huyện Vĩnh Thạnh"
                },
                {
                    "districtId": 3300,
                    "provinceId": 220,
                    "name": "Huyện Thới Lai"
                },
                {
                    "districtId": 3250,
                    "provinceId": 220,
                    "name": "Huyện Phong Điền"
                },
                {
                    "districtId": 3150,
                    "provinceId": 220,
                    "name": "Huyện Cờ Đỏ"
                },
                {
                    "districtId": 1576,
                    "provinceId": 220,
                    "name": "Quận Thốt Nốt"
                },
                {
                    "districtId": 1575,
                    "provinceId": 220,
                    "name": "Quận Ô Môn"
                },
                {
                    "districtId": 1574,
                    "provinceId": 220,
                    "name": "Quận Cái Răng"
                },
                {
                    "districtId": 1573,
                    "provinceId": 220,
                    "name": "Quận Bình Thủy"
                },
                {
                    "districtId": 1572,
                    "provinceId": 220,
                    "name": "Quận Ninh Kiều"
                },
                {
                    "districtId": 3125,
                    "provinceId": 219,
                    "name": "Huyện An Minh"
                },
                {
                    "districtId": 2260,
                    "provinceId": 219,
                    "name": "Huyện Vĩnh Thuận"
                },
                {
                    "districtId": 2251,
                    "provinceId": 219,
                    "name": "Huyện U Minh Thượng"
                },
                {
                    "districtId": 2134,
                    "provinceId": 219,
                    "name": "Huyện Giang Thành"
                },
                {
                    "districtId": 2132,
                    "provinceId": 219,
                    "name": "Huyện Gò Quao"
                },
                {
                    "districtId": 2115,
                    "provinceId": 219,
                    "name": "Thành phố Phú Quốc"
                },
                {
                    "districtId": 2113,
                    "provinceId": 219,
                    "name": "Huyện đảo Kiên Hải"
                },
                {
                    "districtId": 2058,
                    "provinceId": 219,
                    "name": "Thành phố Hà Tiên"
                },
                {
                    "districtId": 1950,
                    "provinceId": 219,
                    "name": "Huyện Kiên Lương"
                },
                {
                    "districtId": 1833,
                    "provinceId": 219,
                    "name": "Huyện An Biên"
                },
                {
                    "districtId": 1832,
                    "provinceId": 219,
                    "name": "Huyện Giồng Riềng"
                },
                {
                    "districtId": 1831,
                    "provinceId": 219,
                    "name": "Huyện Tân Hiệp"
                },
                {
                    "districtId": 1830,
                    "provinceId": 219,
                    "name": "Huyện Hòn Đất"
                },
                {
                    "districtId": 1719,
                    "provinceId": 219,
                    "name": "Huyện Châu Thành"
                },
                {
                    "districtId": 1570,
                    "provinceId": 219,
                    "name": "Thành phố Rạch Giá"
                },
                {
                    "districtId": 2272,
                    "provinceId": 218,
                    "name": "Thị xã Vĩnh Châu"
                },
                {
                    "districtId": 2238,
                    "provinceId": 218,
                    "name": "Huyện Thạnh Trị"
                },
                {
                    "districtId": 2173,
                    "provinceId": 218,
                    "name": "Huyện Mỹ Tú"
                },
                {
                    "districtId": 2161,
                    "provinceId": 218,
                    "name": "Huyện Long Phú"
                },
                {
                    "districtId": 2093,
                    "provinceId": 218,
                    "name": "Huyện Cù Lao Dung"
                },
                {
                    "districtId": 2062,
                    "provinceId": 218,
                    "name": "Thị xã Ngã Năm"
                },
                {
                    "districtId": 2037,
                    "provinceId": 218,
                    "name": "Huyện Trần Đề"
                },
                {
                    "districtId": 1949,
                    "provinceId": 218,
                    "name": "Huyện Kế Sách"
                },
                {
                    "districtId": 1910,
                    "provinceId": 218,
                    "name": "Huyện Châu Thành"
                },
                {
                    "districtId": 1743,
                    "provinceId": 218,
                    "name": "Huyện Mỹ Xuyên"
                },
                {
                    "districtId": 1568,
                    "provinceId": 218,
                    "name": "Thành phố Sóc Trăng"
                },
                {
                    "districtId": 1758,
                    "provinceId": 217,
                    "name": "Huyện Châu Phú"
                },
                {
                    "districtId": 1757,
                    "provinceId": 217,
                    "name": "Huyện Chợ Mới"
                },
                {
                    "districtId": 1756,
                    "provinceId": 217,
                    "name": "Huyện Phú Tân"
                },
                {
                    "districtId": 1755,
                    "provinceId": 217,
                    "name": "Huyện Tân Châu"
                },
                {
                    "districtId": 1754,
                    "provinceId": 217,
                    "name": "Huyện An Phú"
                },
                {
                    "districtId": 1753,
                    "provinceId": 217,
                    "name": "Thành phố Châu Đốc"
                },
                {
                    "districtId": 1752,
                    "provinceId": 217,
                    "name": "Huyện Tịnh Biên"
                },
                {
                    "districtId": 1751,
                    "provinceId": 217,
                    "name": "Huyện Tri Tôn"
                },
                {
                    "districtId": 1750,
                    "provinceId": 217,
                    "name": "Huyện Thoại Sơn"
                },
                {
                    "districtId": 1718,
                    "provinceId": 217,
                    "name": "Huyện Châu Thành"
                },
                {
                    "districtId": 1566,
                    "provinceId": 217,
                    "name": "Thành phố Long Xuyên"
                },
                {
                    "districtId": 3200,
                    "provinceId": 216,
                    "name": "Thành phố Hồng Ngự"
                },
                {
                    "districtId": 3155,
                    "provinceId": 216,
                    "name": "Huyện Châu Thành"
                },
                {
                    "districtId": 2059,
                    "provinceId": 216,
                    "name": "Thị xã Hồng Ngự"
                },
                {
                    "districtId": 2030,
                    "provinceId": 216,
                    "name": "Huyện Tháp Mười"
                },
                {
                    "districtId": 2026,
                    "provinceId": 216,
                    "name": "Huyện Thanh Bình"
                },
                {
                    "districtId": 2013,
                    "provinceId": 216,
                    "name": "Huyện Tân Hồng"
                },
                {
                    "districtId": 2011,
                    "provinceId": 216,
                    "name": "Huyện Tam Nông"
                },
                {
                    "districtId": 1961,
                    "provinceId": 216,
                    "name": "Huyện Lấp Vò"
                },
                {
                    "districtId": 1725,
                    "provinceId": 216,
                    "name": "Huyện Lai Vung"
                },
                {
                    "districtId": 1724,
                    "provinceId": 216,
                    "name": "Huyện Cao Lãnh"
                },
                {
                    "districtId": 1668,
                    "provinceId": 216,
                    "name": "Thành phố Sa Đéc"
                },
                {
                    "districtId": 1564,
                    "provinceId": 216,
                    "name": "Thành phố Cao Lãnh"
                },
                {
                    "districtId": 2263,
                    "provinceId": 215,
                    "name": "Huyện Vũng Liêm"
                },
                {
                    "districtId": 2164,
                    "provinceId": 215,
                    "name": "Huyện Mang Thít"
                },
                {
                    "districtId": 2081,
                    "provinceId": 215,
                    "name": "Huyện Bình Tân"
                },
                {
                    "districtId": 2054,
                    "provinceId": 215,
                    "name": "Thị xã Bình Minh"
                },
                {
                    "districtId": 2034,
                    "provinceId": 215,
                    "name": "Huyện Trà Ôn"
                },
                {
                    "districtId": 2008,
                    "provinceId": 215,
                    "name": "Huyện Tam Bình"
                },
                {
                    "districtId": 1962,
                    "provinceId": 215,
                    "name": "Huyện Long Hồ"
                },
                {
                    "districtId": 1562,
                    "provinceId": 215,
                    "name": "Thành phố Vĩnh Long"
                },
                {
                    "districtId": 3443,
                    "provinceId": 214,
                    "name": "Thị xã Duyên Hải"
                },
                {
                    "districtId": 2103,
                    "provinceId": 214,
                    "name": "Huyện Duyên Hải"
                },
                {
                    "districtId": 2091,
                    "provinceId": 214,
                    "name": "Huyện Cầu Kè"
                },
                {
                    "districtId": 2086,
                    "provinceId": 214,
                    "name": "Huyện Càng Long"
                },
                {
                    "districtId": 2033,
                    "provinceId": 214,
                    "name": "Huyện Trà Cú"
                },
                {
                    "districtId": 2020,
                    "provinceId": 214,
                    "name": "Huyện Tiểu Cần"
                },
                {
                    "districtId": 1911,
                    "provinceId": 214,
                    "name": "Huyện Châu Thành"
                },
                {
                    "districtId": 1908,
                    "provinceId": 214,
                    "name": "Huyện Cầu Ngang"
                },
                {
                    "districtId": 1560,
                    "provinceId": 214,
                    "name": "Thành phố Trà Vinh"
                },
                {
                    "districtId": 3158,
                    "provinceId": 213,
                    "name": "Huyện Chợ Lách"
                },
                {
                    "districtId": 2028,
                    "provinceId": 213,
                    "name": "Huyện Thạnh Phú"
                },
                {
                    "districtId": 1975,
                    "provinceId": 213,
                    "name": "Huyện Mỏ Cày Nam"
                },
                {
                    "districtId": 1974,
                    "provinceId": 213,
                    "name": "Huyện Mỏ Cày Bắc"
                },
                {
                    "districtId": 1937,
                    "provinceId": 213,
                    "name": "Huyện Giồng Trôm"
                },
                {
                    "districtId": 1895,
                    "provinceId": 213,
                    "name": "Huyện Bình Đại"
                },
                {
                    "districtId": 1888,
                    "provinceId": 213,
                    "name": "Huyện Ba Tri"
                },
                {
                    "districtId": 1742,
                    "provinceId": 213,
                    "name": "Huyện Châu Thành"
                },
                {
                    "districtId": 1558,
                    "provinceId": 213,
                    "name": "Thành phố Bến Tre"
                },
                {
                    "districtId": 3275,
                    "provinceId": 212,
                    "name": "Huyện Tân Phước"
                },
                {
                    "districtId": 2216,
                    "provinceId": 212,
                    "name": "Huyện Tân Phú Đông"
                },
                {
                    "districtId": 2084,
                    "provinceId": 212,
                    "name": "Huyện Cai Lậy"
                },
                {
                    "districtId": 2057,
                    "provinceId": 212,
                    "name": "Thị xã Gò Công"
                },
                {
                    "districtId": 2055,
                    "provinceId": 212,
                    "name": "Thị xã Cai Lậy"
                },
                {
                    "districtId": 1933,
                    "provinceId": 212,
                    "name": "Huyện Gò Công Tây"
                },
                {
                    "districtId": 1932,
                    "provinceId": 212,
                    "name": "Huyện Gò Công Đông"
                },
                {
                    "districtId": 1900,
                    "provinceId": 212,
                    "name": "Huyện Cái Bè"
                },
                {
                    "districtId": 1741,
                    "provinceId": 212,
                    "name": "Huyện Chợ Gạo"
                },
                {
                    "districtId": 1740,
                    "provinceId": 212,
                    "name": "Huyện Châu Thành"
                },
                {
                    "districtId": 1556,
                    "provinceId": 212,
                    "name": "Thành phố Mỹ Tho"
                },
                {
                    "districtId": 3329,
                    "provinceId": 211,
                    "name": "Thị xã Kiến Tường"
                },
                {
                    "districtId": 3315,
                    "provinceId": 211,
                    "name": "Huyện Vĩnh Hưng"
                },
                {
                    "districtId": 3293,
                    "provinceId": 211,
                    "name": "Huyện Thạnh Hóa"
                },
                {
                    "districtId": 3276,
                    "provinceId": 211,
                    "name": "Huyện Tân Thạnh"
                },
                {
                    "districtId": 3273,
                    "provinceId": 211,
                    "name": "Huyện Tân Hưng"
                },
                {
                    "districtId": 3227,
                    "provinceId": 211,
                    "name": "Huyện Mộc Hóa"
                },
                {
                    "districtId": 2129,
                    "provinceId": 211,
                    "name": "Huyện Đức Huệ"
                },
                {
                    "districtId": 2031,
                    "provinceId": 211,
                    "name": "Huyện Thủ Thừa"
                },
                {
                    "districtId": 2016,
                    "provinceId": 211,
                    "name": "Huyện Tân Trụ"
                },
                {
                    "districtId": 1929,
                    "provinceId": 211,
                    "name": "Huyện Đức Hòa"
                },
                {
                    "districtId": 1909,
                    "provinceId": 211,
                    "name": "Huyện Châu Thành"
                },
                {
                    "districtId": 1907,
                    "provinceId": 211,
                    "name": "Huyện Cần Giuộc"
                },
                {
                    "districtId": 1906,
                    "provinceId": 211,
                    "name": "Huyện Cần Đước"
                },
                {
                    "districtId": 1894,
                    "provinceId": 211,
                    "name": "Huyện Bến Lức"
                },
                {
                    "districtId": 1554,
                    "provinceId": 211,
                    "name": "Thành phố Tân An"
                },
                {
                    "districtId": 3418,
                    "provinceId": 210,
                    "name": "Huyện M Đrắk"
                },
                {
                    "districtId": 3217,
                    "provinceId": 210,
                    "name": "Huyện Lắk"
                },
                {
                    "districtId": 3153,
                    "provinceId": 210,
                    "name": "Huyện Cư Kuin"
                },
                {
                    "districtId": 2150,
                    "provinceId": 210,
                    "name": "Huyện Krông Búk"
                },
                {
                    "districtId": 2131,
                    "provinceId": 210,
                    "name": "Huyện Ea Súp"
                },
                {
                    "districtId": 1954,
                    "provinceId": 210,
                    "name": "Huyện Krông Pắc"
                },
                {
                    "districtId": 1931,
                    "provinceId": 210,
                    "name": "Huyện Ea Kar"
                },
                {
                    "districtId": 1884,
                    "provinceId": 210,
                    "name": "Huyện Krông Ana"
                },
                {
                    "districtId": 1789,
                    "provinceId": 210,
                    "name": "Huyện Krông Bông"
                },
                {
                    "districtId": 1788,
                    "provinceId": 210,
                    "name": "Thị xã Buôn Hồ"
                },
                {
                    "districtId": 1787,
                    "provinceId": 210,
                    "name": "Huyện Krông Năng"
                },
                {
                    "districtId": 1786,
                    "provinceId": 210,
                    "name": "Huyện Ea H leo"
                },
                {
                    "districtId": 1785,
                    "provinceId": 210,
                    "name": "Huyện Cư M gar"
                },
                {
                    "districtId": 1784,
                    "provinceId": 210,
                    "name": "Huyện Buôn Ðôn"
                },
                {
                    "districtId": 1552,
                    "provinceId": 210,
                    "name": "Thành phố Buôn Ma Thuột"
                },
                {
                    "districtId": 3160,
                    "provinceId": 209,
                    "name": "Huyện Di Linh"
                },
                {
                    "districtId": 3146,
                    "provinceId": 209,
                    "name": "Huyện Cát Tiên"
                },
                {
                    "districtId": 2106,
                    "provinceId": 209,
                    "name": "Huyện Đạ Tẻh"
                },
                {
                    "districtId": 2104,
                    "provinceId": 209,
                    "name": "Huyện Đạ Huoai"
                },
                {
                    "districtId": 1958,
                    "provinceId": 209,
                    "name": "Huyện Lâm Hà"
                },
                {
                    "districtId": 1956,
                    "provinceId": 209,
                    "name": "Huyện Lạc Dương"
                },
                {
                    "districtId": 1919,
                    "provinceId": 209,
                    "name": "Huyện Đam Rông"
                },
                {
                    "districtId": 1839,
                    "provinceId": 209,
                    "name": "Huyện Bảo Lâm"
                },
                {
                    "districtId": 1838,
                    "provinceId": 209,
                    "name": "Thành phố Bảo Lộc"
                },
                {
                    "districtId": 1837,
                    "provinceId": 209,
                    "name": "Huyện Đức Trọng"
                },
                {
                    "districtId": 1836,
                    "provinceId": 209,
                    "name": "Huyện Đơn Dương"
                },
                {
                    "districtId": 1550,
                    "provinceId": 209,
                    "name": "Thành phố Đà Lạt"
                },
                {
                    "districtId": 3213,
                    "provinceId": 208,
                    "name": "Huyện Khánh Vĩnh"
                },
                {
                    "districtId": 3212,
                    "provinceId": 208,
                    "name": "Huyện Khánh Sơn"
                },
                {
                    "districtId": 2117,
                    "provinceId": 208,
                    "name": "Huyện đảo Trường Sa"
                },
                {
                    "districtId": 2061,
                    "provinceId": 208,
                    "name": "Thị xã Ninh Hòa"
                },
                {
                    "districtId": 1902,
                    "provinceId": 208,
                    "name": "Huyện Cam Lâm"
                },
                {
                    "districtId": 1829,
                    "provinceId": 208,
                    "name": "Huyện Vạn Ninh"
                },
                {
                    "districtId": 1739,
                    "provinceId": 208,
                    "name": "Huyện Diên Khánh"
                },
                {
                    "districtId": 1664,
                    "provinceId": 208,
                    "name": "Thành phố Cam Ranh"
                },
                {
                    "districtId": 1548,
                    "provinceId": 208,
                    "name": "Thành phố Nha Trang"
                },
                {
                    "districtId": 2165,
                    "provinceId": 207,
                    "name": "Huyện Mang Yang"
                },
                {
                    "districtId": 2152,
                    "provinceId": 207,
                    "name": "Huyện Krông Pa"
                },
                {
                    "districtId": 2149,
                    "provinceId": 207,
                    "name": "Huyện Kông Chro"
                },
                {
                    "districtId": 2144,
                    "provinceId": 207,
                    "name": "Huyện Kbang"
                },
                {
                    "districtId": 2119,
                    "provinceId": 207,
                    "name": "Huyện Đắk Pơ"
                },
                {
                    "districtId": 2118,
                    "provinceId": 207,
                    "name": "Huyện Đắk Đoa"
                },
                {
                    "districtId": 2101,
                    "provinceId": 207,
                    "name": "Huyện Chư Pưh"
                },
                {
                    "districtId": 1801,
                    "provinceId": 207,
                    "name": "Huyện Chư Păh"
                },
                {
                    "districtId": 1800,
                    "provinceId": 207,
                    "name": "Thị xã An Khê"
                },
                {
                    "districtId": 1799,
                    "provinceId": 207,
                    "name": "Huyện Ia Pa"
                },
                {
                    "districtId": 1798,
                    "provinceId": 207,
                    "name": "Thị xã Ayun Pa"
                },
                {
                    "districtId": 1797,
                    "provinceId": 207,
                    "name": "Huyện Phú Thiện"
                },
                {
                    "districtId": 1796,
                    "provinceId": 207,
                    "name": "Huyện Chư Sê"
                },
                {
                    "districtId": 1795,
                    "provinceId": 207,
                    "name": "Huyện Chư Prông"
                },
                {
                    "districtId": 1794,
                    "provinceId": 207,
                    "name": "Huyện Đức Cơ"
                },
                {
                    "districtId": 1793,
                    "provinceId": 207,
                    "name": "Huyện Ia Grai"
                },
                {
                    "districtId": 1546,
                    "provinceId": 207,
                    "name": "Thành phố Pleiku"
                },
                {
                    "districtId": 2111,
                    "provinceId": 206,
                    "name": "Huyện đảo Côn Đảo"
                },
                {
                    "districtId": 1709,
                    "provinceId": 206,
                    "name": "Huyện Châu Đức"
                },
                {
                    "districtId": 1701,
                    "provinceId": 206,
                    "name": "Thị Xã Phú Mỹ"
                },
                {
                    "districtId": 1699,
                    "provinceId": 206,
                    "name": "Huyện Xuyên Mộc"
                },
                {
                    "districtId": 1690,
                    "provinceId": 206,
                    "name": "Huyện Đất Đỏ"
                },
                {
                    "districtId": 1689,
                    "provinceId": 206,
                    "name": "Huyện Long Điền"
                },
                {
                    "districtId": 1688,
                    "provinceId": 206,
                    "name": "TT Phú Mỹ - cũ"
                },
                {
                    "districtId": 1667,
                    "provinceId": 206,
                    "name": "Thành phố Bà Rịa"
                },
                {
                    "districtId": 1544,
                    "provinceId": 206,
                    "name": "Thành phố Vũng Tàu"
                },
                {
                    "districtId": 3135,
                    "provinceId": 205,
                    "name": "Huyện Bắc Tân Uyên"
                },
                {
                    "districtId": 3132,
                    "provinceId": 205,
                    "name": "Huyện Bàu Bàng"
                },
                {
                    "districtId": 1992,
                    "provinceId": 205,
                    "name": "Huyện Phú Giáo"
                },
                {
                    "districtId": 1746,
                    "provinceId": 205,
                    "name": "Huyện Dầu Tiếng"
                },
                {
                    "districtId": 1696,
                    "provinceId": 205,
                    "name": "Thị xã Bến Cát"
                },
                {
                    "districtId": 1695,
                    "provinceId": 205,
                    "name": "Thị xã Tân Uyên"
                },
                {
                    "districtId": 1541,
                    "provinceId": 205,
                    "name": "Thành phố Thuận An"
                },
                {
                    "districtId": 1540,
                    "provinceId": 205,
                    "name": "Thành phố Dĩ An"
                },
                {
                    "districtId": 1538,
                    "provinceId": 205,
                    "name": "Thành phố Thủ Dầu Một"
                },
                {
                    "districtId": 2049,
                    "provinceId": 204,
                    "name": "Huyện Vĩnh Cửu"
                },
                {
                    "districtId": 1708,
                    "provinceId": 204,
                    "name": "Huyện Nhơn Trạch"
                },
                {
                    "districtId": 1705,
                    "provinceId": 204,
                    "name": "Huyện Thống Nhất"
                },
                {
                    "districtId": 1704,
                    "provinceId": 204,
                    "name": "Huyện Xuân Lộc"
                },
                {
                    "districtId": 1702,
                    "provinceId": 204,
                    "name": "Huyện Cẩm Mỹ"
                },
                {
                    "districtId": 1700,
                    "provinceId": 204,
                    "name": "Huyện Định Quán"
                },
                {
                    "districtId": 1694,
                    "provinceId": 204,
                    "name": "Huyện Long Thành"
                },
                {
                    "districtId": 1693,
                    "provinceId": 204,
                    "name": "Huyện Tân Phú"
                },
                {
                    "districtId": 1692,
                    "provinceId": 204,
                    "name": "Thành phố Long Khánh"
                },
                {
                    "districtId": 1691,
                    "provinceId": 204,
                    "name": "Huyện Trảng Bom"
                },
                {
                    "districtId": 1536,
                    "provinceId": 204,
                    "name": "Thành phố Biên Hòa"
                },
                {
                    "districtId": 2112,
                    "provinceId": 203,
                    "name": "Huyện đảo Hoàng Sa"
                },
                {
                    "districtId": 1687,
                    "provinceId": 203,
                    "name": "Huyện Hòa Vang"
                },
                {
                    "districtId": 1531,
                    "provinceId": 203,
                    "name": "Quận Cẩm Lệ"
                },
                {
                    "districtId": 1530,
                    "provinceId": 203,
                    "name": "Quận Liên Chiểu"
                },
                {
                    "districtId": 1529,
                    "provinceId": 203,
                    "name": "Quận Ngũ Hành Sơn"
                },
                {
                    "districtId": 1528,
                    "provinceId": 203,
                    "name": "Quận Sơn Trà"
                },
                {
                    "districtId": 1527,
                    "provinceId": 203,
                    "name": "Quận Thanh Khê"
                },
                {
                    "districtId": 1526,
                    "provinceId": 203,
                    "name": "Quận Hải Châu"
                },
                {
                    "districtId": 3715,
                    "provinceId": 202,
                    "name": "33"
                },
                {
                    "districtId": 3713,
                    "provinceId": 202,
                    "name": "Quận mới"
                },
                {
                    "districtId": 3695,
                    "provinceId": 202,
                    "name": "Thành Phố Thủ Đức"
                },
                {
                    "districtId": 2090,
                    "provinceId": 202,
                    "name": "Huyện Cần Giờ"
                },
                {
                    "districtId": 1534,
                    "provinceId": 202,
                    "name": "Huyện Nhà Bè"
                },
                {
                    "districtId": 1533,
                    "provinceId": 202,
                    "name": "Huyện Bình Chánh"
                },
                {
                    "districtId": 1463,
                    "provinceId": 202,
                    "name": "Quận Thủ Đức"
                },
                {
                    "districtId": 1462,
                    "provinceId": 202,
                    "name": "Quận Bình Thạnh"
                },
                {
                    "districtId": 1461,
                    "provinceId": 202,
                    "name": "Quận Gò Vấp"
                },
                {
                    "districtId": 1460,
                    "provinceId": 202,
                    "name": "Huyện Củ Chi"
                },
                {
                    "districtId": 1459,
                    "provinceId": 202,
                    "name": "Huyện Hóc Môn"
                },
                {
                    "districtId": 1458,
                    "provinceId": 202,
                    "name": "Quận Bình Tân Update"
                },
                {
                    "districtId": 1457,
                    "provinceId": 202,
                    "name": "Quận Phú Nhuận"
                },
                {
                    "districtId": 1456,
                    "provinceId": 202,
                    "name": "Quận Tân Phú"
                },
                {
                    "districtId": 1455,
                    "provinceId": 202,
                    "name": "Quận Tân Bình"
                },
                {
                    "districtId": 1454,
                    "provinceId": 202,
                    "name": "Quận 12"
                },
                {
                    "districtId": 1453,
                    "provinceId": 202,
                    "name": "Quận 11"
                },
                {
                    "districtId": 1452,
                    "provinceId": 202,
                    "name": "Quận 10"
                },
                {
                    "districtId": 1451,
                    "provinceId": 202,
                    "name": "Quận 9"
                },
                {
                    "districtId": 1450,
                    "provinceId": 202,
                    "name": "Quận 8"
                },
                {
                    "districtId": 1449,
                    "provinceId": 202,
                    "name": "Quận 7"
                },
                {
                    "districtId": 1448,
                    "provinceId": 202,
                    "name": "Quận 6"
                },
                {
                    "districtId": 1447,
                    "provinceId": 202,
                    "name": "Quận 5"
                },
                {
                    "districtId": 1446,
                    "provinceId": 202,
                    "name": "Quận 4"
                },
                {
                    "districtId": 1444,
                    "provinceId": 202,
                    "name": "Quận 3"
                },
                {
                    "districtId": 1443,
                    "provinceId": 202,
                    "name": "Quận 2"
                },
                {
                    "districtId": 1442,
                    "provinceId": 202,
                    "name": "Quận 1"
                },
                {
                    "districtId": 3440,
                    "provinceId": 201,
                    "name": "Quận Nam Từ Liêm"
                },
                {
                    "districtId": 3303,
                    "provinceId": 201,
                    "name": "Huyện Thường Tín"
                },
                {
                    "districtId": 3255,
                    "provinceId": 201,
                    "name": "Huyện Phú Xuyên"
                },
                {
                    "districtId": 2004,
                    "provinceId": 201,
                    "name": "Huyện Quốc Oai"
                },
                {
                    "districtId": 1915,
                    "provinceId": 201,
                    "name": "Huyện Chương Mỹ"
                },
                {
                    "districtId": 1810,
                    "provinceId": 201,
                    "name": "Huyện Ứng Hòa"
                },
                {
                    "districtId": 1809,
                    "provinceId": 201,
                    "name": "Huyện Thanh Oai"
                },
                {
                    "districtId": 1808,
                    "provinceId": 201,
                    "name": "Huyện Thạch Thất"
                },
                {
                    "districtId": 1807,
                    "provinceId": 201,
                    "name": "Huyện Phúc Thọ"
                },
                {
                    "districtId": 1806,
                    "provinceId": 201,
                    "name": "Huyện Mỹ Đức"
                },
                {
                    "districtId": 1805,
                    "provinceId": 201,
                    "name": "Huyện Hoài Đức"
                },
                {
                    "districtId": 1804,
                    "provinceId": 201,
                    "name": "Huyện Đan Phượng"
                },
                {
                    "districtId": 1803,
                    "provinceId": 201,
                    "name": "Huyện Ba Vì"
                },
                {
                    "districtId": 1711,
                    "provinceId": 201,
                    "name": "Thị xã Sơn Tây"
                },
                {
                    "districtId": 1710,
                    "provinceId": 201,
                    "name": "Huyện Thanh Trì"
                },
                {
                    "districtId": 1703,
                    "provinceId": 201,
                    "name": "Huyện Gia Lâm"
                },
                {
                    "districtId": 1583,
                    "provinceId": 201,
                    "name": "Huyện Sóc Sơn"
                },
                {
                    "districtId": 1582,
                    "provinceId": 201,
                    "name": "Huyện Đông Anh"
                },
                {
                    "districtId": 1581,
                    "provinceId": 201,
                    "name": "Huyện Mê Linh"
                },
                {
                    "districtId": 1542,
                    "provinceId": 201,
                    "name": "Quận Hà Đông"
                },
                {
                    "districtId": 1493,
                    "provinceId": 201,
                    "name": "Quận Thanh Xuân"
                },
                {
                    "districtId": 1492,
                    "provinceId": 201,
                    "name": "Quận Tây Hồ"
                },
                {
                    "districtId": 1491,
                    "provinceId": 201,
                    "name": "Quận Long Biên"
                },
                {
                    "districtId": 1490,
                    "provinceId": 201,
                    "name": "Quận Hoàng Mai"
                },
                {
                    "districtId": 1489,
                    "provinceId": 201,
                    "name": "Quận Hoàn Kiếm"
                },
                {
                    "districtId": 1488,
                    "provinceId": 201,
                    "name": "Quận Hai Bà Trưng"
                },
                {
                    "districtId": 1486,
                    "provinceId": 201,
                    "name": "Quận Đống Đa"
                },
                {
                    "districtId": 1485,
                    "provinceId": 201,
                    "name": "Quận Cầu Giấy"
                },
                {
                    "districtId": 1484,
                    "provinceId": 201,
                    "name": "Quận Ba Đình"
                },
                {
                    "districtId": 1482,
                    "provinceId": 201,
                    "name": "Quận Bắc Từ Liêm"
                }
            ]
        )
    }
}
