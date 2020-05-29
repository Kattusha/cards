import {AppStateType, InferActionTypes} from "../../main/bll/store";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {getCookie, setCookie} from "../../01-auth/bll/cookies";
import {CardPackType, GetDecksType, PostOrPutCardsPackType} from "../api/entities-decksAPI";
import {decksAPI} from "../api/decksAPI";
import {CardType, PostOrPutCardType} from "../api/entities-cardsAPI";
import {cardsAPI} from "../api/cardsAPI";

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
        case "cardDeckReducer/RESET_DECKS":
            return {
                ...state,
                cardPacks: []
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
    setRedirectedId: (redirectedId: string) => ({type: "cardDeckReducer/SET_REDIRECTED_PACK_ID", redirectedId} as const),
    resetDecks: () => ({type: "cardDeckReducer/RESET_DECKS"} as const)
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

export const createOrEditDeckWithCards = (cardsPack?: PostOrPutCardsPackType, editedCards?: Array<PostOrPutCardType>, newCards?: Array<PostOrPutCardType>): ThunkType =>
    async (dispatch: any, getState: () => AppStateType) => {
        let token = getCookie('token');
        if (token !== null) {
            dispatch(actions.setLoadingStatus(true));
            let newCardPackId: string | undefined;
            let editedPackId = getState().cardDecksReducer.editedDeckId;
            if (cardsPack) {
                await (async () => {
                    if (cardsPack._id) {
                        let editedDeck = {cardsPack, token};
                        let data = await decksAPI.putDeck(editedDeck);
                        setCookie('token', data.token, Math.floor(data.tokenDeathTime / 1000) - 180);
                    } else {
                        let newDeck = {cardsPack, token};
                        let data = await decksAPI.postDeck(newDeck);
                        newCardPackId = data.newCardsPack._id;
                        setCookie('token', data.token, Math.floor(data.tokenDeathTime / 1000) - 180);
                    }
                })()
            }
            if (editedCards) {
                let existingCards: Array<CardType> = [];
                const oldCards = getState().cards.cards;
                ///редактирование
                for (let card of editedCards) {
                    let iterableCard = oldCards.find(oldCard => oldCard._id === card._id)
                    if (iterableCard) {
                        existingCards.push(iterableCard);
                        if (iterableCard.answer !== card.answer || iterableCard.question !== card.question) {
                            await (async () => {
                                let token = getCookie('token');
                                if (token !== null) {
                                    let editedCard = {card, token};
                                    let data = await cardsAPI.putCard(editedCard);
                                    setCookie('token', data.token, Math.floor(data.tokenDeathTime / 1000) - 180);
                                }
                            })()
                        }
                    }
                }
                //удаление
                if (existingCards.length !== 0) {
                    let cardsForDelete = oldCards.filter(card => !existingCards.includes(card));
                    if (cardsForDelete.length !== 0) {
                        for (let card of cardsForDelete) {
                            await (async () => {
                                let token = getCookie('token');
                                if (token !== null) {
                                    let data = await cardsAPI.deleteCard(token, card._id);
                                    setCookie('token', data.token, Math.floor(data.tokenDeathTime / 1000) - 180);
                                }
                            })()
                        }
                    }
                }
            }
            //добавление
            if (newCards) {
                for (let card of newCards) {
                    await (async () => {
                        let token = getCookie('token');
                        if (token !== null) {
                            let newCard = {
                                cardsPack_id: (editedPackId ? editedPackId : newCardPackId)!,
                                question: card.question!,
                                answer: card.answer!
                            }
                            let createdCard = {card: newCard, token};
                            let data = await cardsAPI.postCard(createdCard);
                            setCookie('token', data.token, Math.floor(data.tokenDeathTime / 1000) - 180);
                        }
                    })()
                }
            }
            if (newCardPackId) {
                dispatch(actions.setRedirectedId(newCardPackId));
            } else {
                dispatch(actions.setRedirectedId(getState().cardDecksReducer.editedDeckId));
                dispatch(actions.setEditedDeckId(''));
            }
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
        dispatch(actions.resetDecks());
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