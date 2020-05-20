import {AppStateType, InferActionTypes} from "../../main/bll/store";
import {ThunkAction} from "redux-thunk";
import {authAPI} from "../api";
import {stopSubmit} from "redux-form";
import {setCookie, getCookie} from "./cookies";

export type LoginType = {// или это
    email: string | null
    userId: string
    isAuthorized: boolean
    isLoading: boolean
}

let initialState: LoginType = {
    email: null,
    userId: '',
    isAuthorized: false,
    isLoading: false
};

type InitialStateType = typeof initialState;//или это

const loginReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case "login-reducer/SET_AUTH_USER_DATA":
            return {
                ...state,
                email: action.email,
                userId: action.userId,
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
    setAuthUserData: (email: string | null, userId: string, isAuthorized: boolean) => ({
        type: "login-reducer/SET_AUTH_USER_DATA",
        email, userId, isAuthorized
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
            dispatch(actions.setAuthUserData(response.email, response._id, true));
            dispatch(actions.setLoading(false));
        } catch (error) {
            dispatch(actions.setAuthUserData("", '', false));
            dispatch(actions.setLoading(false));
            debugger
            dispatch(stopSubmit("login", {_error: error.response.data.error}));
        }
    }

export const getMe = () =>
    async (dispatch: any, getState: () => AppStateType) => {
        try {
            const token: string | null = getCookie('token');
            if (token !== null) {
                dispatch(actions.setLoading(true));
                console.log("token from cookie: " + token);
                const response = await authAPI.getMe(token);
                console.log(response);
                setCookie('token', response.token, Math.floor(response.tokenDeathTime / 1000) - 180);
                console.log("response authAPI.getMe => new token: " + response.token);
                dispatch(actions.setAuthUserData(response.email, response._id, response.success));
                dispatch(actions.setLoading(false));
                return {success: true, error: false, errorMessage: null}
            }
            else {
                console.log("token is null ");
                return {success: false, error: true, errorMessage: 'token is null'}
            }
        } catch (error) {
            dispatch(actions.setAuthUserData(null, '', false));
            dispatch(actions.setLoading(false));
            console.log("response authAPI.getMe: " + error.response.data.error);
            return {success: false, error: true, errorMessage: error.response.data.error}
        }
    }

export const logOut = () => {
    return (dispatch: any) => {

        dispatch(actions.setLoading(true));
        setCookie('token', '', -1000);
        dispatch(actions.setAuthUserData(null, '', false));
        dispatch(actions.setLoading(false));

    }
}


export default loginReducer;