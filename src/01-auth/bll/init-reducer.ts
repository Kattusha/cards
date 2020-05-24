import {AppStateType, InferActionTypes} from "../../main/bll/store";
import {getMe} from "./login-reducer";
import {ThunkDispatch} from "redux-thunk";
import {DEV_VERSION} from "../../config";
import {InitializationType} from "./entities-auth-bll";

let initialState: InitializationType = {
    isInitializedApp: null
};

const initReducer = (state = initialState, action: ActionsTypes): InitializationType => {
    switch (action.type) {
        case "init-reducer/INITIALIZED":
            return {
                ...state,
                isInitializedApp: action.isInitializedApp
            };
        default:
            return state;
    }
};

const actions = {
    setInitializationStatus: (isInitializedApp: boolean) =>
        ({type: "init-reducer/INITIALIZED", isInitializedApp} as const)
}

type ActionsTypes = InferActionTypes<typeof actions>

export const initializationApp = () => {
    return (dispatch: ThunkDispatch<AppStateType, unknown, ActionsTypes>, getState: () => AppStateType) => {

        DEV_VERSION && console.log('CALL initReducer -> initializationApp');
        dispatch(getMe())
            .then((response: { success: boolean, error: boolean, errorMessage: string }) => {
                dispatch(actions.setInitializationStatus(response.success))
                DEV_VERSION && console.log(`    response: ${response}`);
            })
    }
}

export default initReducer