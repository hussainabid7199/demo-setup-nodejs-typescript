import { Request, Response } from 'express';
import UserRoleSchema from '../schema/RoleSchema';
import response from '../helper/CustomResponse';

const handleAllUserRole = async (req: Request, res: Response): Promise<void> => {
  try {
    const allRole = await UserRoleSchema.find();
    !allRole ? response(res, 400, "json", allRole) : response(res, 200, "json", allRole);
  } catch (error: string | any) {
    res.status(500).send("Error retrieving all roles: " + error.message);
  }
};

const handleGetUserRoleById = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await UserRoleSchema.findById(req.params.id);
    !user ? res.status(404).send("No role with that id!") : res.json(user);
  } catch (error: string | any) {
    res.status(500).send("Error retrieving role by id: " + error.message);
  }
};

const handleUpdateUserRoleById = async (req: Request, res: Response): Promise<void> => {
  try {
    await UserRoleSchema.findByIdAndUpdate(req.params.id, {
      message: "Updated",
    });
    res.json({ status: "Success" });
  } catch (error: string | any) {
    res.status(500).send("Error updating role by id: " + error.message);
  }
};

const handleDeleteUserRoleById = async (req: Request, res: Response): Promise<void> => {
  try {
    await UserRoleSchema.findByIdAndDelete(req.params.id);
    res.json({ status: "Deleted!" });
  } catch (error: string | any) {
    res.status(500).send("Error deleting role by id: " + error.message);
  }
};

const handleCreateNewUserRole = async (req: Request, res: Response): Promise<void> => {
  try {
    const newUserRole = new UserRoleSchema(req.body);
    if (!newUserRole || !newUserRole.roleName) {
      res.status(400).send("All Fields Required");
    } else {
      const validRoles: string[] = ['SuperAdmin', 'Administrator', 'Teacher', 'Student', 'Admin', 'Parent', 'Transport', 'Canteen', 'Staff', 'Account'];
      const validatedRole: boolean = validRoles.includes(newUserRole.roleName);

      if (!validatedRole) {
        res.status(422).json({ message: "Invalid Role Type!" });
      } else {
        const roleExist = await UserRoleSchema.findOne({ roleName: newUserRole.roleName });
        if (roleExist) {
          res.status(422).json({ message: "Role Already Exists!" });
        } else {
          const saveRole = await new UserRoleSchema({ roleName: newUserRole.roleName }).save();
          !saveRole ? response(res, 400, "json", saveRole) : response(res, 200, "send", saveRole);
        }
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

export {
  handleAllUserRole,
  handleGetUserRoleById,
  handleUpdateUserRoleById,
  handleDeleteUserRoleById,
  handleCreateNewUserRole
};