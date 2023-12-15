import { CherryPick } from "@ioc:Adonis/Lucid/Orm";
import UserAddressFilterFields from "../User/UserAddressFilterFields";
import UserFilterFields from "../User/UserFilterFields";
import AdminBookFilterFields from "./AdminBookFilterFields";

const AdminOrderFilterFields: CherryPick = {
    fields: {
        pick: [
            'id',
            'product_price',
            'fee_price',
            'final_price',
            'discount_price',
            'voucher',
            'payment_method',
            'status',
            'payment_status',
            'customer_note',
            'created_at',
            'updated_at',
        ]
    },
    relations: {
        'items': {
            fields: {
                pick: ['quantity', 'price_per_unit']
            },
            relations: {
                'product': AdminBookFilterFields
            }
        },
        'user': UserFilterFields,
        'userAddress': UserAddressFilterFields
    }
}

export default AdminOrderFilterFields