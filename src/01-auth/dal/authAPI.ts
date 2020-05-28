import axios from "axios";
import {
    AuthorizationResponseType,
    ChangeUserDataResponseType,
    RegistrationResponseType,
    SuccessResponseType
} from "./entities-authAPI";

const instance = axios.create({
    baseURL: "https://cards-nya-back.herokuapp.com/1.0/"
});

export const authAPI = {
    registration(email: string, password: string) {
        return instance.post<RegistrationResponseType>(`auth/register`, {email, password})
            .then(response => response.data)
    },
    login(email: string, password: string, rememberMe: boolean) {
        return instance.post<AuthorizationResponseType>(`auth/login`, {email, password, rememberMe})
            .then(response => {
                // debugger
                return response.data
            })
    },
    forgotPassword(email: string) {
        return instance.post<SuccessResponseType>(`auth/forgot`,
            {email, html1: '<a href="http://localhost:3000/newPassword/'})
            .then(response => response.data.success)
    },
    setNewPassword(resetPasswordToken: string, password: string) {
        return instance.post<SuccessResponseType>(`auth/set-new-password`, {resetPasswordToken, password})
            .then(response => response.data.success)
    },
    getMe(token: string) {
        return instance.post<AuthorizationResponseType>(`auth/me`, {token})
            .then(response => {
                // debugger
                return response.data
            })
    },
    changeMe(token: string, name: string, avatar: string | null) {
        debugger
        return instance.put<ChangeUserDataResponseType>(`auth/me`, {token, name, avatar})
            .then(response => {
                // debugger
                return response.data
            })
    }
};