import axios from "axios";
import {AuthorizationResponseType, RegistrationResponseType} from "./entity-auth";

const instance = axios.create({
    baseURL: "https://neko-cafe-back.herokuapp.com/"
    // withCredentials: true,
    // headers: {"API-KEY": "940ee24d-307d-409e-8b94-7cd953dfb4c0"}
});

export const authAPI = {
    register(email: string, password: string) {
        return instance.post<RegistrationResponseType>(`auth/register`, {email, password})
            .then(response => response.data)
    },
    login(email: string, password: string, rememberMe: boolean) {
        return instance.post<AuthorizationResponseType>(`auth/login`, {email, password, rememberMe})
            .then(response => response.data)
    }
    // getMe(token:string) {
    //     return instance.post<ResponseType>(`auth/me`, {token})
    //         .then(response => response.data)
    // }
};