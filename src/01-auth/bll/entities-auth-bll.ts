//entities for BLL
export type RequestStatusesType = {
    isLoading: boolean
    hasSuccess: boolean
    hasError: boolean
    errorMessage: string | null
}
export type InitializationType = {
    isInitializedApp: boolean | null
}
export type RegistrationType = {
    isRegistratedUser: boolean | null
}
export type LoginType = {
    email: string | null
    name: string | null
    userId: string | null
    isAuthorized: boolean | null
}
export type RecoveryPasswordType = {
    isSendEmail: boolean | null
    isSaveNewPassword: boolean | null
}