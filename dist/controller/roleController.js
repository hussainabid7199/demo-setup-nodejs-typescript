"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleCreateNewUserRole = exports.handleDeleteUserRoleById = exports.handleUpdateUserRoleById = exports.handleGetUserRoleById = exports.handleAllUserRole = void 0;
const RoleSchema_1 = __importDefault(require("../schema/RoleSchema"));
const CustomResponse_1 = __importDefault(require("../helper/CustomResponse"));
const handleAllUserRole = async (req, res) => {
    try {
        const allRole = await RoleSchema_1.default.find();
        !allRole ? (0, CustomResponse_1.default)(res, 400, "json", allRole) : (0, CustomResponse_1.default)(res, 200, "json", allRole);
    }
    catch (error) {
        res.status(500).send("Error retrieving all roles: " + error.message);
    }
};
exports.handleAllUserRole = handleAllUserRole;
const handleGetUserRoleById = async (req, res) => {
    try {
        const user = await RoleSchema_1.default.findById(req.params.id);
        !user ? res.status(404).send("No role with that id!") : res.json(user);
    }
    catch (error) {
        res.status(500).send("Error retrieving role by id: " + error.message);
    }
};
exports.handleGetUserRoleById = handleGetUserRoleById;
const handleUpdateUserRoleById = async (req, res) => {
    try {
        await RoleSchema_1.default.findByIdAndUpdate(req.params.id, {
            message: "Updated",
        });
        res.json({ status: "Success" });
    }
    catch (error) {
        res.status(500).send("Error updating role by id: " + error.message);
    }
};
exports.handleUpdateUserRoleById = handleUpdateUserRoleById;
const handleDeleteUserRoleById = async (req, res) => {
    try {
        await RoleSchema_1.default.findByIdAndDelete(req.params.id);
        res.json({ status: "Deleted!" });
    }
    catch (error) {
        res.status(500).send("Error deleting role by id: " + error.message);
    }
};
exports.handleDeleteUserRoleById = handleDeleteUserRoleById;
const handleCreateNewUserRole = async (req, res) => {
    try {
        const newUserRole = new RoleSchema_1.default(req.body);
        if (!newUserRole || !newUserRole.roleName) {
            res.status(400).send("All Fields Required");
        }
        else {
            const validRoles = ['SuperAdmin', 'Administrator', 'Teacher', 'Student', 'Admin', 'Parent', 'Transport', 'Canteen', 'Staff', 'Account'];
            const validatedRole = validRoles.includes(newUserRole.roleName);
            if (!validatedRole) {
                res.status(422).json({ message: "Invalid Role Type!" });
            }
            else {
                const roleExist = await RoleSchema_1.default.findOne({ roleName: newUserRole.roleName });
                if (roleExist) {
                    res.status(422).json({ message: "Role Already Exists!" });
                }
                else {
                    const saveRole = await new RoleSchema_1.default({ roleName: newUserRole.roleName }).save();
                    !saveRole ? (0, CustomResponse_1.default)(res, 400, "json", saveRole) : (0, CustomResponse_1.default)(res, 200, "send", saveRole);
                }
            }
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};
exports.handleCreateNewUserRole = handleCreateNewUserRole;
