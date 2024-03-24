"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AsyncHandler_1 = __importDefault(require("../middleware/AsyncHandler"));
const studentController_1 = require("../controller/studentController");
const StudentRouter = (0, express_1.Router)();
StudentRouter.post("/", (0, AsyncHandler_1.default)(studentController_1.handleCreateNewStudent));
StudentRouter.get("/", (0, AsyncHandler_1.default)(studentController_1.handleAllStudent));
StudentRouter.get("/:id", (0, AsyncHandler_1.default)(studentController_1.handleGetStudentById));
exports.default = StudentRouter;
