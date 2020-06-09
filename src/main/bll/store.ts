import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from 'redux-thunk';
import {reducer as formReducer} from 'redux-form'
import loginReducer from "../../01-auth/bll/login-reducer";
import registrationReducer from "../../01-auth/bll/registration-reducer";
import recoveryPasswordReducer from "../../01-auth/bll/recoveryPassword-reducer";
import cardDecksReducer from "../../02-tables/bll/cardDecksReducer";
import cardsReducer from "../../02-tables/bll/cardsReducer";
import initReducer from "../../01-auth/bll/init-reducer";
import requestStatusesReducer from "../../01-auth/bll/request-statuses-reducer";
import chatReducer from "../../07-chat/chat-reducer";

const rootReducer = combineReducers({
    init: initReducer,
    requestStatus: requestStatusesReducer,
    registration: registrationReducer,
    login:loginReducer,
    recoveryPassword: recoveryPasswordReducer,

    cardDecksReducer: cardDecksReducer,
    cards: cardsReducer,
    chatroom: chatReducer,
    form: formReducer
});

export type AppStateType = ReturnType<typeof rootReducer>

type PropertiesType<T> = T extends { [key: string]: infer U } ? U : never;
export type InferActionTypes<T extends {[key: string]: (...args:any)=> any}> = ReturnType<PropertiesType<T>>

export default createStore(rootReducer, applyMiddleware(thunk));