import {AppStateType, InferActionTypes} from "../../main/bll/store";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {CardPackType, decksAPI, GetDecksType, PostOrPutCardsPackType} from "../api";
import {getCookie, setCookie} from "../../01-auth/login/cookies";

export type DecksType = {
    cardPacks: Array<CardPackType>,
    cardPacksTotalCount: number,
    maxGrade: string,
    minGrade: number,
    page: number
    pageCount: number,
    token: string,
    tokenDeathTime: number,
    isLoading: boolean
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
    isLoading: false
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
        default:
            return state;
    }
};

const actions = {
    setDecks: (decks: GetDecksType) => ({type: "cardDeckReducer/SET_DECK", decks} as const),
    deleteDeck: (id: string) => ({type: "cardDeckReducer/DELETE_DECK", id} as const),
    setLoadingStatus: (isLoading: boolean) => ({type: "cardDeckReducer/LOADING_STATUS", isLoading} as const),
    setPage: (page: number) => ({type: "cardDeckReducer/SET_PAGE", page} as const)
}

type ActionsTypes = InferActionTypes<typeof actions>;

export const getDecks = (): ThunkAction<void, AppStateType, unknown, ActionsTypes> =>
    async (dispatch: ThunkDispatch<AppStateType, unknown, ActionsTypes>) => {
        let token = getCookie('token');
        if (token !== null) {
            dispatch(actions.setLoadingStatus(true));
            let data = await decksAPI.getDecks(token);
            setCookie('token', data.token, Math.floor(data.tokenDeathTime / 1000) - 180);
            dispatch(actions.setDecks(data))
        } else console.log('ERROR: token is null!!!');
    };

export const getDecksMe = (): ThunkAction<void, AppStateType, unknown, ActionsTypes> =>
    async (dispatch: ThunkDispatch<AppStateType, unknown, ActionsTypes>, getState: () => AppStateType) => {
        let token = getCookie('token');
        if (token !== null) {
            let myUserId = getState().login.userId;
            dispatch(actions.setLoadingStatus(true));
            let data = await decksAPI.getDecksMe(token, myUserId);
            setCookie('token', data.token, Math.floor(data.tokenDeathTime / 1000) - 180);
            dispatch(actions.setDecks(data))
        } else console.log('ERROR: token is null!!!');
    };

export const deleteDeck = (id: string): ThunkAction<void, AppStateType, unknown, ActionsTypes> =>
    async (dispatch: ThunkDispatch<AppStateType, unknown, ActionsTypes>) => {
        let token = getCookie('token');
        if (token !== null) {
            dispatch(actions.setLoadingStatus(true));
            let data = await decksAPI.deleteDeck(token, id);
            setCookie('token', data.token, Math.floor(data.tokenDeathTime / 1000) - 180);
            if (data.success) dispatch(actions.deleteDeck(data.deletedCardsPack._id))
        } else console.log('ERROR: token is null!!!');
    };

export const addDeck = (cardsPack: PostOrPutCardsPackType): ThunkAction<void, AppStateType, unknown, ActionsTypes> =>
    async (dispatch: ThunkDispatch<AppStateType, unknown, ActionsTypes>) => {
        let token = getCookie('token');
        if (token !== null) {
            dispatch(actions.setLoadingStatus(true));
            let newDeck = {cardsPack, token};
            let data = await decksAPI.postDeck(newDeck);
            setCookie('token', data.token, Math.floor(data.tokenDeathTime / 1000) - 180);
            dispatch(getDecks());
        } else console.log('ERROR: token is null!!!');
    };

export const choosePage = (page: number): ThunkAction<void, AppStateType, unknown, ActionsTypes> =>
    async (dispatch: ThunkDispatch<AppStateType, unknown, ActionsTypes>) => {
        let token = getCookie('token');
        if (token !== null) {
            dispatch(actions.setLoadingStatus(true));
            let data = await decksAPI.getDecks(token, page);
            setCookie('token', data.token, Math.floor(data.tokenDeathTime / 1000) - 180);
            dispatch(actions.setDecks(data));
            dispatch(actions.setPage(page))
        } else console.log('ERROR: token is null!!!');
    };

export const searchDeck = (deckName: string): ThunkAction<void, AppStateType, unknown, ActionsTypes> =>
    async (dispatch: ThunkDispatch<AppStateType, unknown, ActionsTypes>) => {
        let token = getCookie('token');
        if (token !== null) {
            dispatch(actions.setLoadingStatus(true));
            let data = await decksAPI.searchDecks(token, deckName);
            setCookie('token', data.token, Math.floor(data.tokenDeathTime / 1000) - 180);
            dispatch(actions.setDecks(data));
        } else console.log('ERROR: token is null!!!');
    };

export const putDeck = (cardsPack: PostOrPutCardsPackType): ThunkAction<void, AppStateType, unknown, ActionsTypes> =>
    async (dispatch: ThunkDispatch<AppStateType, unknown, ActionsTypes>) => {
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