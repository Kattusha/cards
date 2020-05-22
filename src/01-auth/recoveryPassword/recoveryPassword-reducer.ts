import {AppStateType, InferActionTypes} from "../../main/bll/store";
import {ThunkAction} from "redux-thunk";
import {authAPI} from "../api";
import {stopSubmit} from "redux-form";

export type ForgotType = {
    isSendEmail: boolean
    isSaveNewPassword: boolean
    isLoading: boolean
    errorMessage: string
}

let initialState: ForgotType = {
    isSendEmail: false,
    isSaveNewPassword: false,
    isLoading: false,
    errorMessage: ""
};

type InitialStateType = typeof initialState;

const recoveryPasswordReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case "recoveryPassword-reducer/SET_STATUS_SENT_EMAIL":
            return {
                ...state,
                isSendEmail: action.isSendEmail
            };
        case "recoveryPassword-reducer/SET_LOADING":
            return {
                ...state,
                isLoading: action.isLoading
            };
        case "recoveryPassword-reducer/SET_STATUS_SAVE_NEW_PASSWORD":
            return {
                ...state,
                isSaveNewPassword: action.isSaveNewPassword
            }
        default:
            return state;
    }
};

const actions = {
    setStatusSendEmail: (isSendEmail: boolean) => ({
        type: "recoveryPassword-reducer/SET_STATUS_SENT_EMAIL",
        isSendEmail
    } as const),
    setStatusSaveNewPassword: (isSaveNewPassword: boolean) => ({
        type: "recoveryPassword-reducer/SET_STATUS_SAVE_NEW_PASSWORD",
        isSaveNewPassword
    } as const),
    setLoading: (isLoading: boolean) => ({type: "recoveryPassword-reducer/SET_LOADING", isLoading} as const)
}

type ActionsTypes = InferActionTypes<typeof actions>

//thunks
export const recoveryPassword = (email: string):
    ThunkAction<void, AppStateType, unknown, ActionsTypes> =>
    async (dispatch: any) => {
        try {
            dispatch(actions.setLoading(true));
            const response = await authAPI.forgotPassword(email)
            dispatch(actions.setStatusSendEmail(response));
            dispatch(actions.setLoading(false));
        } catch (error) {
            dispatch(actions.setStatusSendEmail(false));
            dispatch(actions.setLoading(false));
            dispatch(stopSubmit("recoveryPassword", {_error: error.response.data.error}));
        }
    }

export const setNewPassword = (token: string, password: string):
    ThunkAction<void, AppStateType, unknown, ActionsTypes> =>
    async (dispatch: any) => {
        try {
            dispatch(actions.setLoading(true));
            const response = await authAPI.setNewPassword(token, password);
            dispatch(actions.setStatusSaveNewPassword(response))
            dispatch(actions.setLoading(false));
        } catch (error) {
            dispatch(actions.setStatusSaveNewPassword(false))
            dispatch(actions.setLoading(false));
            dispatch(stopSubmit("newPassword", {_error: error.response.data.error}));
        }
    }

export default recoveryPasswordReducer;