import {ICoin} from "./coin-type"

export interface IListing {
  id: number;
  askingPrice: string;
  name: string;
  description: string;
  enabled: boolean;
  trade: boolean;
  listedCoin: ICoin | null;
  tradedCoin: ICoin;
}
