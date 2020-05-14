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
    user_id: string | null,
    name?: string,
    path?: string,
    grade?: string,
    shots?: string,
    rating?: string,
    type?: string,
};

export type PostOrPutDeckType = {
    cardsPack: PostOrPutCardsPackType,
    token: string | null
};

export type PostDeckResponseType = {
    newCardsPack: {},
    success: boolean,
    token: string,
    tokenDeathTime: number
};

export type DeleteDeckResponseType = {
    deletedCardsPack: { _id: string },
    success: boolean,
    token: string,
    tokenDeathTime: number,
};

export type PutDeckResponseType = {
    updatedCardsPack: {},
    success: boolean,
    token: string,
    tokenDeathTime: number,
}

export const decksAPI = {
    getDecks: (token: string | null) => (instance.get<GetDecksType>(`cards/pack?&token=${token}`).then(res => res.data)),
    deleteDeck: (token: string | null, id: string) =>
        (instance.delete<DeleteDeckResponseType>(`cards/pack?&token=${token}&id=${id}`).then(res => res.data)),
    postDeck: (object: PostOrPutDeckType) => (instance.post<PostDeckResponseType>(`cards/pack`, object).then(res => res.data)),
    putDeck: (object: PostOrPutDeckType) => (instance.post<PostDeckResponseType>(`cards/pack`, object).then(res => res.data)),
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

export const cardsAPI = {
    getCards: (token: string | null, deckId: string) => (
        instance.get<GetCardsType>(`cards/card?&token=${token}&cardsPack_id=${deckId}`)
            .then(res => res.data)
    )
    // deleteDeck: (token: string | null, id: string) =>
    //     (instance.delete<DeleteDeckResponseType>(`cards/pack?&token=${token}&id=${id}`).then(res => res.data)),
    // postDeck: (object: PostOrPutDeckType) => (instance.post<PostDeckResponseType>(`cards/pack`, object).then(res => res.data)),
    // putDeck: (object: PostOrPutDeckType) => (instance.post<PostDeckResponseType>(`cards/pack`, object).then(res => res.data)),
}