import { CherryPick } from "@ioc:Adonis/Lucid/Orm";
import UserProfileFilterFields from "../User/UserProfileFilterFields";

const BookCommentAPIFilterFields: CherryPick = {
    fields: {
        pick: [
            'id',
            'rate_star',
            'content',
            'created_at',
            'updated_at',
        ]
    },
    relations: {
        'user': {
            fields: {
                pick: [
                    'id',
                    'email',
                ]
            },
            relations: {
                'profile': UserProfileFilterFields
            }
        }
    }
}

export default BookCommentAPIFilterFields