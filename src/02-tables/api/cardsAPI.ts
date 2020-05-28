import axios from "axios";
import {GetCardsType, DeleteCardResponseType, PostOrPutCardObjectType, PostCardResponseType, PutCardResponseType} from "./entities-cardsAPI";

const instance = axios.create({
    baseURL: 'https://cards-nya-back.herokuapp.com/1.0/'
});

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