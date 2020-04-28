import axios from "axios";
import {AuthType} from "../entities/entities";

type ResponseType = {
    data: {
        data: AuthType
    }
    resultCode: number;
    messages: Array<string>;
}

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/todo-lists/"
    // withCredentials: true,
    // headers: {"API-KEY": "940ee24d-307d-409e-8b94-7cd953dfb4c0"}
});

export const authAPI = {
    login(email:string, password:string) {
        return instance.post<ResponseType>(`auth/login`, {email, password})
            .then(response => response.data)
    },
    logout() {
        return instance.delete<ResponseType>(`auth/login`)
            .then(response => response.data)
    }
};