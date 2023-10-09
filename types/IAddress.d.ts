interface IAddress {
    id: number,
    recipient_name: string,
    recipient_phone: string,
    street: string,
    user_id: number,
    is_default: boolean,
    ward: {
        wards_id: number | string,
        district_id: number | string,
        name: string,
    },
    district: {
        district_id: number | string,
        province_id: number | string,
        name: string,
    },
    province: {
        province_id: number| string,
        name: string,
    },
}