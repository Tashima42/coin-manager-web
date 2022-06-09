import api from "../http/index";

export default class CollectionService {
  async userCollections(): Promise<Array<any>> {
    try {
      const {data: {collections}} = await api.get("/user/collection/all")
      return collections
    } catch (error) {
      console.log(error)
      return [null]
    }
  }
}
