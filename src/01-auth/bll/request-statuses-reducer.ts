import {InferActionTypes} from "../../main/bll/store";
import {RequestStatusesType} from "./entities-auth-bll";

let initialState: RequestStatusesType = {
    isLoading: false,
    hasSuccess: false,
    hasError: false,
    errorMessage: null
};

const requestStatusesReducer = (state = initialState, action: ActionsTypes): RequestStatusesType => {
    switch (action.type) {
        case "request-statuses-reducer/SET_LOADING":
            return {
                ...state,
                isLoading: action.isLoading
            };
        default:
            return state;
    }
};

export const requestStatusesActions = {
    setLoading: (isLoading: boolean) => ({type: "request-statuses-reducer/SET_LOADING", isLoading} as const)
}

type ActionsTypes = InferActionTypes<typeof requestStatusesActions>

export default requestStatusesReducer