import {AppStateType, InferActionTypes} from "../../main/bll/store";
import {ThunkAction} from "redux-thunk";
import {decksAPI, GetDecksType, PostOrPutCardsPackType} from "../api";
import {getCookie, setCookie} from "../../01-auth/login/cookies";

let initialState = {
    decks: {cardPacks: [{}]} as GetDecksType,
    isLoading: false
};

type InitialStateType = typeof initialState;

const cardDecksReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case "cardDeckReducer/SET_DECK":
            return {
                ...state,
                decks: action.decks,
                isLoading: false
            };
        case "cardDeckReducer/DELETE_DECK":
            return {
                ...state,
                decks: {
                    ...state.decks,
                    cardPacks: state.decks.cardPacks.filter(pack => {
                        return pack._id !== action.id;
                    })
                },
                isLoading: false
            }
        case "cardDeckReducer/LOADING_STATUS":
            return {
                ...state,
                isLoading: action.isLoading,
            }
        default:
            return state;
    }
};

const actions = {
    setDecks: (decks: GetDecksType) => ({type: "cardDeckReducer/SET_DECK", decks} as const),
    deleteDeck: (id: string) => ({type: "cardDeckReducer/DELETE_DECK", id} as const),
    setLoadingStatus: (isLoading: boolean) => ({type: "cardDeckReducer/LOADING_STATUS", isLoading} as const),
}

type ActionsTypes = InferActionTypes<typeof actions>;

export const getDecks = (): ThunkAction<void, AppStateType, unknown, ActionsTypes> =>
    async (dispatch: any) => {
        dispatch(actions.setLoadingStatus(true));
        let token = getCookie('token');
        let data = await decksAPI.getDecks(token);
        setCookie('token', data.token, Math.floor(data.tokenDeathTime / 1000) - 180);
        dispatch(actions.setDecks(data))
    };

export const deleteDeck = (id: string): ThunkAction<void, AppStateType, unknown, ActionsTypes> =>//Напоминалка: словить ошибки try catch
    async (dispatch: any) => {
        dispatch(actions.setLoadingStatus(true));
        let token = getCookie('token');
        let data = await decksAPI.deleteDeck(token, id);
        setCookie('token', data.token, Math.floor(data.tokenDeathTime / 1000) - 180);
        if (data.success) dispatch(actions.deleteDeck(data.deletedCardsPack._id))
    };

export const addDeck = (newPack: PostOrPutCardsPackType): ThunkAction<void, AppStateType, unknown, ActionsTypes> =>
    async (dispatch: any) => {
        dispatch(actions.setLoadingStatus(true));
        let token = getCookie('token');
        let newDeck = {
            cardsPack: newPack,
            token
        };
        let data = await decksAPI.postDeck(newDeck);
        setCookie('token', data.token, Math.floor(data.tokenDeathTime / 1000) - 180);
        dispatch(getDecks());
    };

export const changeDeck = (newPack: PostOrPutCardsPackType): ThunkAction<void, AppStateType, unknown, ActionsTypes> =>
    async (dispatch: any) => {
        dispatch(actions.setLoadingStatus(true));
        let token = getCookie('token');
        let newDeck = {
            cardsPack: newPack,
            token
        };
        let data = await decksAPI.postDeck(newDeck);
        setCookie('token', data.token, Math.floor(data.tokenDeathTime / 1000) - 180);
        dispatch(getDecks());
    };

export default cardDecksReducer;