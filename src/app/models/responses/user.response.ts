import { UserRole } from "../enums/user-role.enum";

export interface UserRespoonse
{
    id: number;
    email: string;
    nickName: string;
    active: boolean;
    role: UserRole;
}