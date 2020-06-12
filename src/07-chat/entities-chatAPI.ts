export type MessageType = {
    avatar: string
    created: string
    isAdmin: boolean
    message: string
    updated: string
    user_id: string
    user_name: string
    _id: string
}

export type MessageResponseType = {
    newGeneralChatMessage: MessageType,
    success: boolean
    token: string
    tokenDeathTime: number
}
export type MessagesResponseType = {
    generalChatMessages: Array<MessageType>
    token: string
    tokenDeathTime: number
}
export type UserType = {
    avatar: string
    created: string
    email: string
    isAdmin: boolean
    name: string
    publicCardPacksCount: number
    updated: string
    verified: boolean
    _id: string
}
export type UsersResponseType = {
    users: Array<UserType>
    maxPublicCardPacksCount: number
    minPublicCardPacksCount: number
    page: number
    pageCount: number
    token: string
    tokenDeathTime: number
    usersTotalCount: number
}
export type UserResponseType = {
    user: UserType
    token: string
    tokenDeathTime: number
}