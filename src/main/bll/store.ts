import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from 'redux-thunk';
import {reducer as formReducer} from 'redux-form'
import loginReducer from "../../01-auth/login/login-reducer";
import registrationReducer from "../../01-auth/registration/registration-reducer";
import newPasswordReducer from "../../01-auth/newPassword/newPassword-reducer";
import recoveryPasswordReducer from "../../01-auth/recoveryPassword/recoveryPassword-reducer";
import profileReducer from "../../01-auth/profile/profile-reducer";

const rootReducer = combineReducers({
    login:loginReducer,
    registration: registrationReducer,
    newPassword: newPasswordReducer,
    recoveryPassword: recoveryPasswordReducer,
    profile: profileReducer,
    form: formReducer
});

export type AppStateType = ReturnType<typeof rootReducer>

type PropertiesType<T> = T extends { [key: string]: infer U } ? U : never;
export type InferActionTypes<T extends {[key: string]: (...args:any)=> any}> = ReturnType<PropertiesType<T>>

export default createStore(rootReducer, applyMiddleware(thunk));