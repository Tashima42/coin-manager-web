import {ICollection} from "./collection-type"

export interface IUser{
    id: number;
    username: string;
    collections: ICollection[];
}
