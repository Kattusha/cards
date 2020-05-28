import axios from "axios";
import {
    CommonResponseType,
    DeleteResponseType,
    GetDecksType,
    PostOrPutDeckType,
    PostResponseType,
    PutResponseType
} from "./entities-decksAPI";

const instance = axios.create({
    baseURL: 'https://cards-nya-back.herokuapp.com/1.0/'
});

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
        instance.delete<DeleteResponseType & CommonResponseType/*DeleteDeckResponseType*/>(`cards/pack?&token=${token}&id=${id}`)
            .then(res => {
                // debugger
                return res.data
            })
    ),
    postDeck: (object: PostOrPutDeckType) => (
        instance.post<PostResponseType & CommonResponseType/*PostDeckResponseType*/>(`cards/pack`, object)
            .then(res => res.data)
    ),
    putDeck: (object: PostOrPutDeckType) => (
        instance.put<PutResponseType & CommonResponseType /*PutDeckResponseType*/>(`cards/pack`, object)
            .then(res => res.data)
    )
}