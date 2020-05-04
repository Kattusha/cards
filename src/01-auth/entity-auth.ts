//entity for BLL and UI
export type AuthType = {
    email: string
    login: string
    idUser: string
    isAuth: boolean
}

export type RegistrationType = {
    isRegistrationSuccessful: boolean,
    isRegistrationInProgress: boolean
}

//entity from DALL
// export type RegistrationResponseType = {
//     data: {
//         data: AuthType
//     }
//     resultCode: number;
//     messages: Array<string>;
// }
//
// export type AuthorizationResponseType = {
//     data: {
//         data: AuthType
//     }
//     resultCode: number;
//     messages: Array<string>;
// }

