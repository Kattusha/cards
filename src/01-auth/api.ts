import axios from "axios";

type RegistrationResponseType = {
    addedUser: {
        email: string
        isAdmin: boolean
    },
    success: boolean
}

export type AuthorizationResponseType = {
    email: string
    name: string
    isAdmin: boolean
    rememberMe: boolean
    token: string
    tokenDeathTime: number
    success: boolean
    _id: string
}

export type SuccessResponseType = {
    success: boolean
}

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
            .then(response => response.data)
    },
    forgotPassword(email: string){
        return instance.post<SuccessResponseType>(`auth/forgot`,
            {email, html1: '<a href="http://localhost:3000/newPassword/'})
            .then(response => response.data.success)
    },
    setNewPassword(resetPasswordToken: string, password: string){
        return instance.post<SuccessResponseType>(`auth/set-new-password`, {resetPasswordToken, password})
            .then(response => response.data.success)
    },
    getMe(token:string) {
        return instance.post<AuthorizationResponseType>(`auth/me`, {token})
            .then(response => response.data)
    }
};