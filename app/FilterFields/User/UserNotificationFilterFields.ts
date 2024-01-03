import { CherryPick } from "@ioc:Adonis/Lucid/Orm";

const UserNotificationFilterFields: CherryPick = {
    fields: {
        pick: [
            'id',
            'title',
            'message',
            'is_read',
            'created_at',
        ]
    }
}

export default UserNotificationFilterFields