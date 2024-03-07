export default interface UserModel {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: number;
    password: string;
    confirmPassword: string;
    role: string;
    isActive?: boolean;
}