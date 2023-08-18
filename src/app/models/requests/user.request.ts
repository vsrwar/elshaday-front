import { UserRole } from "../enums/user-role.enum";

export interface UserRequest
{
    email: string;
    nickName: string;
    password: string;
    confirmPassword: string;
    role: UserRole;
}