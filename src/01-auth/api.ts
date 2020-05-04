import axios from "axios";

type RegistrationResponseType = {
    addedUser: {
        email: string
        isAdmin: boolean
    },
    success: boolean
}

// export type AuthorizationResponseType = {
//     data: {
//         data: AuthType
//     }
//     resultCode: number;
//     messages: Array<string>;
// }

const instance = axios.create({
    baseURL: "https://neko-cafe-back.herokuapp.com/"
});

export const authAPI = {
    registration(email: string, password: string) {
        return instance.post<RegistrationResponseType>(`auth/register`, {email, password})
            .then(response => {
                return response.data
            })
    },
    login(email: string, password: string, rememberMe: boolean) {
        return instance.post<any>(`auth/login`, {email, password, rememberMe})
            .then(response => {
                return response.data
            })
    }
    // getMe(token:string) {
    //     return instance.post<ResponseType>(`auth/me`, {token})
    //         .then(response => response.data)
    // }
};