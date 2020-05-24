import {AppStateType, InferActionTypes} from "../../main/bll/store";
import {ThunkAction} from "redux-thunk";
import {authAPI} from "../dal/authAPI";
import {stopSubmit} from "redux-form";
import {RecoveryPasswordType} from "./entities-auth-bll";
import {DEV_VERSION} from "../../config";
import {requestStatusesActions} from "./request-statuses-reducer";

let initialState: RecoveryPasswordType = {
    isSendEmail: false,
    isSaveNewPassword: false,
};

const recoveryPasswordReducer = (state = initialState, action: ActionsTypes): RecoveryPasswordType => {
    switch (action.type) {
        case "recoveryPassword-reducer/SET_STATUS_SENT_EMAIL":
            return {
                ...state,
                isSendEmail: action.isSendEmail
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
    setStatusSendEmail: (isSendEmail: boolean) =>
        ({type: "recoveryPassword-reducer/SET_STATUS_SENT_EMAIL", isSendEmail} as const),

    setStatusSaveNewPassword: (isSaveNewPassword: boolean) =>
        ({type: "recoveryPassword-reducer/SET_STATUS_SAVE_NEW_PASSWORD", isSaveNewPassword} as const)
}
type ActionsTypes = InferActionTypes<typeof actions>

export const recoveryPassword = (email: string): ThunkAction<void, AppStateType, unknown, ActionsTypes> =>
    async (dispatch: any) => {

        DEV_VERSION && console.log('CALL recoveryPassword-reducer -> recoveryPassword')
        try {
            dispatch(requestStatusesActions.setLoading(true))
            const response = await authAPI.forgotPassword(email)
            DEV_VERSION && console.log(`    response send email: ${response}`)
            dispatch(actions.setStatusSendEmail(response))
            dispatch(requestStatusesActions.setLoading(false))
        } catch (error) {
            dispatch(actions.setStatusSendEmail(false))
            dispatch(requestStatusesActions.setLoading(false))
            DEV_VERSION && console.log(`    response send email: ${error.response}`)
            dispatch(stopSubmit("recoveryPassword", {_error: error.response.data.error}))
        }
    }

export const setNewPassword = (token: string, password: string):
    ThunkAction<void, AppStateType, unknown, ActionsTypes> =>
    async (dispatch: any) => {

        DEV_VERSION && console.log('CALL recoveryPassword-reducer -> setNewPassword')
        try {
            dispatch(requestStatusesActions.setLoading(true))
            const response = await authAPI.setNewPassword(token, password)
            DEV_VERSION && console.log(`    response: ${response}`)
            dispatch(actions.setStatusSaveNewPassword(response))
            dispatch(requestStatusesActions.setLoading(false))
        } catch (error) {
            dispatch(actions.setStatusSaveNewPassword(false))
            dispatch(requestStatusesActions.setLoading(false))
            DEV_VERSION && console.log(`    response: ${error.response}`)
            dispatch(stopSubmit("newPassword", {_error: error.response.data.error}))
        }
    }

export default recoveryPasswordReducer