import {AxiosResponse} from "axios";
import api from "../http/index";

export default class UserService {
  static async userProfile(): Promise<AxiosResponse> {
    return api.get('/user')
  }

  static getUserProfile = () => {
  }
}
