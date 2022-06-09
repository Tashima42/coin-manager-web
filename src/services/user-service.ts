import api from "../http/index";

export default class UserService {

  async login(username: string, password: string): Promise<Boolean> {
    try {
      const {data: {token}} = await api.post("/user/authenticate", {username, password})
      localStorage.setItem("token", token)
      return true
    } catch (error) {
      return false
    }
  }

  async userProfile(): Promise<void> {
    return api.get('/user')
  }

  static getUserProfile = () => {
  }
}
