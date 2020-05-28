export type CardType = {
    _id: string,
    answer: string,
    question: string,
    cardsPack_id: string,
    grade: number,
    rating: number,
    shots: number,
    type: string,
    created: string,
    updated: string,
    __v: number
};

export type GetCardsType = {
    cards: Array<CardType>,
    cardsTotalCount: number,
    maxGrade: string,
    minGrade: number,
    page: number
    pageCount: number,
    token: string,
    tokenDeathTime: number
};

export type DeleteCardResponseType = {
    deletedCard: CardType,
    success: boolean,
    token: string,
    tokenDeathTime: number,
};

export type PostOrPutCardType = {
    cardsPack_id: string,
    _id?: string,
    question?: string,
    answer?: string,
    grade?: number,
    shots?: number,
    rating?: number,
    type?: string,
}

export type PostOrPutCardObjectType = {
    card: PostOrPutCardType,
    token: string
}

export type PostCardResponseType = {
    newCard: CardType,
    success: boolean,
    token: string,
    tokenDeathTime: number,
}

export type PutCardResponseType = {
    updatedCard: CardType,
    success: boolean,
    token: string,
    tokenDeathTime: number,
}