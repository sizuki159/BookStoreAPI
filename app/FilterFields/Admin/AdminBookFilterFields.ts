import { CherryPick } from "@ioc:Adonis/Lucid/Orm";

const AdminBookFilterFields: CherryPick = {
    fields: {
        pick: ['id', 'name', 'price', 'quantity', 'desc', 'weight', 'number_of_pages', 'publishing_year']
    },
    relations: {
        'ccategory': {
            fields: {
                pick: ['name']
            }
        },
        'author': {
            fields: {
                pick: ['author_name']
            }
        },
        'book_form': {
            fields: {
                pick: ['name']
            }
        },
        'language': {
            fields: {
                pick: ['language_name']
            }
        },
        'publisher': {
            fields: {
                pick: ['name']
            }
        },
        'images': {
            
        }
    }
}

export default AdminBookFilterFields