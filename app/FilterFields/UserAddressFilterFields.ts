import { CherryPick } from "@ioc:Adonis/Lucid/Orm";

const UserAddressFilterFields: CherryPick = {
    fields: {
        omit: ['wards_id', 'user_id', 'created_at', 'updated_at']
    },
    relations: {
        'wards': {
            fields: {
                pick: ['name']
            },
            relations: {
                'district': {
                    fields: {
                        pick: ['name']
                    },
                    relations: {
                        'province': {
                            fields: {
                                pick: ['name']
                            }
                        }
                    }
                }
            }
        }
    }
}

export default UserAddressFilterFields