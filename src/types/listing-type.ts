import {IUser} from "./user-type"
import {ICoin} from "./coin-type"

export interface IListing{
    id: number;
    askingPrice: string;
    name: string;
    description: string;
    advertisedCoin: ICoin;
    tradedCoin: ICoin;
    user: IUser;
}
