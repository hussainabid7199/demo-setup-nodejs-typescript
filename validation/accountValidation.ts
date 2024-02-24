import * as Yup from "yup";
import AccountLoginModel from "../models/accountLoginModel";

const accountValidation: Yup.ObjectSchema<AccountLoginModel> = Yup.object({
    email: Yup.string().email().required("Email is required"),
    password: Yup.string().required(),
}).required();

export default accountValidation;