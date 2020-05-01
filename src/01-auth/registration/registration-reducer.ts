import {AuthType} from "../entity-auth";
import {InferActionTypes} from "../../main/bll/store";

let initialState: AuthType = {
    email: "",
    login: "",
    idUser: "",
    isAuth: false
};

type InitialStateType = typeof initialState;

const registrationReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case "registration-reducer/SUCCESS":
            return {
                ...state,
                ...action.data
                // isAuth: true
            };
        case "registration-reducer/LOADING":
            return {
                ...state,
                ...action.data
                // isAuth: true
            };
        case "registration-reducer/ERROR":
            return {
                ...state,
                ...action.data
                // isAuth: true
            };
        default:
            return state;
    }
};

const actions = {
    setAuthUserData: (userId:number, email:string, login:string) =>
        ({type: "LOGIN", data: {userId, email, login}})
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

// example thunk from socialNetwork

// export const logout = () => {
//     return (dispatch) => {
//         authAPI.logout()
//             .then(response => {
//                 debugger
//                 if (response.resultCode === 0) {
//                     dispatch(setAuthUserData(null, null, null, false));
//                 }
//             });
//     }
// };

export default registrationReducer;