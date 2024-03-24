"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connectDatabase = async (connectionString) => {
    await mongoose_1.default.connect(connectionString)
        .then(() => console.log("MongoDB Connected..."))
        .catch((err) => console.log(err));
};
exports.default = connectDatabase;
