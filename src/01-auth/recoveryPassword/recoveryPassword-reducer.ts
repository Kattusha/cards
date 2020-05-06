import {AppStateType, InferActionTypes} from "../../main/bll/store";
import {ThunkAction} from "redux-thunk";
import {authAPI} from "../api";
import {stopSubmit} from "redux-form";

export type ForgotType = {
    isSendEmail: boolean
    isloading: boolean
    errorMessage: string
}

let initialState: ForgotType = {
    isSendEmail: false,
    isloading: false,
    errorMessage: ""
};

type InitialStateType = typeof initialState;

const recoveryPasswordReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case "recoveryPassword-reducer/SET_SUCCESS":
            return {
                ...state,
                isSendEmail: action.isSuccess
            };
        case "recoveryPassword-reducer/SET_LOADING":
            return {
                ...state,
                isloading: action.isloading
            };
        default:
            return state;
    }
};

const actions = {
    setSuccess: (isSuccess: boolean) => ({type: "recoveryPassword-reducer/SET_SUCCESS", isSuccess} as const),
    setLoading: (isloading: boolean) => ({type: "recoveryPassword-reducer/SET_LOADING", isloading} as const)
}

type ActionsTypes = InferActionTypes<typeof actions>

//thunks
export const recoveryPassword = (email: string):
    ThunkAction<void, AppStateType, unknown, ActionsTypes> =>
    async (dispatch: any) => {
        try {
            debugger
            dispatch(actions.setLoading(true));
            const response = await authAPI.forgot(email)
            debugger
            dispatch(actions.setSuccess(response));
            dispatch(actions.setLoading(false));
        } catch (error) {
            debugger
            dispatch(actions.setSuccess(false));
            dispatch(actions.setLoading(false));
            dispatch(stopSubmit("login", {_error: error.response.data.error}));
        }
    }

export default recoveryPasswordReducer;