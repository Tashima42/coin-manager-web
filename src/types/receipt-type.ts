import {ITransaction} from "./transaction-type"
export interface IReceipt{
    id: number;
    generationDate: Date;
    transaction: ITransaction;
}
