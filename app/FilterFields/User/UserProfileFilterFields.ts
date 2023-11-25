import { CherryPick } from "@ioc:Adonis/Lucid/Orm";

const UserProfileFilterFields: CherryPick = {
    fields: {
        pick: ['firstname', 'lastname', 'phone_number', 'gender', 'avatar_source']
    }
}

export default UserProfileFilterFields
