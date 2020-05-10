import {AppStateType, InferActionTypes} from "../../main/bll/store";
import {ThunkAction} from "redux-thunk";
import {decksAPI, GetDecksType, GetCardsType} from "../api";

type CardDeckType = {
    decks: Array<GetDecksType>,
    cards: Array<GetCardsType>,
    isLoading: boolean
}

let initialState: CardDeckType = {
    decks: [],
    cards: [],
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
        case "cardDeckReducer/SET_CARDS":
            return {
                ...state,
                cards: action.cards,
                isLoading: false
            };
        case "cardDeckReducer/LOADING_STATUS":
            return {
                ...state,
                isLoading: action.isLoading
            }
        default:
            return state;
    }
};

const actions = {
    setDecks: (decks: Array<GetDecksType>) => ({type: "cardDeckReducer/SET_DECK", decks} as const),
    setCards: (cards: Array<GetCardsType>) => ({type: "cardDeckReducer/SET_CARDS", cards} as const),
    setLoadingStatus: (isLoading: boolean) => ({type: "cardDeckReducer/LOADING_STATUS", isLoading} as const),
}

type ActionsTypes = InferActionTypes<typeof actions>

export const getDecks = (): ThunkAction<void, AppStateType, unknown, ActionsTypes> =>
    async (dispatch: any) => {
        dispatch(actions.setLoadingStatus(true));
        let data = await decksAPI.getDecks();
        dispatch(actions.setDecks(data))
    }

export const getCards = (): ThunkAction<void, AppStateType, unknown, ActionsTypes> =>
    async (dispatch: any) => {
        dispatch(actions.setLoadingStatus(true));
        let data = await decksAPI.getCards();
        dispatch(actions.setCards(data))
    }

export default cardDecksReducer;