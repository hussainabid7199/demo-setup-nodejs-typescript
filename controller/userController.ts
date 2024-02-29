import bcrypt from "bcrypt";
import User from "../schema/user";
import UserRole from "../schema/role";
import { Request, Response } from "express";
import { loginAccessToken, refreshAccessToken } from "../middleware/jwt.helper";
import AddUserModel from "../models/addUserModel";

const handleAllUsers = async(req: Request, res: Response): Promise<void> => {
    const allUser = await User.find({});
    res.json(allUser);
}

const handleGetUserById = async(req: Request, res: Response): Promise<void> => {
    let user = await User.findById(req.params.id);
    if (!user) return res.status(404).send("No user with that id!");
    res.send(user.json());
}

const handleUpdateUserById = async(req: Request, res: Response): Promise<void> => {
    let user = await User.findByIdAndUpdate(req.params.id, AddUserModel);
    !user ? res.status(404).send('The user does not exist') :  
    res.send(user.json());
}

const handleDeleteUserById = async(req: Request, res: Response): Promise<void> => {
    await User.findByIdAndDelete(req.params.id);
    return res.json({ stats: "Deleted!" });
}

const handleCreateNewUser = async(req: Request, res: Response): Promise<void> => {
    try {
        const userData = AddUserModel.validateSync(req.body);
        console.log({userData});
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
          !newUser.role
        ) {
          return "All Fields Required";
        } else {
          const userExist = await User.findOne({ email: newUser.email });
          if (userExist) {
            return res.status(422).json({ message: "Already register" });
          } else {
            if(!newUser.role){
              return res.status(422).json({ message: "User role required!" });
            }else{
                const userRole = await UserRole.findOne({roleName: newUser.role});
                const encryptPassword  = bcrypt.hashSync(newUser.password, 12);  
                newUser.password = encryptPassword;
                const encryptConfirmPassword  = bcrypt.hashSync(newUser.confirmPassword, 12);  
                newUser.confirmPassword = encryptConfirmPassword;
                if(userRole){
                    newUser.role = userRole.roleId;
                }
            }
            const saveUser = await newUser.save();
            await res.status(201).json(saveUser);
            return;
          }
        }
      } catch (e) {
        console.log({"error": e.errors});
        await res.status(500).send({"message": e.message});
      }
}

export {
    handleAllUsers,
    handleGetUserById,
    handleUpdateUserById,
    handleDeleteUserById,
    handleCreateNewUser
}