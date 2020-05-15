import {InferActionTypes} from "./store";
import {getMe} from "../../01-auth/login/login-reducer";

// export type InitializationType = {// или это
//     isInitializedApp: boolean
// }

let initialState = {
    isInitializedApp: false
};

type InitialStateType = typeof initialState;

const appReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
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
    return (dispatch: any) => {
        let promise = dispatch(getMe());

        promise.then(() => {
            dispatch(actions.setInitializationStatus(true));
        })
    }
}

export default appReducer;