import { CherryPick } from "@ioc:Adonis/Lucid/Orm";
import UserAddressFilterFields from "../User/UserAddressFilterFields";

const AdminUserFilterFields: CherryPick = {
    fields: {
        pick: [
            'id',
            'email',
            'money',
            'is_email_verified',
            'status',
        ]
    },
    relations: {
        userRole: {
            fields: {
                pick: [
                    'name',
                ]
            }
        },
        userLevel: {
            fields: {
                pick: [
                    'level_name',
                ]
            }
        },
        profile: {
            fields: {
                pick: [
                    'firstname',
                    'lastname',
                    'phone_number',
                    'address',
                    'gender',
                    'avatar_source',
                ]
            }
        },
        addresses: UserAddressFilterFields,
    }
}

export default AdminUserFilterFields