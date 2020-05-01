import {AuthType} from "../entity-auth";
import {InferActionTypes} from "../../main/bll/store";

export type LoginType = {
    email: string
    login: string
    idUser: string
    isAuth: boolean
    loading: boolean
    error: string
}

let initialState: LoginType = {
    email: "",
    login: "",
    idUser: "",
    isAuth: false,
    loading: false,
    error: ""
};

type InitialStateType = typeof initialState;

const loginReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case "LOADING":
            return {
                ...state,
                loading: true
            };

        default:
            return state;
    }
};

const actions = {
    loading: () => ({type: "LOADING"})
}

type ActionsTypes = InferActionTypes<typeof actions>

//example thunk

// export const login = (email:string, password:string): ThunkAction<void, AppStateType, unknown, ActionsTypes> =>
//     async (dispatch: ThunkDispatch<AppStateType, unknown, ActionsTypes>, getState: () => AppStateType) => {
//         const response = await authAPI.login(email, password)
//         if (response.resultCode === 0) {
//             dispatch(actions.setAuthUserData(response.data.data.userId, response.data.data.email, response.data.data.login))
//         }
//         else{
//             let message = response.messages.length > 0 ? response.messages[0] : "Some error";
//             dispatch(stopSubmit("login", {_error: message}));
//         }
//     }

export default loginReducer;