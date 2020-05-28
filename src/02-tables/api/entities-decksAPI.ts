export type DeckType = {
    cardsCount: number
    deckCover: string
    _id: string
    user_id: string
    user_name: string
    name: string
    path: string
    private: boolean
    grade: number
    shots: number
    rating: number
    type: string
    created: string
    updated: string
    __v: number
}
export type GetDecksType = {
    cardPacks: Array<DeckType>
    cardPacksTotalCount: number
    maxGrade: string
    minGrade: number
    page: number
    pageCount: number
    token: string
    tokenDeathTime: number
}
export type PostOrPutCardsPackType = {
    user_id?: string | null
    name?: string
    path?: string
    grade?: string
    shots?: string
    rating?: string
    type?: string
}
export type PostOrPutDeckType = {
    cardsPack: PostOrPutCardsPackType,
    token: string
}
export type CommonResponseType = {
    success: boolean
    token: string
    tokenDeathTime: number
}
export type DeleteResponseType = {
    deletedCardsPack: DeckType
}
export type PutResponseType = {
    updatedCardsPack: DeckType
}
export type PostResponseType = {
    newCardsPack: DeckType
}

// export type PostDeckResponseType = {
//     newCardsPack: DeckType
//     success: boolean
//     token: string
//     tokenDeathTime: number
// }
// export type DeleteDeckResponseType = {
//     deletedCardsPack: DeckType
//     success: boolean
//     token: string
//     tokenDeathTime: number
// }
// export type PutDeckResponseType = {
//     updatedCardsPack: DeckType
//     success: boolean
//     token: string
//     tokenDeathTime: number
// }
