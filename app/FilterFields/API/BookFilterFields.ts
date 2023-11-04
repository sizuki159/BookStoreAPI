import { CherryPick } from "@ioc:Adonis/Lucid/Orm";

const BookFilterFields: CherryPick = {
    fields: {
        pick: ['id', 'isbn_code','name', 'price', 'quantity', 'desc', 'weight', 'number_of_pages', 'publishing_year']
    },
    relations: {
        'ccategory': {
            fields: {
                pick: ['id', 'name', 'parent_category_id']
            }
        },
        'author': {
            fields: {
                pick: ['id' ,'author_name']
            }
        },
        'book_form': {
            fields: {
                pick: ['id', 'name']
            }
        },
        'language': {
            fields: {
                pick: ['id', 'language_name']
            }
        },
        'publisher': {
            fields: {
                pick: ['id', 'name']
            }
        },
        'provider': {
            fields: {
                pick: ['id', 'name']
            }
        },
        'images': {
            fields: {
                pick: ['id', 'image_source', 'enable', 'isbn_code']
            }
        }
    }
}

export default BookFilterFields