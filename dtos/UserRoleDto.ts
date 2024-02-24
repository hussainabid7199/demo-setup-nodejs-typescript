import{ Schema} from "mongoose";

export default interface UserRoleDto {
    roleId: Schema.Types.ObjectId;
    roleName: string;
    createdAt: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}