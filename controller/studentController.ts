import bcrypt from "bcrypt";
import Student from "../schema/StudentSchema";
import { Request, Response } from "express";
import { loginAccessToken, refreshAccessToken } from "../middleware/jwt.helper";
import UserRoleSchema from "../schema/RoleSchema";
import studentValidation from "../validation/studentValidation";
import User from "../schema/UserSchema";
import response from "../helper/CustomResponse";


const handleAllStudent = async (req: Request, res: Response): Promise<void> => {
  try {
    const allStudent = await Student.find();
    !allStudent ? response(res, 400, "json", allStudent) : response(res, 200, "json", allStudent);
  } catch (error: string | any) {
    res.status(500).send("Error retrieving all roles: " + error.message);
  }
};


const handleGetStudentById = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await Student.findById(req.params.id);
    !user ? res.status(404).send("No student found!") : res.json(user);
  } catch (error: string | any) {
    res.status(500).send("Error retrieving student! " + error.message);
  }
};

const handleCreateNewStudent = async (req: Request, res: Response) => {
  try {
    const studentData = studentValidation.validateSync(req.body);
    const user = await User.findOne({ email: studentData.email });
    const newStudent = new Student(studentData);
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
    } else {
      res.send("Please sign up first.");
      return;
    }
    const verifyRole = await UserRoleSchema.findOne({
      roleId: newStudent.roleId,
    });
    if (verifyRole?.roleName === "Student") {
      if (!newStudent.userId || !newStudent.roleId || !newStudent.email) {
        return "Invalid User Data";
      } else {
        const saveStudent = await newStudent.save();
        res.status(201).json(saveStudent);
        return;
      }
    }else{
      return  res.send('You are not authorized to create a student account.');
    }
  } catch (e) {
    console.log({ error: e });
    res.status(500).send({ message: e });
  }
};

export { handleCreateNewStudent, handleGetStudentById, handleAllStudent };
