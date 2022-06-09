import {ICoin} from "./coin-type"

export interface IListing {
  id: number;
  askingPrice: string;
  name: string;
  description: string;
  listedCoin: ICoin | null;
  tradedCoin?: ICoin;
}
