import {AppStateType, InferActionTypes} from "../main/bll/store";
import {ThunkAction} from "redux-thunk";
import {requestStatusesActions} from "../01-auth/bll/request-statuses-reducer";
import {DEV_VERSION} from "../config";
// import {ChatType} from "./entities-chat-bll";
import {chatAPI} from "./chatAPI";
import {getCookie, setTokenInCookie} from "../01-auth/bll/cookies";
import {MessageType} from "./entities-chatAPI";
import {reset} from "redux-form";

type ChatType = {
    messages: Array<MessageType> | null
}

let initialState: ChatType = {
    messages: null
};

const chatReducer = (state = initialState, action: ActionsTypes): ChatType => {
    switch (action.type) {
        case "chat-reducer/SET_CHAT_MESSAGES":
            return {
                ...state,
                messages: action.messages
            };
        default:
            return state;
    }
};

const actions = {
    setChatMessages: (messages: Array<MessageType>) =>
        ({type: "chat-reducer/SET_CHAT_MESSAGES", messages} as const)
}
type ActionsTypes = InferActionTypes<typeof actions>

export const getMessages = (): ThunkAction<void, AppStateType, unknown, ActionsTypes> =>
    async (dispatch: any) => {
// debugger
        DEV_VERSION && console.log('CALL chat-reducer -> getMessages');
        try {
            const token: string | null = getCookie('token')
            DEV_VERSION && console.log(`    token from cookie: ${token}`)
            if (token !== null) {
                dispatch(requestStatusesActions.setLoading(true));
                const response = await chatAPI.getMessage(token);
                DEV_VERSION && console.log('    response chatAPI.getMessage:')
                DEV_VERSION && console.log(response)
                setTokenInCookie(response.token, response.tokenDeathTime)
                dispatch(requestStatusesActions.setLoading(false))
                dispatch(actions.setChatMessages(response.generalChatMessages));
            }
        } catch (error) {
            dispatch(requestStatusesActions.setLoading(false));
            DEV_VERSION && console.log('    response chatAPI.getMessage:')
            DEV_VERSION && console.log(error.response.data.error)
        }
    }


export const sendMessage = (message: string): ThunkAction<void, AppStateType, unknown, ActionsTypes> =>
    async (dispatch: any) => {
        debugger
        DEV_VERSION && console.log('CALL chat-reducer -> sendMessage');
        try {
            const token: string | null = getCookie('token')
            DEV_VERSION && console.log(`    token from cookie: ${token}`)
            if (token !== null) {
                dispatch(requestStatusesActions.setLoading(true));
                const responseMessage = await chatAPI.sendMessage(token, message);
                DEV_VERSION && console.log('    response chatAPI.sendMessage:')
                DEV_VERSION && console.log(responseMessage)

                dispatch(reset('createMessage'));

                const responseAllMessages = await chatAPI.getMessage(responseMessage.token);
                DEV_VERSION && console.log('    response chatAPI.getMessage:')
                DEV_VERSION && console.log(responseAllMessages)
                setTokenInCookie(responseAllMessages.token, responseAllMessages.tokenDeathTime)
                dispatch(requestStatusesActions.setLoading(false))
                dispatch(actions.setChatMessages(responseAllMessages.generalChatMessages));
            }
        } catch (error) {
            dispatch(requestStatusesActions.setLoading(false));
            DEV_VERSION && console.log('    response chatAPI.sendMessage:')
            DEV_VERSION && console.log(error.response.data.error)
        }
    }

export default chatReducer;