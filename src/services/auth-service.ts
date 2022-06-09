import {AxiosResponse} from "axios";
import {AuthResponse} from "../types/auth-response";
import api from "../http/index";

export default class AuthService {
  static async login(username: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    return api.post<AuthResponse>('/user/authenticate', {username, password})
  }

  static async registration(name: string, username: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    return api.post<AuthResponse>('/user/register', {name, username, password})
  }
}
