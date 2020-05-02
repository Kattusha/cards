import {AppStateType, InferActionTypes} from "../../main/bll/store";
import {ThunkAction} from "redux-thunk";
import {authAPI} from "../api";
import {stopSubmit} from "redux-form";

export type LoginType = {
    // userId: null,
    email: string
    name: string
    isAuth: boolean
    loading: boolean
    isRegistration: boolean
    errorMessage: string
}

let initialState: LoginType = {
    email: "",
    name: "",
    isAuth: false,
    loading: false,
    isRegistration: false,
    errorMessage: ""
};

type InitialStateType = typeof initialState;

const loginReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case "SET_AUTH_USER_DATA":
            return {
                ...state,
                email: action.email,
                name: action.email,
                isAuth: action.isAuth
            };
        default:
            return state;
    }
};

const actions = {
    setAuthUserData: (email: string, isAuth: boolean) => ({type: "SET_AUTH_USER_DATA", email, isAuth})
}

type ActionsTypes = InferActionTypes<typeof actions>

//thunks
export const login = (email: string, password: string, rememberMe: boolean): ThunkAction<void, AppStateType, unknown, ActionsTypes> =>
    // async (dispatch: ThunkDispatch<AppStateType, unknown, ActionsTypes>, getState: () => AppStateType) => {
    async (dispatch: any, getState: () => AppStateType) => {
        try {
            const response = await authAPI.login(email, password, rememberMe)
            debugger
            dispatch(actions.setAuthUserData(email, true));
        } catch (error) {
            debugger
            dispatch(actions.setAuthUserData("", false));
            dispatch(stopSubmit("login", {_error: error.response.data.error}));
        }
    }

export default loginReducer;