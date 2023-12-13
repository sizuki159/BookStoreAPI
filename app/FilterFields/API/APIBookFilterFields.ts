import { CherryPick } from "@ioc:Adonis/Lucid/Orm";

const APIBookFilterFields: CherryPick = {
    fields: {
        pick: [
            'id',
            'isbn_code',
            'name',
            'slug',
            'price',
            'quantity',
            'desc',
            'weight',
            'number_of_pages',
            'publishing_year',
            'flash_sale_info',
            'comment_info',
        ]
    },
    relations: {
        'ccategory': {
            fields: {
                pick: [
                    'id',
                    'name',
                    'slug',
                    'parent_category_id',
                ]
            }
        },
        'author': {
            fields: {
                pick: [
                    'id',
                    'author_name',
                    'slug',
                ]
            }
        },
        'book_form': {
            fields: {
                pick: [
                    'id',
                    'name',
                    'slug',
                ]
            }
        },
        'language': {
            fields: {
                pick: [
                    'id',
                    'language_name',
                    'slug',
                ]
            }
        },
        'publisher': {
            fields: {
                pick: [
                    'id',
                    'name',
                    'slug',
                ]
            }
        },
        'provider': {
            fields: {
                pick: [
                    'id',
                    'name',
                    'slug',
                ]
            }
        },
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

export default APIBookFilterFields