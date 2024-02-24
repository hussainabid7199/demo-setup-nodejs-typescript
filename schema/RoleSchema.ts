import mongoose, { Schema} from "mongoose";
import UserRoleModel from "../dtos/UserRoleDto";

const RoleSchema: Schema = new Schema({
  roleId: { type: Schema.Types.ObjectId, index: true, required: true, auto: true },
  roleName: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
  deletedAt: { type: Date }
});

const UserRoleSchema = mongoose.model<UserRoleModel>("role", RoleSchema);
export default UserRoleSchema;