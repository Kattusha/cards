import {AppStateType, InferActionTypes} from "../../main/bll/store";
import {ThunkAction} from "redux-thunk";
import {cardsAPI, CardType, GetCardsType, PostOrPutCardType} from "../api";
import {getCookie, setCookie} from "../../01-auth/login/cookies";

type CardsType = {
    cards: Array<CardType>,
    cardsTotalCount: number,
    maxGrade: string,
    minGrade: number,
    page: number
    pageCount: number,
    token: string,
    tokenDeathTime: number,
    isLoading: boolean
}

let initialState: CardsType = {
    cards: [],
    cardsTotalCount: 0,
    maxGrade: '',
    minGrade: 0,
    page: 0,
    pageCount: 0,
    token: '',
    tokenDeathTime: 0,
    isLoading: false,
};

type InitialStateType = typeof initialState;

const cardsReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case "cardsReducer/SET_CARDS":
            return {
                ...state,
                ...action.cards,
                // cards: action.cards.cards,
                cards: action.cards.cards.map(card => ({...card})),
                isLoading: false
            };
        case "cardsReducer/DELETE_CARD":
            return {
                ...state,
                cards: state.cards.filter((card) => card._id !== action.id),
                isLoading: false
            }
        case "cardsReducer/LOADING_STATUS":
            return {
                ...state,
                isLoading: action.isLoading,
            }
        case "cardReducer/SET_PAGE":
            return {
                ...state,
                page: action.page
            }
        default:
            return state;
    }
};

const actions = {
    setCards: (cards: GetCardsType) => ({type: "cardsReducer/SET_CARDS", cards} as const),
    deleteCard: (id: string) => ({type: "cardsReducer/DELETE_CARD", id} as const),
    setLoadingStatus: (isLoading: boolean) => ({type: "cardsReducer/LOADING_STATUS", isLoading} as const),
    setPage: (page: number) => ({type: "cardReducer/SET_PAGE", page} as const)
}

type ActionsTypes = InferActionTypes<typeof actions>;

export const getCards = (deckId: string): ThunkAction<void, AppStateType, unknown, ActionsTypes> =>
    async (dispatch: any) => {
        dispatch(actions.setLoadingStatus(true));
        let token = getCookie('token');
        let data = await cardsAPI.getCards(token, deckId);
        setCookie('token', data.token, Math.floor(data.tokenDeathTime / 1000) - 180);
        dispatch(actions.setCards(data))
    };

export const deleteCard = (id: string): ThunkAction<void, AppStateType, unknown, ActionsTypes> =>
    async (dispatch: any) => {
        dispatch(actions.setLoadingStatus(true));
        let token = getCookie('token');
        let data = await cardsAPI.deleteCard(token, id);
        setCookie('token', data.token, Math.floor(data.tokenDeathTime / 1000) - 180);
        if (data.success) dispatch(actions.deleteCard(data.deletedCard._id))
    };

export const postCard = (card: PostOrPutCardType): ThunkAction<void, AppStateType, unknown, ActionsTypes> =>
    async (dispatch: any) => {
        dispatch(actions.setLoadingStatus(true));
        let token = getCookie('token');
        let newCard = { card, token };
        let data = await cardsAPI.postCard(newCard);
        setCookie('token', data.token, Math.floor(data.tokenDeathTime / 1000) - 180);
        dispatch(getCards(card.cardsPack_id));
    };

export const chooseCardsPage = (page: number, deckId: string): ThunkAction<void, AppStateType, unknown, ActionsTypes> =>
    async (dispatch: any, getState: () => AppStateType) => {
        dispatch(actions.setLoadingStatus(true));
        let token = getCookie('token');
        let data = await cardsAPI.getCards(token, deckId, page);
        setCookie('token', data.token, Math.floor(data.tokenDeathTime / 1000) - 180);
        dispatch(actions.setCards(data));
        dispatch(actions.setPage(page))
    };

export const putCard = (card: PostOrPutCardType): ThunkAction<void, AppStateType, unknown, ActionsTypes> =>
    async (dispatch: any) => {
        dispatch(actions.setLoadingStatus(true));
        let token = getCookie('token');
        let editedCard = { card, token };
        let data = await cardsAPI.putCard(editedCard);
        setCookie('token', data.token, Math.floor(data.tokenDeathTime / 1000) - 180);
        dispatch(getCards(card.cardsPack_id));
    };

export default cardsReducer;