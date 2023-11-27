import { CherryPick } from "@ioc:Adonis/Lucid/Orm";

const VoucherFilterFields: CherryPick = {
    fields: {
        omit: [
            'user_id',
            'user_level_id',
            'created_at',
            'updated_at',
        ]
    }
}

export default VoucherFilterFields