import api from "../http/index";
import {ICoin} from "../types/coin-type"

export default class CoinService {
  async getAll(): Promise<Array<ICoin>> {
    const localCoins = JSON.parse(localStorage.getItem("coins") || "[]")
    if (localCoins.length > 0) return localCoins
    const {data: {coins}} = await api.get(`/coin/all`)
    localStorage.setItem("coins", JSON.stringify(coins))
    return coins
  }
  getById(id: number): ICoin {
    const coins = JSON.parse(localStorage.getItem("coins") || "[]")
    return coins.find((coin: ICoin) => coin.id === id)
  }
  async getByCollectionId(id: number): Promise<Array<ICoin>> {
    const {data: {coins}} = await api.get(`/collection/${id}/coin/all`)
    return coins
  }
}

