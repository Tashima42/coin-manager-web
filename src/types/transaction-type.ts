import {IListing} from "./listing-type"

export interface ITransaction {
  id: number;
  date: Date;
  paymentMethod: string;
  listingId: number
  listing?: IListing;
}
