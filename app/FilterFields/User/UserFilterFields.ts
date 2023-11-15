import { CherryPick } from "@ioc:Adonis/Lucid/Orm";

const UserFilterFields: CherryPick = {
    relations: {
        'profile': {
            fields: {
                pick: ['firstname', 'lastname', 'phone_number', 'gender']
            }
        }
    }
}

export default UserFilterFields