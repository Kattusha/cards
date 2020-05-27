export type RegistrationResponseType = {
    addedUser: {
        email: string
        isAdmin: boolean
    },
    success: boolean
}
export type AuthorizationResponseType = {
    email: string
    name: string
    isAdmin: boolean
    rememberMe: boolean
    token: string
    tokenDeathTime: number
    success: boolean
    _id: string
}
export type SuccessResponseType = {
    success: boolean
}
export type ChangeUserDataResponseType = {
    updatedUser: AuthorizationResponseType
    success: boolean
    token: string
    tokenDeathTime: number
}