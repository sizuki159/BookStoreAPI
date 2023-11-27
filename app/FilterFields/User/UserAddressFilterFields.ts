import { CherryPick } from "@ioc:Adonis/Lucid/Orm";

const UserAddressFilterFields: CherryPick = {
    fields: {
        omit: [
            'wards_id',
            'user_id',
            'created_at',
            'updated_at',
        ]
    },
    relations: {
        'wards': {
            fields: {
                pick: [
                    'wards_id',
                    'name',
                ]
            },
            relations: {
                'district': {
                    fields: {
                        pick: [
                            'district_id',
                            'name',
                        ]
                    },
                    relations: {
                        'province': {
                            fields: {
                                pick: [
                                    'province_id',
                                    'name',
                                ]
                            }
                        }
                    }
                }
            }
        }
    }
}

export default UserAddressFilterFields