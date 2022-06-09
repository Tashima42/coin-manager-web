import {AxiosResponse} from "axios";
import api from "../http/index";
import {AppDispatch} from "../store";
import {setError, setIsLoading, setUser} from "../store/reducers/auth/action-creators";

export default class UserService {
  static async userProfile(): Promise<AxiosResponse> {
    return api.get('/user')
  }

  static getUserProfile = (dispatch: AppDispatch, response: any) => {
    dispatch(setUser(response.data.userProfile))
    dispatch(setIsLoading(false))
    dispatch(setError(''))
  }

  static catchAuthorizationError = (dispatch: AppDispatch, e: any) => {
    if (e.response) {
      if (Array.isArray(e.response.data.message)) {
        dispatch(setError(e.response.data.message[0]))
      } else {
        dispatch(setError(e.response.data.message))
      }
      dispatch(setIsLoading(false))
    }
  }
}
