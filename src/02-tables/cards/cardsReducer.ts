import {AppStateType, InferActionTypes} from "../../main/bll/store";
import {ThunkAction} from "redux-thunk";
import {cardsAPI, decksAPI, GetCardsType, GetDecksType, PostOrPutCardsPackType} from "../api";
import {getCookie, setCookie} from "../../01-auth/login/cookies";

let initialState = {
    cards: {cards: [{}]} as GetCardsType,
    isLoading: false
};

type InitialStateType = typeof initialState;

const cardsReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case "cardsReducer/SET_CARDS":
            return {
                ...state,
                cards: action.cards,
                isLoading: false
            };
        case "cardsReducer/DELETE_CARD":
            return {
                ...state,
                cards: {
                    ...state.cards,
                    cards: state.cards.cards.filter(card => {
                        return card._id !== action.id;
                    })
                },
                isLoading: false
            }
        case "cardsReducer/LOADING_STATUS":
            return {
                ...state,
                isLoading: action.isLoading,
            }
        default:
            return state;
    }
};

const actions = {
    setCards: (cards: GetCardsType) => ({type: "cardsReducer/SET_CARDS", cards} as const),
    deleteCard: (id: string) => ({type: "cardsReducer/DELETE_CARD", id} as const),
    setLoadingStatus: (isLoading: boolean) => ({type: "cardsReducer/LOADING_STATUS", isLoading} as const),
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

export const deleteCard = (id: string): ThunkAction<void, AppStateType, unknown, ActionsTypes> =>//Напоминалка: словить ошибки try catch
    async (dispatch: any) => {
        dispatch(actions.setLoadingStatus(true));
        let token = getCookie('token');
        let data = await cardsAPI .deleteCard(token, id);
        setCookie('token', data.token, Math.floor(data.tokenDeathTime / 1000) - 180);
        if (data.success) dispatch(actions.deleteCard(data.deletedCard._id))
    };
//
// export const addDeck = (newPack: PostOrPutCardsPackType): ThunkAction<void, AppStateType, unknown, ActionsTypes> =>
//     async (dispatch: any) => {
//         dispatch(actions.setLoadingStatus(true));
//         let token = getCookie('token');
//         let newDeck = {
//             cardsPack: newPack,
//             token
//         };
//         let data = await decksAPI.postDeck(newDeck);
//         setCookie('token', data.token, Math.floor(data.tokenDeathTime / 1000) - 180);
//         dispatch(getDecks());
//     };
//
// export const changeDeck = (newPack: PostOrPutCardsPackType): ThunkAction<void, AppStateType, unknown, ActionsTypes> =>
//     async (dispatch: any) => {
//         dispatch(actions.setLoadingStatus(true));
//         let token = getCookie('token');
//         let newDeck = {
//             cardsPack: newPack,
//             token
//         };
//         let data = await decksAPI.postDeck(newDeck);
//         setCookie('token', data.token, Math.floor(data.tokenDeathTime / 1000) - 180);
//         dispatch(getDecks());
//     };

export default cardsReducer;