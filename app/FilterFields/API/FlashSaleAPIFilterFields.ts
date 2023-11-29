import { CherryPick } from "@ioc:Adonis/Lucid/Orm";
import APIBookFilterFields from "./APIBookFilterFields";

const FlashSaleAPIFilterFields: CherryPick = {
    fields: {
        pick: [
            'event_name',
        ]
    },
    relations: {
        'hours': {
            fields: {
                pick: [
                    'percent_discount',
                    'time_start',
                    'time_end',
                ]
            },
            relations: {
                'products': {
                    fields: {
                        pick: [
                            'product_id',
                        ]
                    },
                    relations: {
                        'product_info': APIBookFilterFields
                    }
                }
            }
        }
    }
}

export default FlashSaleAPIFilterFields