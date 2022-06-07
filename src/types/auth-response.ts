import {IUser} from "./user-type";

export interface AuthResponse{
    authorizationToken: string;
    user: IUser;
}
