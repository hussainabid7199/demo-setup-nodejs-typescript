import * as Yup from "yup";
import UserModel from "../models/userModel";

const userValidation: Yup.ObjectSchema<UserModel> = Yup.object({
    username:  Yup.string().required("Username is required!").max(50, "Username must be less than 50 characters"),
    firstName: Yup.string().required("First name is required!").max(50,"First Name must be less than 50 characters long"),
    lastName: Yup.string().required("Last name is required!").max(50,"Last Name must be less than 50 characters long"),
    email: Yup.string().email().required("Email is required!"),
    phone: Yup.number().required("Phone  number is required!").min(10,  'Please enter a valid Phone Number'),
    password: Yup.string().required(),
    confirmPassword: Yup.string().required(),
    role: Yup.string()
        .oneOf(['SuperAdmin', 'Administrator', "Teacher", 'Student', 'Admin', 'Parent', 'Transport', 'Canteen', 'Staff', 'Account'], 'Invalid user type!').required("User role is required!")
}).required();

export default userValidation;