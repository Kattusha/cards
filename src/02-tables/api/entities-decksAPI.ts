export type CommonResponseType = {
    success: boolean
    token: string
    tokenDeathTime: number
}
export type CardPackType = {
    _id: string
    user_id: string
    user_name: string
    name: string
    path: string
    grade: number
    shots: number
    rating: number
    type: string
    created: string
    updated: string
    __v: number
}
export type GetDecksType = {
    cardPacks: Array<CardPackType>
    cardPacksTotalCount: number
    maxGrade: string
    minGrade: number
    page: number
    pageCount: number
    token: string
    tokenDeathTime: number
}
export type PostOrPutCardsPackType = {
    user_id?: string
    _id?: string
    name?: string
    path?: string
    grade?: string
    shots?: string
    rating?: string
    type?: string
}
export type PostOrPutDeckType = {
    cardsPack: PostOrPutCardsPackType
    token: string
}
export type PostDeckResponseType = {
    newCardsPack: CardPackType
    success: boolean
    token: string
    tokenDeathTime: number
}
export type DeleteDeckResponseType = {
    deletedCardsPack: CardPackType
    success: boolean
    token: string
    tokenDeathTime: number
}
export type PutDeckResponseType = {
    updatedCardsPack: CardPackType
    success: boolean
    token: string
    tokenDeathTime: number
}