import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:3004/'
});

export type GetDecksType = {
    name: string,
    grade: string,
    tags: string
}
export type GetCardsType = {
    question: string,
    answer: string,
    grade: string
}

export const decksAPI = {
    getDecks: () => (instance.get<Array<GetDecksType>>('decks').then(res => res.data)),
    getCards: () => (instance.get<Array<GetCardsType>>('cards').then(res => res.data))
}