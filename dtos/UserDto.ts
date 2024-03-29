
export default interface UserDto {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    gender: string;
    phone: number;
    password: string;
    confirmPassword: string;
    token?: string;
    role?: string;
    createdAt: Date;
    isActive?: boolean;
    updatedAt?: Date;
    deletedAt?: Date;
  }