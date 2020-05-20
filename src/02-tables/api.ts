import axios from "axios";

const instance = axios.create({
    baseURL: 'https://cards-nya-back.herokuapp.com/1.0/'
});

export type CommonResponseType = {
    success: boolean,
    token: string,
    tokenDeathTime: number,
}

export type CardPackType = {
    _id: string,
    user_id: string,
    user_name: string,
    name: string,
    path: string,
    grade: number,
    shots: number,
    rating: number,
    type: string,
    created: string,
    updated: string,
    __v: number
};

export type GetDecksType = {
    cardPacks: Array<CardPackType>,
    cardPacksTotalCount: number,
    maxGrade: string,
    minGrade: number,
    page: number
    pageCount: number,
    token: string,
    tokenDeathTime: number
};

export type PostOrPutCardsPackType = {
    user_id?: string | null,
    name?: string,
    path?: string,
    grade?: string,
    shots?: string,
    rating?: string,
    type?: string,
};

export type PostOrPutDeckType = {
    cardsPack: PostOrPutCardsPackType,
    token: string
};

export type PostDeckResponseType = {
    newCardsPack: CardPackType,
    success: boolean,
    token: string,
    tokenDeathTime: number
};

export type DeleteDeckResponseType = {
    deletedCardsPack: CardPackType,
    success: boolean,
    token: string,
    tokenDeathTime: number,
};

export type PutDeckResponseType = {
    updatedCardsPack: CardPackType,
    success: boolean,
    token: string,
    tokenDeathTime: number,
}

export const decksAPI = {
    getDecks: (token: string, page?: number) => (
        instance.get<GetDecksType>(`cards/pack?&token=${token}&pageCount=12&page=${page}`)
            .then(res => {
                // debugger
                return res.data
            })
    ),
    getDecksMe: (token: string, myUserId: string, page?: number) => (
        instance.get<GetDecksType>(`cards/pack?&token=${token}&user_id=${myUserId}&pageCount=12&page=${page}`)
            .then(res => {
                // debugger
                return res.data
            })
    ),
    searchDecks: (token: string, deckName: string) => (
        instance.get<GetDecksType>(`cards/pack?&token=${token}&pageCount=12&packName=${deckName}`)
            .then(res => res.data)
    ),
    deleteDeck: (token: string, id: string) => (
        instance.delete<DeleteDeckResponseType>(`cards/pack?&token=${token}&id=${id}`)
            .then(res => res.data)
    ),
    postDeck: (object: PostOrPutDeckType) => (
        instance.post<PostDeckResponseType>(`cards/pack`, object)
            .then(res => res.data)
    ),
    putDeck: (object: PostOrPutDeckType) => (
        instance.put<PutDeckResponseType>(`cards/pack`, object)
            .then(res => res.data)
    )
}

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

export const cardsAPI = {
    getCards: (token: string, deckId: string, page?: number) => (
        instance.get<GetCardsType>(`cards/card?&token=${token}&cardsPack_id=${deckId}&pageCount=10&page=${page}`)
            .then(res => {
                // debugger
                return res.data
            })
    ),
    deleteCard: (token: string, id: string) => (
        instance.delete<DeleteCardResponseType>(`cards/card?&token=${token}&id=${id}`)
            .then(res => res.data)
    ),
    postCard: (object: PostOrPutCardObjectType) => (
        instance.post<PostCardResponseType>(`cards/card`, object)
            .then(res => res.data)
    ),
    putCard: (object: PostOrPutCardObjectType) => (
        instance.put<PutCardResponseType>(`cards/card`, object)
            .then(res => res.data)
    )
}