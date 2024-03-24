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
const mongoose_1 = __importStar(require("mongoose"));
const StudentSchema = new mongoose_1.Schema({
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
    previousSchool: { type: String },
    standardOfAdmission: { type: String, required: true },
    fatherName: { type: String },
    motherName: { type: String },
    transferCertificate: { type: String, required: false }, // assuming FileSystem is a string path to a file
    profilePicture: { type: String, required: false }, // assuming FileSystem is a string path to a file
    birthCertificate: { type: String, required: false }, // assuming FileSystem is a string path to a file
    admissionNo: { type: Number, required: true, default: 100, min: 100 },
    createdAt: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true },
    updatedAt: { type: Date, default: Date.now },
});
exports.default = mongoose_1.default.model('Student', StudentSchema);
