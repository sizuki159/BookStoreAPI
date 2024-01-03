import Book from "App/Models/Book";
import UserAddress from "App/Models/UserAddress";
import axios from "axios";

export async function calculateFee(userAddress: UserAddress, items: Book[]): Promise<number> {
    try {
        await userAddress.load('wards')

        const productWeight = items.reduce((sum, item) => sum + item.weight, 0)

        const dataPost = {
            "service_id": 53320,
            "service_type_id": 2,
            "to_district_id": userAddress.wards.districtId,
            "to_ward_code": userAddress.wardsId,
            "height": 50,
            "length": 20,
            "weight": productWeight,
            "width": 20
        }

        const headers = {
            'content-type': 'application/json; charset=UTF-8',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Token': 'e824c446-aa07-11ee-a6e6-e60958111f48',
            'ShopId': '190722',
        }

        const calculateFee = await axios.post('https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee', dataPost, {
            headers: headers
        })

        return calculateFee.data.data.total as number
    } catch {
        return 29000
    }
}