import mongoose, { Model, Schema } from "mongoose";
import UserDto from "../dtos/UserDto";



const User: Schema<UserDto> = new Schema({
  username: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  gender: { type: String, required: true },
  phone: { type: Number, required: true },
  password: { type: String, required: true },
  confirmPassword: { type: String, required: true },
  token: { type: String },
  role: { type: String },
  isActive: {type: Boolean},
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
  deletedAt: { type: Date },
});

const UserSchema: Model<UserDto> = mongoose.model<UserDto>("user", User);
export default UserSchema;