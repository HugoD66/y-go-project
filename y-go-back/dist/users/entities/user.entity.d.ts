import { UserRoleEnum } from './types/user.roles.enum';
import { Bar } from "../../bars/entities/bar.entity";
export declare class User {
    id: string;
    name: string;
    email: string;
    password: string;
    picture: string | null;
    role: UserRoleEnum;
    phone: string | null;
    createBars?: Bar[] | null;
}
