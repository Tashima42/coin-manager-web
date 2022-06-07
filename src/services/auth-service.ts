import {AxiosResponse} from "axios";
import {AuthResponse} from "../types/auth-response";
import api from "../http/index";
import {AppDispatch} from "../store";
import {setError, setIsAuth, setIsLoading, setUser} from "../store/reducers/auth/action-creators";

export default class AuthService{
    static async login(username: string, password: string): Promise<AxiosResponse<AuthResponse>>{
        return api.post<AuthResponse>('/user/authenticate', {username, password})
    }

    static async registration(username: string, password: string): Promise<AxiosResponse<AuthResponse>>{
        return api.post<AuthResponse>('/auth/register', {username, password})
    }
    static async logout(): Promise<void>{
        return api.delete('/auth/logout')
    }

    static authorizeUser = (dispatch: AppDispatch, response: any) => {
        localStorage.setItem('token', response.data.authorizationToken)
        dispatch(setIsAuth(true))
        dispatch(setUser(response.data.user))
        dispatch(setIsLoading(false))
        dispatch(setError(''))
    }

    static catchAuthorizationError = (dispatch: AppDispatch, e: any) => {
        if(e.response){
            if(Array.isArray(e.response.data.message)){
                dispatch(setError(e.response.data.message[0]))
            }else{
                dispatch(setError(e.response.data.message))
            }
            dispatch(setIsLoading(false))
        }
    }
}
