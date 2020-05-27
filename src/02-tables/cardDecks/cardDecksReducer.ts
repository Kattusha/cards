import {AppStateType, InferActionTypes} from "../../main/bll/store";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {CardPackType, cardsAPI, decksAPI, GetDecksType, PostOrPutCardsPackType, PostOrPutCardType} from "../api";
import {getCookie, setCookie} from "../../01-auth/bll/cookies";

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
            const processCardsArray = async () => {
                for (let card of cards) {
                    let newCard = {
                        cardsPack_id: data.newCardsPack._id,
                        question: card.question,
                        answer: card.answer
                    }
                    await asyncAddCards(newCard);
                }
            };
            if (cards[0] && cards[0].answer && cards[0].question) await processCardsArray();
            dispatch(actions.setRedirectedId(data.newCardsPack._id));
            dispatch(actions.setLoadingStatus(false));
        } else console.log('ERROR: token is null!!!');
    };

export const editDeckWithCards = (cardsPack?: PostOrPutCardsPackType, editedCards?: Array<PostOrPutCardType>, newCards?: Array<PostOrPutCardType>): ThunkType =>
    async (dispatch: ThunkActionType, getState: () => AppStateType) => {
        let token = getCookie('token');
        if (token !== null) {
            dispatch(actions.setLoadingStatus(true));
            if (cardsPack) {
                let editedDeck = {cardsPack, token};
                let data = await decksAPI.putDeck(editedDeck);
                setCookie('token', data.token, Math.floor(data.tokenDeathTime / 1000) - 180);
            }
            if (editedCards) {
                const editCards = async () => {
                    let existingCards: Array<string> = [];
                    const oldCards = getState().cards.cards;
                    ///редактирование
                    for (let card of editedCards) {
                        let iterableCard = oldCards.find(oldCard => oldCard._id === card._id)
                        if (iterableCard) {
                            existingCards.push(iterableCard._id);
                            if (iterableCard.answer !== card.answer || iterableCard.question !== card.question) {
                                let token = getCookie('token');
                                if (token !== null) {
                                    let editedCard = {card, token};
                                    let data = await cardsAPI.putCard(editedCard);
                                    setCookie('token', data.token, Math.floor(data.tokenDeathTime / 1000) - 180);
                                }
                            }
                        }
                    }
                    //удаление
                    if (existingCards.length !== 0) {
                        let cardsForDelete = oldCards.filter(card => {
                            for (let id of existingCards) {
                                if (card._id === id) return false
                            }
                        })
                        if (cardsForDelete.length !== 0) {
                            for (let card of cardsForDelete) {
                                let token = getCookie('token');
                                if (token !== null) {
                                    let data = await cardsAPI.deleteCard(token, card._id);
                                    setCookie('token', data.token, Math.floor(data.tokenDeathTime / 1000) - 180);
                                }
                            }
                        }
                    }
                }
                await editCards();
            }
            //добавление
            if (newCards) {
                for (let card of newCards) {
                    let token = getCookie('token');
                    if (token !== null) {
                        let createdCard = {card, token};
                        let data = await cardsAPI.postCard(createdCard);
                        setCookie('token', data.token, Math.floor(data.tokenDeathTime / 1000) - 180);
                    }
                }
            }
            dispatch(actions.setRedirectedId(getState().cardDecksReducer.editedDeckId));
            dispatch(actions.setEditedDeckId(''));
            dispatch(actions.setLoadingStatus(false));
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