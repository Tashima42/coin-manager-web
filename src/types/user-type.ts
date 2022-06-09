import {ICollection} from "./collection-type"

export interface IUser {
  id: number;
  name: string;
  username: string;
  collections: ICollection[];
}
