import mongoose, { Schema, Document } from 'mongoose';
import StudentModel from '../models/studentModel';

const StudentSchema: Schema = new Schema({
  userId: { type: String, required: true },
  roleId: { type: String, required: true },
  username: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  gender: { type: String, required: true },
  phone: { type: Number, required: true },
  password: { type: String, required: true },
  confirmPassword: { type: String, required: true },
  bloodGroup: { type: String },
  previousSchool: { type: String},
  standardOfAdmission: { type: String, required: true },
  fatherName: { type: String },
  motherName: { type: String},
  transferCertificate: { type: String, required: false }, // assuming FileSystem is a string path to a file
  profilePicture: { type: String, required: false }, // assuming FileSystem is a string path to a file
  birthCertificate: { type: String, required: false }, // assuming FileSystem is a string path to a file
  admissionNo: { type: Number, required: true, default: 100, min: 100 },
  createdAt: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true },
  updatedAt: { type: Date, default: Date.now },
});


export default mongoose.model<StudentModel>('Student', StudentSchema);