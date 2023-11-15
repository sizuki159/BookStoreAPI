import { CherryPick } from "@ioc:Adonis/Lucid/Orm";
import BookFilterFields from "../API/BookFilterFields";

const MyOrderFilterFields: CherryPick = {
    fields: {
        pick: ['id', 'product_price', 'fee_price', 'final_price', 'discount_price', 'voucher', 'payment_method', 'status', 'customer_note']
    },
    relations: {
        'items': {
            fields: {
                pick: ['quantity', 'price_per_unit']
            },
            relations: {
                'product': BookFilterFields
            }
        }
    }
}

export default MyOrderFilterFields