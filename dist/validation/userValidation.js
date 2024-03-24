"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Yup = __importStar(require("yup"));
const userValidation = Yup.object({
    username: Yup.string().required("Username is required!").max(50, "Username must be less than 50 characters"),
    firstName: Yup.string().required("First name is required!").max(50, "First Name must be less than 50 characters long"),
    lastName: Yup.string().required("Last name is required!").max(50, "Last Name must be less than 50 characters long"),
    email: Yup.string().email().required("Email is required!"),
    phone: Yup.number().required("Phone  number is required!").min(10, 'Please enter a valid Phone Number'),
    password: Yup.string().required(),
    confirmPassword: Yup.string().required(),
    role: Yup.string()
        .oneOf(['SuperAdmin', 'Administrator', "Teacher", 'Student', 'Admin', 'Parent', 'Transport', 'Canteen', 'Staff', 'Account'], 'Invalid user type!').required("User role is required!"),
    isActive: Yup.boolean().default(true)
}).required();
exports.default = userValidation;
