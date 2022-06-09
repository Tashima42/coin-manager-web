import {IUser} from "../../../types/user-type";
import {AuthActionsEnum, SetError, SetIsAuth, SetIsLoading, SetIsSuccess, SetUserAction} from "./types";
import {AppDispatch} from "../../index";
import AuthService from "../../../services/auth-service";
import UserService from "../../../services/user-service"; 

export const setUser = (user: IUser): SetUserAction => {
  return {type: AuthActionsEnum.SET_USER, payload: user}
}

export const setIsSuccess = (isSuccess: 'default' | 'success'): SetIsSuccess => {
  return {type: AuthActionsEnum.SET_IS_SUCCESS, payload: isSuccess}
}

export const setError = (error: string): SetError => {
  return {type: AuthActionsEnum.SET_ERROR, payload: error}
}

export const setIsAuth = (auth: boolean): SetIsAuth => {
  return {type: AuthActionsEnum.SET_IS_AUTH, payload: auth}
}

export const setIsLoading = (isLoading: boolean): SetIsLoading => {
  return {type: AuthActionsEnum.SET_IS_LOADING, payload: isLoading}
}


export const login = (username: string, password: string) => async (dispatch: AppDispatch) => {
  dispatch(setIsLoading(true))
  try {

    const loginResponse = await AuthService.login(username, password);
    AuthService.authorizeUser(dispatch, loginResponse)

    const userResponse = await UserService.userProfile()
    UserService.getUserProfile(dispatch, userResponse)
  } catch (e: any) {
    AuthService.catchAuthorizationError(dispatch, e)
  }
}

export const registration = (name: string, username: string, password: string) => async (dispatch: AppDispatch) => {
  dispatch(setIsLoading(true))
  try {
    const response = await AuthService.registration(name, username, password)
    AuthService.authorizeUser(dispatch, response)
  } catch (e: any) {
    AuthService.catchAuthorizationError(dispatch, e)
  }
}
