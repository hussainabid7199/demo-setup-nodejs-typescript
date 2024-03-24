"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleAllStudent = exports.handleGetStudentById = exports.handleCreateNewStudent = void 0;
const StudentSchema_1 = __importDefault(require("../schema/StudentSchema"));
const RoleSchema_1 = __importDefault(require("../schema/RoleSchema"));
const studentValidation_1 = __importDefault(require("../validation/studentValidation"));
const UserSchema_1 = __importDefault(require("../schema/UserSchema"));
const CustomResponse_1 = __importDefault(require("../helper/CustomResponse"));
const handleAllStudent = async (req, res) => {
    try {
        const allStudent = await StudentSchema_1.default.find();
        !allStudent ? (0, CustomResponse_1.default)(res, 400, "json", allStudent) : (0, CustomResponse_1.default)(res, 200, "json", allStudent);
    }
    catch (error) {
        throw res.status(500).send("Error retrieving all roles: " + error.message);
    }
};
exports.handleAllStudent = handleAllStudent;
const handleGetStudentById = async (req, res) => {
    try {
        const user = await StudentSchema_1.default.findById(req.params.id);
        !user ? res.status(404).send("No student found!") : res.json(user);
    }
    catch (error) {
        throw res.status(500).send("Error retrieving student! " + error.message);
    }
};
exports.handleGetStudentById = handleGetStudentById;
const handleCreateNewStudent = async (req, res) => {
    try {
        const studentData = studentValidation_1.default.validateSync(req.body);
        const user = await UserSchema_1.default.findOne({ email: studentData.email });
        const newStudent = new StudentSchema_1.default(studentData);
        if (user) {
            (newStudent.firstName = user.firstName),
                (newStudent.lastName = user.lastName),
                (newStudent.email = user.email),
                (newStudent.password = user.password),
                (newStudent.confirmPassword = user.confirmPassword),
                (newStudent.roleId = user.role),
                (newStudent.userId = user.id),
                (newStudent.username = user.username),
                (newStudent.gender = user.gender),
                (newStudent.phone = user.phone);
        }
        else {
            res.send("Please sign up first.");
            return;
        }
        const verifyRole = await RoleSchema_1.default.findOne({
            roleId: newStudent.roleId,
        });
        if (verifyRole?.roleName === "Student") {
            if (!newStudent.userId || !newStudent.roleId || !newStudent.email) {
                return "Invalid User Data";
            }
            else {
                const saveStudent = await newStudent.save();
                res.status(201).json(saveStudent);
                return;
            }
        }
        else {
            return res.send('You are not authorized to create a student account.');
        }
    }
    catch (e) {
        console.log({ error: e });
        throw res.status(500).send({ message: e });
    }
};
exports.handleCreateNewStudent = handleCreateNewStudent;
