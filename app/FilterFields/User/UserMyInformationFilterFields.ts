import { CherryPick } from "@ioc:Adonis/Lucid/Orm";
import UserProfileFilterFields from "./UserProfileFilterFields";

const UserMyInformationFilterFields: CherryPick = {
    relations: {
        profile: UserProfileFilterFields
    }
}

export default UserMyInformationFilterFields