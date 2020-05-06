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
}

export type ForgotResponseType = {
    success: boolean
}

const instance = axios.create({
    baseURL: "https://neko-cafe-back.herokuapp.com/"
});

export const authAPI = {
    registration(email: string, password: string) {
        return instance.post<RegistrationResponseType>(`auth/register`, {email, password})
            .then(response => {
                debugger
                return response.data
            })
    },
    login(email: string, password: string, rememberMe: boolean) {
        return instance.post<AuthorizationResponseType>(`auth/login`, {email, password, rememberMe})
            .then(response => {
                debugger
                return response.data
            })
    },
    forgot(email: string){
        return instance.post<ForgotResponseType>(`auth/forgot`, {email})
            .then(response => {
                debugger
                return response.data.success
            })
    }
    // getMe(token:string) {
    //     return instance.post<ResponseType>(`auth/me`, {token})
    //         .then(response => response.data)
    // }
};