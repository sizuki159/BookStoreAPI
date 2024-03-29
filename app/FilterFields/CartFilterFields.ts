import { CherryPick } from "@ioc:Adonis/Lucid/Orm";

const CartFilterFields: CherryPick = {
    fields: {
        pick: [
            'id',
            'isbn_code',
            'quantity',
        ]
    },
    relations: {
        'book_info': {
            fields: {
                pick: [
                    'id',
                    'isbn_code',
                    'name',
                    'slug',
                    'price',
                    'quantity',
                    'flash_sale_info'
                ]
            },
            relations: {
                'images': {
                    fields: {
                        pick: [
                            'id',
                            'image_source',
                            'enable',
                            'isbn_code',
                        ]
                    }
                }
            }
        }
    }
}

export default CartFilterFields