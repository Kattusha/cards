import {AppStateType, InferActionTypes} from "../../main/bll/store";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {CardPackType, cardsAPI, decksAPI, GetDecksType, PostOrPutCardsPackType, PostOrPutCardType} from "../api";
import {getCookie, setCookie} from "../../01-auth/login/cookies";
import {getCards} from "../cards/cardsReducer";

export type DecksType = {
    cardPacks: Array<CardPackType>,
    cardPacksTotalCount: number,
    maxGrade: string,
    minGrade: number,
    page: number
    pageCount: number,
    token: string,
    tokenDeathTime: number,
    isLoading: boolean,
    editedDeckId: string
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
    editedDeckId: ''
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
        default:
            return state;
    }
};

const actions = {
    setDecks: (decks: GetDecksType) => ({type: "cardDeckReducer/SET_DECK", decks} as const),
    deleteDeck: (id: string) => ({type: "cardDeckReducer/DELETE_DECK", id} as const),
    setLoadingStatus: (isLoading: boolean) => ({type: "cardDeckReducer/LOADING_STATUS", isLoading} as const),
    setPage: (page: number) => ({type: "cardDeckReducer/SET_PAGE", page} as const),
    setEditedDeckId: (editedDeckId: string) => ({type: "cardDeckReducer/SET_EDITED_PACK_ID", editedDeckId} as const)
}

type ActionsTypes = InferActionTypes<typeof actions>;
type ThunkType = ThunkAction<void, AppStateType, unknown, ActionsTypes>;
type ThunkActionType = ThunkDispatch<AppStateType, unknown, ActionsTypes>;


export const getDecks = (): ThunkType => async (dispatch: ThunkActionType) => {
        let token = getCookie('token');
        if (token !== null) {
            dispatch(actions.setLoadingStatus(true));
            let data = await decksAPI.getDecks(token);
            setCookie('token', data.token, Math.floor(data.tokenDeathTime / 1000) - 180);
            dispatch(actions.setDecks(data))
        } else console.log('ERROR: token is null!!!');
    };

export const getDecksMe = (): ThunkType =>  async (dispatch: ThunkActionType, getState: () => AppStateType) => {
        let token = getCookie('token');
        if (token !== null) {
            let myUserId = getState().login.userId;
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

export const addDeckWithCards = (cardsPack: PostOrPutCardsPackType, cards: Array<{answer: string, question: string}>): ThunkType =>
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
            const processCardsArray = async (cards: Array<{answer: string, question: string}>) => {
                for (const card of cards) {
                    let newCard = {
                        cardsPack_id: data.newCardsPack._id,
                        question: card.question,
                        answer: card.answer
                    }
                    await asyncAddCards(newCard)
                }
            };
            if (cards[0] && cards[0].answer && cards[0].question) await processCardsArray(cards);
            dispatch(actions.setLoadingStatus(false));
            dispatch(actions.setEditedDeckId(data.newCardsPack._id));
            dispatch(actions.setEditedDeckId(''));
        } else console.log('ERROR: token is null!!!');
    };

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