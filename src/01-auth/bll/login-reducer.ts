import {AppStateType, InferActionTypes} from "../../main/bll/store";
import {ThunkAction} from "redux-thunk";
import {authAPI} from "../dal/authAPI";
import {stopSubmit} from "redux-form";
import {getCookie, setTokenInCookie} from "./cookies";
import {DEV_VERSION} from "../../config";
import {requestStatusesActions} from "./request-statuses-reducer";
import { LoginType } from "./entities-auth-bll";

let initialState: LoginType = {
    email: null,
    name: null,
    userId: null,
    isAuthorized: false
};

const loginReducer = (state = initialState, action: ActionsTypes): LoginType => {
    switch (action.type) {
        case "login-reducer/SET_AUTH_USER_DATA":
            return {
                ...state,
                email: action.email,
                userId: action.userId,
                isAuthorized: action.isAuthorized
            };
        default:
            return state;
    }
};

const actions = {
    setAuthUserData: (email: string | null, userId: string | null, isAuthorized: boolean) =>
        ({type: "login-reducer/SET_AUTH_USER_DATA", email, userId, isAuthorized} as const)
}
type ActionsTypes = InferActionTypes<typeof actions>

export const logIn = (email: string, password: string, rememberMe: boolean):
    ThunkAction<void, AppStateType, unknown, ActionsTypes> =>
    async (dispatch: any) => {

        DEV_VERSION && console.log('CALL login-reducer -> login')
        try {
            dispatch(requestStatusesActions.setLoading(true))
            const response = await authAPI.login(email, password, rememberMe)
            DEV_VERSION && console.log(`    response: ${response}`)
            setTokenInCookie(response.token, response.tokenDeathTime)
            dispatch(actions.setAuthUserData(response.email, response._id, response.success))
            dispatch(requestStatusesActions.setLoading(false))
        } catch (error) {
            dispatch(actions.setAuthUserData(null, null, false))
            dispatch(requestStatusesActions.setLoading(false))
            // debugger
            DEV_VERSION && console.log(`    response: ${error.response}`)
            dispatch(stopSubmit("login", {_error: error.response.data.error}))
        }
    }

export const getMe = () => async (dispatch: any, getState: () => AppStateType) => {

    DEV_VERSION && console.log('CALL login-reducer -> getMe')
    try {
        const token: string | null = getCookie('token')
        DEV_VERSION && console.log(`    token from cookie: ${token}`)

        if (token !== null) {
            dispatch(requestStatusesActions.setLoading(true))
            const response = await authAPI.getMe(token)
            DEV_VERSION && console.log(`    response authAPI.getMe: ${response}`)
            setTokenInCookie(response.token, response.tokenDeathTime)
            dispatch(actions.setAuthUserData(response.email, response._id, response.success))
            dispatch(requestStatusesActions.setLoading(false))

            return {success: true, error: false, errorMessage: null}

        } else {
            return {success: false, error: true, errorMessage: 'token is null'}
        }
    } catch (error) {
        dispatch(actions.setAuthUserData(null, null, false))
        dispatch(requestStatusesActions.setLoading(false))
        DEV_VERSION && console.log(`    response authAPI.getMe: ${error.response.data.error}`)

        return {success: false, error: true, errorMessage: error.response.data.error}
    }
}

export const logOut = () => {
    return (dispatch: any) => {

        DEV_VERSION && console.log('CALL login-reducer -> logOut')
        dispatch(requestStatusesActions.setLoading(true))
        setTokenInCookie('', -1000)
        DEV_VERSION && console.log(`    token: null`)
        dispatch(actions.setAuthUserData(null, null, false))
        dispatch(requestStatusesActions.setLoading(false))

    }
}

export default loginReducer