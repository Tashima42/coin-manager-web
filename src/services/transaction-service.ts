import api from "../http/index";
import {ITransaction} from "../types/transaction-type";

export default class TransactionService {
  async getAll(): Promise<ITransaction[]> {
    const {data: {transactions}} = await api.get(`/transaction/all`)
    return transactions
  }
  async create(listing_id: number, payment_method?: string, traded_coin_id?: number): Promise<void> {
    const {data: {success}} = await api.post(`/transaction/create`, {listing_id, payment_method, traded_coin_id})
  }
  async getByListingId(listing_id: number): Promise<ITransaction> {
    const {data: {transaction}} = await api.get(`/transaction/listing/${listing_id}`)
    return transaction
  }
}
