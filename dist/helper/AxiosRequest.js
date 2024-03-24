"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AxiosRequest = void 0;
const axios_1 = __importDefault(require("axios"));
async function AxiosRequest(config) {
    try {
        const response = await (0, axios_1.default)(config);
        return response.data;
    }
    catch (error) {
        const axiosError = error;
        const errorMessage = axiosError.response?.data.message || 'An error occurred';
        throw new Error(errorMessage);
    }
}
exports.AxiosRequest = AxiosRequest;
