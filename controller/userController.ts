import bcrypt from "bcrypt";
import User from "../schema/UserSchema";
import { Request, Response } from "express";
import { loginAccessToken, refreshAccessToken } from "../middleware/jwt.helper";
import UserRoleSchema from "../schema/RoleSchema";
import AddUserValidation from "../validation/userValidation";
import UserDto from "../dtos/UserDto";

const handleAllUsers = async (req: Request, res: Response) => {
  try {
    const allUsers = await User.find();
    return res.json(allUsers); // Sending JSON response directly
  } catch (e) {
    throw res.status(500).json({ error: e });
  }
};

const handleGetUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    let user = await User.findById(req.params.id);
    if (!user) res.status(404).send("No user with that id!");
    res.send(user).json();
  } catch (e) {
    throw res.status(500).json({ error: e });
  }
};

const handleUpdateUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    let user = await User.findByIdAndUpdate(req.params.id, AddUserValidation);
    !user
      ? res.status(404).send("The user does not exist")
      : res.send(user).json();
  } catch (e) {
    throw res.status(500).json({ error: e });
  }
};

const handleDeleteUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ stats: "Deleted!" });
};

const handleCreateNewUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userData = AddUserValidation.validateSync(req.body);
    console.log({ userData });
    const newUser = new User(userData);
    if (
      !newUser ||
      !newUser.firstName ||
      !newUser.lastName ||
      !newUser.username ||
      !newUser.email ||
      !newUser.gender ||
      !newUser.phone ||
      !newUser.password ||
      !newUser.confirmPassword ||
      !newUser.role ||
      !newUser.isActive
    ) {
      ("All Fields Required");
    } else {
      const userExist = await User.findOne({ email: newUser.email });
      if (userExist) {
        res.status(422).json({ message: "Already register" });
      } else {
        if (!newUser.role) {
          res.status(422).json({ message: "User role required!" });
        } else {
          const userRole = await UserRoleSchema.findOne({
            roleName: newUser.role,
          });
          const encryptPassword = bcrypt.hashSync(newUser.password, 12);
          newUser.password = encryptPassword;
          const encryptConfirmPassword = bcrypt.hashSync(
            newUser.confirmPassword,
            12
          );
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
  } catch (e) {
    console.log({ error: e });
    throw res.status(500).send({ message: e });
  }
};

export {
  handleAllUsers,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateNewUser,
};
