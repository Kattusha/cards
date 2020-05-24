import {RegistrationType} from "./entities-auth-bll";
import {AppStateType, InferActionTypes} from "../../main/bll/store";
import {ThunkAction} from "redux-thunk";
import {authAPI} from "../dal/authAPI";
import {stopSubmit} from "redux-form";
import {requestStatusesActions} from "./request-statuses-reducer";
import {DEV_VERSION} from "../../config";

let initialState: RegistrationType = {
    isRegistratedUser: null
};

const registrationReducer = (state = initialState, action: ActionsTypes): RegistrationType => {
    switch (action.type) {
        case "registration-reducer/SET_REGISTRATION_STATUS":
            return {
                ...state,
                isRegistratedUser: action.isRegistrated
            };
        default:
            return state;
    }
};

const actions = {
    setRegistrationStatus: (isRegistrated: boolean) =>
        ({type: "registration-reducer/SET_REGISTRATION_STATUS", isRegistrated} as const)
}
type ActionsTypes = InferActionTypes<typeof actions>

export const registration = (email: string, password: string): ThunkAction<void, AppStateType, unknown, ActionsTypes> =>
    async (dispatch: any) => {

        DEV_VERSION && console.log('CALL registration-reducer -> registration');
        try {
            dispatch(requestStatusesActions.setLoading(true));
            const response = await authAPI.registration(email, password);
            DEV_VERSION && console.log(`    response: ${response}`);
            dispatch(actions.setRegistrationStatus(response.success));
        }
        catch (error) {
            dispatch(actions.setRegistrationStatus(false));
            dispatch(requestStatusesActions.setLoading(false));
            DEV_VERSION && console.log(`    response: ${error.response}`);
            dispatch(stopSubmit("signIn", {_error: error.response.data.error}));
        }
    }

export default registrationReducer;