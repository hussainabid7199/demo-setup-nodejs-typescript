export default interface StudentDto {
    userId: string;
    roleId: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    gender: string;
    phone: number;
    password: string;
    confirmPassword: string;
    bloodGroup: string;
    previousSchool: string;
    standardOfAdmission: string;
    fatherName: string;
    motherName: string;
    transferCertificate: string;
    profilePicture: string;
    birthCertificate: string;
    admissionNo: number;
    createdAt: Date;
    isActive?: boolean;
    updatedAt?: Date;
}