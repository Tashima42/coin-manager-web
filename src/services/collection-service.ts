import api from "../http/index";
import {ICollection} from "../types/collection-type";

export default class CollectionService {
  async userCollections(): Promise<Array<any>> {
    try {
      const {data: {collections}} = await api.get("/user/collection/all")
      return collections
    } catch (error) {
      return [null]
    }
  }
  async getById(id: number): Promise<ICollection> {
    const {data: collection} = await api.get(`/collection/${id}`)
    return collection
  }
}
