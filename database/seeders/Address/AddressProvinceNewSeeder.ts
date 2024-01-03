import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import AddressProvine from 'App/Models/AddressProvine'

export default class extends BaseSeeder {
    public async run() {
        // Write your database queries inside the run method

        await AddressProvine.createMany(
            [
                {
                    "provinceId": 269,
                    "name": "Lào Cai"
                },
                {
                    "provinceId": 268,
                    "name": "Hưng Yên"
                },
                {
                    "provinceId": 267,
                    "name": "Hòa Bình"
                },
                {
                    "provinceId": 266,
                    "name": "Sơn La"
                },
                {
                    "provinceId": 265,
                    "name": "Điện Biên"
                },
                {
                    "provinceId": 264,
                    "name": "Lai Châu"
                },
                {
                    "provinceId": 263,
                    "name": "Yên Bái"
                },
                {
                    "provinceId": 262,
                    "name": "Bình Định"
                },
                {
                    "provinceId": 261,
                    "name": "Ninh Thuận"
                },
                {
                    "provinceId": 260,
                    "name": "Phú Yên"
                },
                {
                    "provinceId": 259,
                    "name": "Kon Tum"
                },
                {
                    "provinceId": 258,
                    "name": "Bình Thuận"
                },
                {
                    "provinceId": 253,
                    "name": "Bạc Liêu"
                },
                {
                    "provinceId": 252,
                    "name": "Cà Mau"
                },
                {
                    "provinceId": 250,
                    "name": "Hậu Giang"
                },
                {
                    "provinceId": 249,
                    "name": "Bắc Ninh"
                },
                {
                    "provinceId": 248,
                    "name": "Bắc Giang"
                },
                {
                    "provinceId": 247,
                    "name": "Lạng Sơn"
                },
                {
                    "provinceId": 246,
                    "name": "Cao Bằng"
                },
                {
                    "provinceId": 245,
                    "name": "Bắc Kạn"
                },
                {
                    "provinceId": 244,
                    "name": "Thái Nguyên"
                },
                {
                    "provinceId": 243,
                    "name": "Quảng Nam"
                },
                {
                    "provinceId": 242,
                    "name": "Quảng Ngãi"
                },
                {
                    "provinceId": 241,
                    "name": "Đắk Nông"
                },
                {
                    "provinceId": 240,
                    "name": "Tây Ninh"
                },
                {
                    "provinceId": 239,
                    "name": "Bình Phước"
                },
                {
                    "provinceId": 238,
                    "name": "Quảng Trị"
                },
                {
                    "provinceId": 237,
                    "name": "Quảng Bình"
                },
                {
                    "provinceId": 236,
                    "name": "Hà Tĩnh"
                },
                {
                    "provinceId": 235,
                    "name": "Nghệ An"
                },
                {
                    "provinceId": 234,
                    "name": "Thanh Hóa"
                },
                {
                    "provinceId": 233,
                    "name": "Ninh Bình"
                },
                {
                    "provinceId": 232,
                    "name": "Hà Nam"
                },
                {
                    "provinceId": 231,
                    "name": "Nam Định"
                },
                {
                    "provinceId": 230,
                    "name": "Quảng Ninh"
                },
                {
                    "provinceId": 229,
                    "name": "Phú Thọ"
                },
                {
                    "provinceId": 228,
                    "name": "Tuyên Quang"
                },
                {
                    "provinceId": 227,
                    "name": "Hà Giang"
                },
                {
                    "provinceId": 226,
                    "name": "Thái Bình"
                },
                {
                    "provinceId": 225,
                    "name": "Hải Dương"
                },
                {
                    "provinceId": 224,
                    "name": "Hải Phòng"
                },
                {
                    "provinceId": 223,
                    "name": "Thừa Thiên - Huế"
                },
                {
                    "provinceId": 221,
                    "name": "Vĩnh Phúc"
                },
                {
                    "provinceId": 220,
                    "name": "Cần Thơ"
                },
                {
                    "provinceId": 219,
                    "name": "Kiên Giang"
                },
                {
                    "provinceId": 218,
                    "name": "Sóc Trăng"
                },
                {
                    "provinceId": 217,
                    "name": "An Giang"
                },
                {
                    "provinceId": 216,
                    "name": "Đồng Tháp"
                },
                {
                    "provinceId": 215,
                    "name": "Vĩnh Long"
                },
                {
                    "provinceId": 214,
                    "name": "Trà Vinh"
                },
                {
                    "provinceId": 213,
                    "name": "Bến Tre"
                },
                {
                    "provinceId": 212,
                    "name": "Tiền Giang"
                },
                {
                    "provinceId": 211,
                    "name": "Long An"
                },
                {
                    "provinceId": 210,
                    "name": "Đắk Lắk"
                },
                {
                    "provinceId": 209,
                    "name": "Lâm Đồng"
                },
                {
                    "provinceId": 208,
                    "name": "Khánh Hòa"
                },
                {
                    "provinceId": 207,
                    "name": "Gia Lai"
                },
                {
                    "provinceId": 206,
                    "name": "Bà Rịa - Vũng Tàu"
                },
                {
                    "provinceId": 205,
                    "name": "Bình Dương"
                },
                {
                    "provinceId": 204,
                    "name": "Đồng Nai"
                },
                {
                    "provinceId": 203,
                    "name": "Đà Nẵng"
                },
                {
                    "provinceId": 202,
                    "name": "Hồ Chí Minh"
                },
                {
                    "provinceId": 201,
                    "name": "Hà Nội"
                }
            ]
        )
    }
}
