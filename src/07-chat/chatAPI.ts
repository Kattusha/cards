import axios from "axios";
import {MessageResponseType, MessagesResponseType, UserResponseType, UsersResponseType} from "./entities-chatAPI";

const instance = axios.create({
    baseURL: "https://cards-nya-back.herokuapp.com/1.0/"
});

export const chatAPI = {
    getUsers(token: string){
        return instance.get<UsersResponseType>(`/social/users?&token=${token}&pageCount=30`,)
            .then(response => {
                // debugger
                return response.data
            })
    },
    getUser(token: string, userId: string){
        return instance.get<UserResponseType>(`/social/user?&token=${token}&id=${userId}`,)
            .then(response => {
                // debugger
                return response.data
            })
    },
    getMessage(token: string) {
        return instance.get<MessagesResponseType>(`/social/general/message?&token=${token}`,)
            .then(response => {
                // debugger
                return response.data
            })
    },
    sendMessage(token: string, message: string) {
        return instance.post<MessageResponseType>(`/social/general/message`, {token, message})
            .then(response => {
                debugger
                return response.data
            })
    }
};