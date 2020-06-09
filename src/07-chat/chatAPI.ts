import axios from "axios";
import {MessageResponseType, MessagesResponseType} from "./entities-chatAPI";

const instance = axios.create({
    baseURL: "https://cards-nya-back.herokuapp.com/1.0/"
});

export const chatAPI = {
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