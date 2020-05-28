import {AppStateType, InferActionTypes} from "../../main/bll/store";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {getCookie, setCookie} from "../../01-auth/bll/cookies";
import {DEV_VERSION} from "../../config";
import {DeckType, GetDecksType, PostOrPutCardsPackType} from "../api/entities-decksAPI";
import {decksAPI} from "../api/decksAPI";
import { PostOrPutCardType } from "../api/entities-cardsAPI";
import { cardsAPI } from "../api/cardsAPI";

export type DecksType = {
    cardPacks: Array<DeckType>,
    cardPacksTotalCount: number,
    maxGrade: string,
    minGrade: number,
    page: number
    pageCount: number,
    token: string,
    tokenDeathTime: number,
    isLoading: boolean,
    editedDeckId: string,
    redirectedId: string
}

let initialState: DecksType = {
    cardPacks: [],
    cardPacksTotalCount: 0,
    maxGrade: '',
    minGrade: 0,
    page: 0,
    pageCount: 0,
    token: '',
    tokenDeathTime: 0,
    isLoading: false,
    editedDeckId: '',
    redirectedId: ''
};

type InitialStateType = typeof initialState;

const cardDecksReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case "cardDeckReducer/SET_DECK":
            return {
                ...state,
                ...action.decks,
                cardPacks: action.decks.cardPacks.map(cardPack => ({...cardPack})),
                isLoading: false
            };
        case "cardDeckReducer/DELETE_DECK":
            return {
                ...state,
                cardPacks: state.cardPacks.filter((cardPack) => cardPack._id !== action.id),
                isLoading: false
            }
        case "cardDeckReducer/LOADING_STATUS":
            return {
                ...state,
                isLoading: action.isLoading,
            }
        case "cardDeckReducer/SET_PAGE":
            return {
                ...state,
                page: action.page
            }
        case "cardDeckReducer/SET_EDITED_PACK_ID":
            return {
                ...state,
                editedDeckId: action.editedDeckId
            }
        case "cardDeckReducer/SET_REDIRECTED_PACK_ID":
            return {
                ...state,
                redirectedId: action.redirectedId
            }
        default:
            return state;
    }
};

export const actions = {
    setDecks: (decks: GetDecksType) => ({type: "cardDeckReducer/SET_DECK", decks} as const),
    deleteDeck: (id: string) => ({type: "cardDeckReducer/DELETE_DECK", id} as const),
    setLoadingStatus: (isLoading: boolean) => ({type: "cardDeckReducer/LOADING_STATUS", isLoading} as const),
    setPage: (page: number) => ({type: "cardDeckReducer/SET_PAGE", page} as const),
    setEditedDeckId: (editedDeckId: string) => ({type: "cardDeckReducer/SET_EDITED_PACK_ID", editedDeckId} as const),
    setRedirectedId: (redirectedId: string) => ({type: "cardDeckReducer/SET_REDIRECTED_PACK_ID", redirectedId} as const)
};

type ActionsTypes = InferActionTypes<typeof actions>;
type ThunkType = ThunkAction<void, AppStateType, unknown, ActionsTypes>;
type ThunkActionType = ThunkDispatch<AppStateType, unknown, ActionsTypes>;


export const getDecks = (): ThunkType => async (dispatch: ThunkActionType) => {
    DEV_VERSION && console.log('CALL login-reducer -> changeProfile')
    let token = getCookie('token');
    if (token !== null) {
        dispatch(actions.setLoadingStatus(true));
        let data = await decksAPI.getDecks(token);
        setCookie('token', data.token, Math.floor(data.tokenDeathTime / 1000) - 180);
        dispatch(actions.setDecks(data))
    } else console.log('ERROR: token is null!!!');
};

export const getDecksMe = (): ThunkType =>
    async (dispatch: ThunkActionType, getState: () => AppStateType) => {
        let token = getCookie('token');
        let myUserId: string | null = getState().login.userId;
        if (token !== null && myUserId !== null) {
            dispatch(actions.setLoadingStatus(true));
            let data = await decksAPI.getDecksMe(token, myUserId);
            setCookie('token', data.token, Math.floor(data.tokenDeathTime / 1000) - 180);
            dispatch(actions.setDecks(data))
        } else console.log('ERROR: token is null!!!');
    };

export const deleteDeck = (id: string): ThunkType => async (dispatch: ThunkActionType) => {
    let token = getCookie('token');
    if (token !== null) {
        dispatch(actions.setLoadingStatus(true));
        let data = await decksAPI.deleteDeck(token, id);
        setCookie('token', data.token, Math.floor(data.tokenDeathTime / 1000) - 180);
        if (data.success) dispatch(actions.deleteDeck(data.deletedCardsPack._id))
    } else console.log('ERROR: token is null!!!');
};

export const addDeck = (cardsPack: PostOrPutCardsPackType): ThunkType => async (dispatch: ThunkActionType) => {
    let token = getCookie('token');
    if (token !== null) {
        dispatch(actions.setLoadingStatus(true));
        let newDeck = {cardsPack, token};
        let data = await decksAPI.postDeck(newDeck);
        setCookie('token', data.token, Math.floor(data.tokenDeathTime / 1000) - 180);
        dispatch(getDecksMe());
    } else console.log('ERROR: token is null!!!');
};

export const addDeckWithCards = (cardsPack: PostOrPutCardsPackType, cards: Array<{ answer: string, question: string }>): ThunkType =>
    async (dispatch: ThunkActionType) => {
        let token = getCookie('token');
        if (token !== null) {
            dispatch(actions.setLoadingStatus(true));
            let newDeck = {cardsPack, token};
            let data = await decksAPI.postDeck(newDeck);
            setCookie('token', data.token, Math.floor(data.tokenDeathTime / 1000) - 180);
            const asyncAddCards = async (card: PostOrPutCardType) => {
                let token = getCookie('token');
                if (token !== null) {
                    dispatch(actions.setLoadingStatus(true));
                    let newCard = {card, token};
                    let cardData = await cardsAPI.postCard(newCard);
                    setCookie('token', cardData.token, Math.floor(cardData.tokenDeathTime / 1000) - 180);
                }
            };
            const processCardsArray = async (cards: Array<{ answer: string, question: string }>) => {
                for (const card of cards) {
                    let newCard = {
                        cardsPack_id: data.newCardsPack._id,
                        question: card.question,
                        answer: card.answer
                    }
                    await asyncAddCards(newCard);
                }
            };
            if (cards[0] && cards[0].answer && cards[0].question) await processCardsArray(cards);
            dispatch(actions.setRedirectedId(data.newCardsPack._id));
            dispatch(actions.setLoadingStatus(false));
        } else console.log('ERROR: token is null!!!');
    };

// export const editDeckWithCards = (cardsPack: CardPackType, cards: Array<PostOrPutCardType>): ThunkType =>
//     async (dispatch: ThunkActionType) => {
//
//     };

export const choosePage = (page: number): ThunkType => async (dispatch: ThunkActionType) => {
    let token = getCookie('token');
    if (token !== null) {
        dispatch(actions.setLoadingStatus(true));
        let data = await decksAPI.getDecks(token, page);
        setCookie('token', data.token, Math.floor(data.tokenDeathTime / 1000) - 180);
        dispatch(actions.setDecks(data));
        dispatch(actions.setPage(page))
    } else console.log('ERROR: token is null!!!');
};

export const searchDeck = (deckName: string): ThunkType => async (dispatch: ThunkActionType) => {
    let token = getCookie('token');
    if (token !== null) {
        dispatch(actions.setLoadingStatus(true));
        let data = await decksAPI.searchDecks(token, deckName);
        setCookie('token', data.token, Math.floor(data.tokenDeathTime / 1000) - 180);
        dispatch(actions.setDecks(data));
    } else console.log('ERROR: token is null!!!');
};

export const putDeck = (cardsPack: PostOrPutCardsPackType): ThunkType => async (dispatch: ThunkActionType) => {
    let token = getCookie('token');
    if (token !== null) {
        dispatch(actions.setLoadingStatus(true));
        let editedDeck = {cardsPack, token};
        let data = await decksAPI.putDeck(editedDeck);
        setCookie('token', data.token, Math.floor(data.tokenDeathTime / 1000) - 180);
        dispatch(getDecks());
    } else console.log('ERROR: token is null!!!');
};

export default cardDecksReducer;