import React from "react";
import {EditorReduxForm} from "./editor";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../main/bll/store";
import {addDeck, addDeckWithCards} from "../02-tables/cardDecks/cardDecksReducer";
import {postCard} from "../02-tables/cards/cardsReducer";
import { Redirect } from "react-router-dom";

type FormsValueType = {
    name: string,
    cards: Array<{answer: string, question: string}>
}

const DecksEditorContainer = () => {

    const dispatch = useDispatch();
    const userId = useSelector((store: AppStateType) => store.login.userId);
    const editedPackId = useSelector((store: AppStateType) => store.cardDecksReducer.editedDeckId);


    /*const addCard = ({name, cards}: FormsValueType) => {
        let card = {
            cardsPack_id: editedPackId,
            cards.question, answer
        }
        dispatch(postCard(card));
    };*/

    const createNewDeck = async ({name, cards}: any) => {
        let newPack = {user_id: userId, name};
        dispatch(addDeckWithCards(newPack, cards));
    }

    if (editedPackId !== '') return <Redirect to={`/profile/cards/${editedPackId}`}/>

    return (
        <EditorReduxForm onSubmit={createNewDeck}/>
    )
};

export default DecksEditorContainer