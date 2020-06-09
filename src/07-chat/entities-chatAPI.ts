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