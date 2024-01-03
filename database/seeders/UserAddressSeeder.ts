import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import AddressWard from 'App/Models/AddressWard'
import User from 'App/Models/User'
import UserAddress from 'App/Models/UserAddress'

export default class extends BaseSeeder {
    public async run() {
        // Write your database queries inside the run method
        // await UserAddress.createMany([
        //     {
        //         recipientName: 'Nguyễn Thành Trung',
        //         recipientPhone: '0334674390',
        //         street: 'D1/3 đường 385',
        //         userId: 420,
        //         isDefault: true,
        //         wardsId: 8782
        //     },
        //     {
        //         recipientName: 'Quách Diệu Khánh',
        //         recipientPhone: '0938427896',
        //         street: '12/6/8 Hoàng Hoa Thám',
        //         userId: 2,
        //         isDefault: true,
        //         wardsId: 8714
        //     },
        // ])

        // Data faker
        const wards = await AddressWard.all()
        const users = await User.all()

        const streetDatas = [
            '41 Tran Quy Cap St., Dien Khanh Dist.',
            '8/7B Street 4, Block 6, Truong Tho Ward',
            '53/10A Phan Dang Luu St., Ward 7',
            '22/6Street No. 15, Tan Kieng Ward, District 7',
            '99C/36 Quang Trung St., Ward 11',
            '57B/98, Dinh Dong Street',
            'Km12, Highway 1A, Van Dien Town',
            '84 Pham Dinh Ho Street, Ward 2, District 6',
            '111,  Bac Ai Street',
            '54 lo 954, Phu My',
            'F11 National Highway 1',
            '59 Nguyen Hue, Ward 1',
            'Hoa Nhut Hamlet',
            '597 Le Duan',
            'Nguyen Van Cu Street',
            'Tan Dinh Hamlet, Tan Thong Hoi Ward',
            'Lam Van Thanh, Ward 11',
            '75 Vo Thi Sau, Hung Long Ward',
            'Da Lan Village',
            'Phia Den Commune, Nguyen Binh District',
            'Area 10, Ward An Binh',
            'Thanh Nhat Commune, Ha Lang District',
            '361 Tran Hung Dao Street, Cau Kho Ward, District 1',
            'Khai Quang Hamlet, Vinh Yen Town',
            '8 Ngo Huu Hanh Street',
            '22 Ong Ich Khiem St., Ward 14, Dist. 11',
            '45 Chua Vua Street',
            '172 Pho C Dieu, Ward 6, Dist.11',
            '21 Bui Thi Xuan Street, Ben Thanh Ward, District 1',
            '8a Su Thien Chieu Str., Ward 7, Dist. 3',
            '139 30/4 Street, Quarter 1',
            '183/35 Street. 3/2, Ward 11, District. 10',
            '4 Phan Chu Trinh Street, Hai Chau District',
            '12- 14 Tran Phu Street',
            '16/23 Nguyen Duc Canh Street, Le Chan District',
            '171 Nguyen Hoang St., Nam Duong Ward',
            '558B Le Duan',
            'No. 45 Nguyen Van Troi',
            '29 Ha Huy Tap',
            '267 Ly Thai To Street, Ward 9, District 10',
            'Rm. 611, 23 Phan Chu Trinh Str',
            '55/13A Blk 4, Tan Chanh Hiep Ward, District 12',
            '8 Le Duan, Dist.1',
            '193 Duong Hoang Hoa Tham',
            '25/106 Hoang Quoc Viet St, Tu Liem DC',
            'Area 4, Ward Chau Van Liem, District O Mon',
            'Kim Ma',
            '130 Ly Thai To, Ward Thac Gian, District Thanh Khe',
            '301 Ngo Quyen',
            'Nha A, khu TMDV nha o C1, Quang Trung',
            'Binh Hung 1 Sub-hamlet',
            '193 Le Hong Phong, Phuoc Hoa',
            '130  Cau Giay Street',
            'Xuan Tien Hamlet',
            '18 Nguyen Lam Street, Ward 6, District 10',
            '1C Tong Dan Street',
            '789 Le Hong Phong, Ward 12, Dist.10',
            '572/4 Le Quang Dinh Street, Ward 1',
            'Rm.902, 4 Da Tuong',
            '56 Nguyen Khang, Yen Hoa Ward',
            '139 Van Thanh Bac, D3 St., Ward 25',
            '6E Ba Trieu, Ward 3',
            '40 Ky Dong Street, Ward 9, District 3',
            'Dong Nhi Area',
            '42 Group 20, Sai Dong Ward',
            '8/46,  area 5',
            '730/77 Huong Lo 2, Binh Tri Dong A Ward',
            '384/1 Nam Ky Khoi Nghia, Ward 08, Dist.3',
            '129 Au C, Ward 13',
            '39 Str. D2, Van Thanh Bac Area., Ward 25',
            '30 Han Thuyen Street',
            '162/34A Tran Quang Dieu Street, An Thoi Ward',
            '1 / 6 Le Hong Phong street, Zone 4, Ward 1',
            '20 Le Quy Don - Bach Dang, Ha Long',
            '339 Hung Vuong, Vinh Trung Ward',
            '22Bis Thi Sach St., Ben Nghe Ward, Dist. 1',
            '59 Pho Duc Chinh Street',
            'Km 92 An Tri Area, Hung Vuong Ward',
            '99 Ha Huy Giap St., Thanh Loc Ward, Dist. 12',
            '65 Nguyen Trai, Ben Thanh Ward, Dist.1',
            '777 Lam Quang Ky, Vinh Lac ward',
            '102 A15 Nghia Tan Str.',
            '36 Cat Linh',
            '2 Truong Son Street',
            'P17 D3 St., Ward 25',
            '13 Cho Lon Street, Ward 11, District 6',
            '123/38 Nguyen Xi Street, 26 Ward',
            '171/5C Tran Ke Xuong Street, Ward 7',
            'Highway 91, Thanh An Village',
            '21 Đang Tien Đong Street',
            '62A Pham Ngoc Thach, Ward 6, Dist.3',
            '214 Ba Trieu',
            '4 Tran Quy Khoach Street, Tan Dinh Ward, District 1',
            'Nam Tien Hamlet',
            '789 Luy Ban Bich, Tan Thanh',
            'Lot A1-2, Tay Bac Industrial Zone',
            'Alley 102, A1 Truong Chinh',
            'Floor 1, 64 Ho Tung Mau St., Ben Nghe Ward',
            '47/52/19 (B1) Bui Dinh Tuy Street,  Ward 24',
            '17 Phan Chu Trinh street, Quy Nhon city',
            '18 Ngo Duc Ke, Tan Hamlet',
            '65/24 Tang Nhon Phu Street, Phuoc Long B Ward, District 9',
            '22 Phu Hoa, Ward 7',
            '14 Hang Cot, Ward Hang Ma',
            '136 St. 8, Ward 11',
            '60 Ao Doi St., Binh Tri Dong A Ward',
            '331 Ngoc Lam Street',
            '23 Kim Giang Street, Lane 30',
            '44 Tran Dang Ninh, Dich Vong, Cau Giay',
            '230 Nam Ky Khoi Nghia, P8.',
            '164C Dien Bien Phu Street, Ward 6, District 3',
            '215 A25 Phan Dang Luu, Ward 1',
            '91 Pho Duc Chinh, Dist.1',
            '10B, K1A, Cau Dien Townlet',
            '59/6/12 Nguyen Dinh Chieu St., Ward 4, Dist. 3',
            'B74, To Ky, Ward Dong Hung Thuan',
            '354 Lac Long Quan Street, District 11',
            'Str.4, Ninh Trung group',
            '37 Nguyen Truong To St.',
            '659 Xo Viet Nghe Tinh',
            '2/25 National Highway 1A, Binh Tri Dong Ward',
            '1st Flr., 15D Le Thanh Ton, Dist.1',
            '209 Kim Ma',
            '92 Lane 79, Tran Cung St, Nghia Tan Ward',
            '72B Tran Binh Trong Street, Ward 1',
            'Nam Tien Hamlet',
            '22 Lang Ha Street',
            '55 Dai La',
            '20-22.3-2, Ward 12, Dist.10',
            '855 Tran Hung Dao, Ward 1, District 5',
            '100/506B Thich Quang Duc Street, Ward 5',
            'E2 Pham Viet Chanh St., Lane 12, Ward 19',
            '132 Tran Hung Dao, Ward Phu Thuy',
            '1459 3 THANG 2 STREET, WADR 16, DISTRICT 11',
            'Unit 5, Floor 3, 8 Trang Thi St.',
            '1A Pho Hue Street',
            'No. 2 pho Kim Hoan',
            '5 B40 Thinh Quang Street, Hamlet 41',
            '104 De To Hoang St.',
            '144 Hoang Lien',
            'Lane 174, Group 7, Ngoc Thuy Ward',
            '79 Nguyen Hue St., Ben Nghe Ward, Dist. 1',
            'Unit 308, CT9 House, Dinh Cong New Urban Area',
            '4 Truong Chinh St., Lane 354, Khuong Thuong Ward',
            '18 Lang Ha Street, Lane 90',
            '697-699 Kinh Duong Vuong, P-An Lac',
            '168 Le Thanh Tong Street , Ha Long',
            'BuildingI.T.C No. 239 Xuan Thuy, District Cau Giay',
            '12 Doc Lap Avenue',
            '50 Nghi Tam, Yen Phu Ward',
            '16A4 Dam Trau Street',
            '15 Ngo Quyen',
            '1 Hoang Liet Ward',
            '477 An Duong Vuong, Ward 3, Dist.5',
            'Km 19, Quoc Oai IZ.',
            '43D Tran Quy Cap St., Ward 12',
            '18 An Duong Vuong Street, ward 9, District 5',
            'Str. 4, Tan Binh Khon IZ, Tay Thanh Ward',
            '195/30 Vuon Lai St., Phu Tho Hoa Ward',
            'Phu Ninh Hamlet, Phu Ninh Dist.',
            'Building dieu hanh EPZ Linh Trung I, Linh Trung',
            '39/6 National Rd. 13th, Binh Giao Hamlet',
            '14 Thap Muoi, Ward 2, District 6',
            '2 Cai Dam',
            '54 Minh Khai StreetHung Binh Ward, Vinh City',
            '368/919 Cach Mang Thang Tam St., Ward 4',
            '331 / 58b Le Van Sy',
            '06 Tran Quang Khai Street, Nha Trang City',
            '11 Pham Phu Tien Street, Ward 10, District 5',
            '12A Ho Van Hue Street, Lot B. Living Quarter 43, Ward 9',
            'No. 44 Giang Van Minh, District Ba Dinh',
            '123 Dien Bien Phu, Dakao Ward, Dist.1',
            '106 Ly Thuong Kiet, Lim, Tien Du',
            '46, Hoang Van Thu Street, Ha Huy Tap Ward',
            '505/14 Ben Binh Dong Street, District 8',
            '40 Pham Hong Thai street, Quy Nhon city',
            '8 Tong Dan',
            'No. 4 Yet Kieu',
            '241 Nguyen Van Thoai',
            '24 Hoang Ngoc Phach Street, Phu Tho Hoa Ward',
            'Tam Tan St., Canal 10, Tan An Hoi Ward',
            '68 Ho Xuan Huong, Ngu Hanh Son district',
            '1/10 Dong Sub-hamlet',
            '814/2-4 Su Van Hanh Street, Ward 12, District 10',
            '140 Nguyen Van Luong, Ward 10, Dist.6',
            '102 Nam Cao Street',
            '21/39/1 Alley, Phao Dai Lang, Lang Thuong Ward',
            '54 Str. 10, Ward 8',
            'Pho Moi Town',
            '90 Dien Bien Phu, Thach Thang Ward',
            '282 Da Nang, Van My',
            '56/1 Pham Van Chieu Street, Ward 13',
            '103B Do Thanh Living Quarter, Ward 4, Dist. 3',
            'Ha Huy Tap StreetDai Nai Hamlet,  Town',
            '7 Kim Ma St., Lane 290',
            '300 Hai Ba Trung, District 3',
            '12 DINH PHONG PHU Street, Tang Nhon Phu B Ward,DISTRICT 9',
            '136A To Hien Thanh, Ward 14, Dist.10',
            '121 Nhien Tri, Ward 7',
            '248/23A Nguyen Thai Binh, Ward 12',
        ]

        function getRandomObject<T>(array: T[]): T | undefined {
            const randomIndex = Math.floor(Math.random() * array.length)
            return array[randomIndex]
        }

        function getRandomElementsFromArray(arr: string[]): string[] {
            const minCount = 1;
            const maxCount = 3;

            const randomCount = Math.floor(Math.random() * (maxCount - minCount + 1)) + minCount;

            // Shuffle the array
            const shuffledArray = arr.sort(() => Math.random() - 0.5);

            // Slice the array to get the random elements
            const randomElements = shuffledArray.slice(0, randomCount);

            return randomElements;
        }

        for (const user of users) {
            await user.load('profile')
            const streetArr = getRandomElementsFromArray(streetDatas)
            for (const street of streetArr) {
                const ward = getRandomObject(wards)
                if (ward) {
                    // typeof ward.wardsId === 'string' && (ward.wardsId = parseFloat(ward.wardsId))
                    await user.related('addresses').create({
                        recipientName: user.profile.firstname + ' ' + user.profile.lastname,
                        recipientPhone: user.profile.phoneNumber,
                        street: street,
                        wardsId: ward.wardsId,
                        isDefault: true,
                    })
                }
            }
        }
    }
}
