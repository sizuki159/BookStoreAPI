import { CherryPick } from "@ioc:Adonis/Lucid/Orm";
import BookFilterFields from "../API/BookFilterFields";
import UserAddressFilterFields from "../User/UserAddressFilterFields";
import UserFilterFields from "../User/UserFilterFields";

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
                'product': BookFilterFields
            }
        },
        'user': UserFilterFields,
        'userAddress': UserAddressFilterFields
    }
}

export default AdminOrderFilterFields