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
exports.studentValidation = void 0;
const Yup = __importStar(require("yup"));
exports.studentValidation = Yup.object({
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
exports.default = exports.studentValidation;
