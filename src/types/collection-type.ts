import {ICoin} from "./coin-type"
import {IUser} from "./user-type"

export interface ICollection{
    id: number;
    name: string;
    description: string;
    coins: ICoin[];
    user: IUser;
}
