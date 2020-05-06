import {AppStateType, InferActionTypes} from "../../main/bll/store";
import {ThunkAction} from "redux-thunk";
import {authAPI} from "../api";
import {stopSubmit} from "redux-form";

export type LoginType = {
    email: string
    isAuth: boolean
    isloading: boolean
    errorMessage: string
}

let initialState: LoginType = {
    email: "",
    isAuth: false,
    isloading: false,
    errorMessage: ""
};

type InitialStateType = typeof initialState;

const loginReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {

        case "login-reducer/SET_AUTH_USER_DATA":
            return {
                ...state,
                email: action.email,
                isAuth: action.isAuth
            };
        case "login-reducer/SET_LOADING":
            return {
                ...state,
                isloading: action.isloading
            };
        default:
            return state;
    }
};

const actions = {
    setAuthUserData: (email: string, isAuth: boolean) => ({type: "login-reducer/SET_AUTH_USER_DATA", email, isAuth} as const),
    setLoading: (isloading: boolean) => ({type: "login-reducer/SET_LOADING", isloading} as const)
}

type ActionsTypes = InferActionTypes<typeof actions>

//thunks
export const login = (email: string, password: string, rememberMe: boolean):
    ThunkAction<void, AppStateType, unknown, ActionsTypes> =>
    async (dispatch: any) => {
        try {
            dispatch(actions.setLoading(true));
            const response = await authAPI.login(email, password, rememberMe)
            debugger
            dispatch(actions.setAuthUserData(response.email, true));
            dispatch(actions.setLoading(false));
        } catch (error) {
            debugger
            dispatch(actions.setAuthUserData("", false));
            dispatch(actions.setLoading(false));
            dispatch(stopSubmit("login", {_error: error.response.data.error}));
        }
    }

export default loginReducer;