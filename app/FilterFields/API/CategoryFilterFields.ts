import { CherryPick } from "@ioc:Adonis/Lucid/Orm";

const CategoryFilterFields: CherryPick = {
    fields: {
        pick: ['id', 'name'],
    },
    relations: {
        'childrenCategory': {
            fields: {
                pick: ['id', 'name', 'parent_category_id']
            }
        }
    }
}


export default CategoryFilterFields