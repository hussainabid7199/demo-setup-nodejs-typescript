import * as Yup from 'yup';
import StudentModel from '../models/studentModel';

export const studentValidation: Yup.ObjectSchema<StudentModel> = Yup.object({
  userId: Yup.string().required(),
  roleId: Yup.string().required(),
  username: Yup.string().required(),
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  email: Yup.string().email().required(),
  gender: Yup.string().required(),
  phone: Yup.number().positive().integer().required(),
  password: Yup.string(),
  confirmPassword: Yup.string(),
  bloodGroup: Yup.string().required(),
  previousSchool: Yup.string().required(),
  standardOfAdmission: Yup.string().required(),
  fatherName: Yup.string().required(),
  motherName: Yup.string().required(),
  transferCertificate: Yup.string(),
  profilePicture: Yup.string(),
  birthCertificate: Yup.string(),
  admissionNo: Yup.number().positive().integer().required(),
  isActive: Yup.boolean().default(true),
}).required();

export default studentValidation;