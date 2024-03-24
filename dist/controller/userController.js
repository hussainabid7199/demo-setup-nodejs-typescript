"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleCreateNewUser = exports.handleDeleteUserById = exports.handleUpdateUserById = exports.handleGetUserById = exports.handleAllUsers = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const UserSchema_1 = __importDefault(require("../schema/UserSchema"));
const RoleSchema_1 = __importDefault(require("../schema/RoleSchema"));
const userValidation_1 = __importDefault(require("../validation/userValidation"));
const handleAllUsers = async (req, res) => {
    const allUser = await UserSchema_1.default.find({});
    const response = res.json(allUser);
    res.send(response.json());
};
exports.handleAllUsers = handleAllUsers;
const handleGetUserById = async (req, res) => {
    let user = await UserSchema_1.default.findById(req.params.id);
    if (!user)
        res.status(404).send("No user with that id!");
    res.send(user).json();
};
exports.handleGetUserById = handleGetUserById;
const handleUpdateUserById = async (req, res) => {
    let user = await UserSchema_1.default.findByIdAndUpdate(req.params.id, userValidation_1.default);
    !user ? res.status(404).send('The user does not exist') :
        res.send(user).json();
};
exports.handleUpdateUserById = handleUpdateUserById;
const handleDeleteUserById = async (req, res) => {
    await UserSchema_1.default.findByIdAndDelete(req.params.id);
    res.json({ stats: "Deleted!" });
};
exports.handleDeleteUserById = handleDeleteUserById;
const handleCreateNewUser = async (req, res) => {
    try {
        const userData = userValidation_1.default.validateSync(req.body);
        console.log({ userData });
        const newUser = new UserSchema_1.default(userData);
        if (!newUser ||
            !newUser.firstName ||
            !newUser.lastName ||
            !newUser.username ||
            !newUser.email ||
            !newUser.gender ||
            !newUser.phone ||
            !newUser.password ||
            !newUser.confirmPassword ||
            !newUser.role ||
            !newUser.isActive) {
            "All Fields Required";
        }
        else {
            const userExist = await UserSchema_1.default.findOne({ email: newUser.email });
            if (userExist) {
                res.status(422).json({ message: "Already register" });
            }
            else {
                if (!newUser.role) {
                    res.status(422).json({ message: "User role required!" });
                }
                else {
                    const userRole = await RoleSchema_1.default.findOne({ roleName: newUser.role });
                    const encryptPassword = bcrypt_1.default.hashSync(newUser.password, 12);
                    newUser.password = encryptPassword;
                    const encryptConfirmPassword = bcrypt_1.default.hashSync(newUser.confirmPassword, 12);
                    newUser.confirmPassword = encryptConfirmPassword;
                    if (userRole) {
                        newUser.role = userRole.roleId.toString();
                    }
                }
                const saveUser = await newUser.save();
                res.status(201).json(saveUser);
                return;
            }
        }
    }
    catch (e) {
        console.log({ "error": e });
        res.status(500).send({ "message": e });
    }
};
exports.handleCreateNewUser = handleCreateNewUser;
