import {AppStateType, InferActionTypes} from "./store";
import {getMe} from "../../01-auth/login/login-reducer";

export type InitializationType = {// или это
    isInitializedApp: boolean | null
}

let initialState = {
    isInitializedApp: null
};

// type InitialStateType = typeof initialState;

const appReducer = (state = initialState, action: ActionsTypes): InitializationType => {
    switch (action.type) {
        case "app-reducer/INITIALIZED":
            return {
                ...state,
                isInitializedApp: action.isInitializedApp
            };
        default:
            return state;
    }
};

const actions = {
    setInitializationStatus: (isInitializedApp: boolean) => ({type: "app-reducer/INITIALIZED", isInitializedApp} as const)
}

type ActionsTypes = InferActionTypes<typeof actions>

export const initializationApp = () => {
    return (dispatch: any, getState: () => AppStateType) => {
        let promise = dispatch(getMe());
        promise
            .then((response: {success: boolean, error: boolean, errorMessage: string}) => {
                dispatch(actions.setInitializationStatus(response.success))
        })
    }
}

export default appReducer;