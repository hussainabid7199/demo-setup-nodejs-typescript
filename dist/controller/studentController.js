"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleCreateNewStudent = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const StudentSchema_1 = __importDefault(require("../schema/StudentSchema"));
const RoleSchema_1 = __importDefault(require("../schema/RoleSchema"));
const studentValidation_1 = __importDefault(require("../validation/studentValidation"));
const handleCreateNewStudent = async (req, res) => {
    try {
        const studentData = studentValidation_1.default.validateSync(req.body);
        console.log({ studentData });
        const newStudent = new StudentSchema_1.default(studentData);
        if (!newStudent ||
            !newStudent.firstName ||
            !newStudent.lastName ||
            !newStudent.username ||
            !newStudent.email ||
            !newStudent.gender ||
            !newStudent.phone ||
            !newStudent.password ||
            !newStudent.confirmPassword ||
            !newStudent.isActive) {
            "All Fields Required";
        }
        else {
            const studentExist = await StudentSchema_1.default.findOne({ email: newStudent.email });
            if (studentExist) {
                res.status(422).json({ message: "Already register" });
            }
            else {
                const userRole = await RoleSchema_1.default.findOne({ roleName: newStudent.role });
                const encryptPassword = bcrypt_1.default.hashSync(newStudent.password, 12);
                newStudent.password = encryptPassword;
                const encryptConfirmPassword = bcrypt_1.default.hashSync(newStudent.confirmPassword, 12);
                newStudent.confirmPassword = encryptConfirmPassword;
                if (userRole) {
                    newStudent.role = userRole.roleId.toString();
                }
            }
            const saveUser = await newStudent.save();
            res.status(201).json(saveUser);
            return;
        }
    }
    finally {
    }
};
exports.handleCreateNewStudent = handleCreateNewStudent;
try { }
catch (e) {
    console.log({ "error": e });
    res.status(500).send({ "message": e });
}
