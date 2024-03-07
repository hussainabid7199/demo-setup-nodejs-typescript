import bcrypt from "bcrypt";
import Student from '../schema/StudentSchema';
import { Request, Response } from "express";
import { loginAccessToken, refreshAccessToken } from "../middleware/jwt.helper";
import UserRoleSchema from "../schema/RoleSchema";
import studentValidation from "../validation/studentValidation";



const handleCreateNewStudent = async(req: Request, res: Response): Promise<void> => {
    try {
        const studentData = studentValidation.validateSync(req.body);
        console.log({studentData});
        const newStudent = new Student(studentData);
        if (
          !newStudent ||
          !newStudent.firstName ||
          !newStudent.lastName ||
          !newStudent.username ||
          !newStudent.email ||
          !newStudent.gender ||
          !newStudent.phone ||
          !newStudent.password ||
          !newStudent.confirmPassword ||
          !newStudent.isActive
        ) {
           "All Fields Required";
        } else {
          const studentExist = await Student.findOne({ email: newStudent.email });
          if (studentExist) {
               res.status(422).json({ message: "Already register" });
          } else{
                const userRole = await UserRoleSchema.findOne({roleName: newStudent.role});
                const encryptPassword  = bcrypt.hashSync(newStudent.password, 12);  
                newStudent.password = encryptPassword;
                const encryptConfirmPassword  = bcrypt.hashSync(newStudent.confirmPassword, 12);  
                newStudent.confirmPassword = encryptConfirmPassword;
                if(userRole){
                  newStudent.role = userRole.roleId.toString();
                }
            }

            const saveUser = await newStudent.save();
            res.status(201).json(saveUser);
            return;
          }
        }
      } catch (e) {
        console.log({"error": e});
        res.status(500).send({"message": e});
      }
}

export {
    handleCreateNewStudent
}