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
    setCards: (cards: Array<object>) => ({type: "cardDeckReducer/SET_CARDS", cards} as const),
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
        console.log(data)
        setCookie('token', data.token, Math.floor(data.tokenDeathTime / 1000) - 180);
        dispatch(actions.setLoadingStatus(false));
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
        dispatch(actions.setLoadingStatus(false));
    };

export default cardDecksReducer;