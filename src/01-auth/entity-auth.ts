//entity for BLL and UI
export type AuthorizationType = {
    email: string
    isAuthorized: boolean
    isLoading: boolean
}

export type RegistrationType = {
    isRegistrationSuccessful: boolean,
    isRegistrationInProgress: boolean
}