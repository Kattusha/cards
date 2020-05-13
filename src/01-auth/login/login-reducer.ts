import {AppStateType, InferActionTypes} from "../../main/bll/store";
import {ThunkAction} from "redux-thunk";
import {authAPI} from "../api";
import {stopSubmit} from "redux-form";
import {setCookie, getCookie} from "./cookies";

export type LoginType = {
    email: string | null
    userId: string | null
    isAuthorized: boolean
    isLoading: boolean
}

let initialState: LoginType = {
    email: null,
    userId: null,
    isAuthorized: false,
    isLoading: false
};

type InitialStateType = typeof initialState;

const loginReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case "login-reducer/SET_AUTH_USER_DATA":
            return {
                ...state,
                email: action.email,
                isAuthorized: action.isAuthorized
            };
        case "login-reducer/SET_LOADING":
            return {
                ...state,
                isLoading: action.isLoading
            };
        default:
            return state;
    }
};

const actions = {
    setAuthUserData: (email: string | null, isAuthorized: boolean) => ({
        type: "login-reducer/SET_AUTH_USER_DATA",
        email, isAuthorized
    } as const),
    setLoading: (isLoading: boolean) => ({type: "login-reducer/SET_LOADING", isLoading} as const)
}

type ActionsTypes = InferActionTypes<typeof actions>

//thunks
export const login = (email: string, password: string, rememberMe: boolean):
    ThunkAction<void, AppStateType, unknown, ActionsTypes> =>
    async (dispatch: any) => {
        try {
            dispatch(actions.setLoading(true));
            const response = await authAPI.login(email, password, rememberMe)
            setCookie('token', response.token, Math.floor(response.tokenDeathTime / 1000) - 180);
            dispatch(actions.setAuthUserData(response.email, true));
            dispatch(actions.setLoading(false));
        } catch (error) {
            dispatch(actions.setAuthUserData("", false));
            dispatch(actions.setLoading(false));
            dispatch(stopSubmit("login", {_error: error.response.data.error}));
        }
    }

export const getMe = () =>
    async (dispatch: any, getState: () => AppStateType) => {
        try {
            const token = getCookie('token') || '';
            dispatch(actions.setLoading(true));
            console.log("token: " + token);
            const response = await authAPI.getMe(token);
            console.log(response);
            setCookie('token', response.token, Math.floor(response.tokenDeathTime / 1000) - 180);
            console.log("NewToken: " + response.token);
            dispatch(actions.setAuthUserData(response.email, response.success));
            dispatch(actions.setLoading(false));
        } catch (error) {
            dispatch(actions.setAuthUserData(null, false));
            dispatch(actions.setLoading(false));
        }
    }

export const logOut = () => {
    return (dispatch: any) => {

        dispatch(actions.setLoading(true));
        setCookie('token', '', -1000);
        dispatch(actions.setAuthUserData(null, false));
        dispatch(actions.setLoading(false));

    }
}


export default loginReducer;