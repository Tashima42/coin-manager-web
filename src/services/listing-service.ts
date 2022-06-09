import api from "../http/index";
import {IListing} from "../types/listing-type"

export default class ListingService {
  async getAll(): Promise<Array<IListing>> {
    const {data: {listings}} = await api.get(`/listing/all`)
    localStorage.setItem("listings", JSON.stringify(listings))
    return listings
  }
  getById(id: number): IListing {
    const listings = JSON.parse(localStorage.getItem("listings") || "[]")
    return listings.find((listing: IListing) => listing.id === id)
  }
}
