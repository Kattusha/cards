import {RegistrationType} from "../entity-auth";
import {AppStateType, InferActionTypes} from "../../main/bll/store";
import {ThunkAction} from "redux-thunk";
import {authAPI} from "../api";
import {stopSubmit} from "redux-form";

let initialState: RegistrationType = {
    isRegistrationSuccessful: false,
    isRegistrationInProgress: false
};

type InitialStateType = typeof initialState;

const registrationReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case "registration-reducer/SUCCESS":
            return {
                ...state,
                isRegistrationSuccessful: action.success,
                isRegistrationInProgress: false
            };
        case "registration-reducer/PROGRESS":
            return {
                ...state,
                isRegistrationInProgress: true
            };
        case "registration-reducer/ERROR":
            return {
                ...state,
                isRegistrationSuccessful: false,
                isRegistrationInProgress: false
            }
        default:
            return state;
    }
};

const actions = {
    setRegistrationSuccess: (success: boolean) => ({type: "registration-reducer/SUCCESS", success} as const),
    setRegistrationInProgress: (progress: boolean) => ({type: "registration-reducer/PROGRESS", progress} as const),
    setError: () => ({type: "registration-reducer/ERROR"} as const)
}

type ActionsTypes = InferActionTypes<typeof actions>

export const registration = (email: string, password: string): ThunkAction<void, AppStateType, unknown, ActionsTypes> =>
    async (dispatch: any) => {
        try {
            dispatch(actions.setRegistrationInProgress(true));
            const data = await authAPI.registration(email, password);
            if (data.success)dispatch(actions.setRegistrationSuccess(true));
        } catch (error) {
            dispatch(actions.setError());
            dispatch(stopSubmit("signIn", {_error: error.response.data.error}));
        }
    }

export default registrationReducer;