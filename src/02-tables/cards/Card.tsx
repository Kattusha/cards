import React from "react";
import {CardType} from "../api";
import {InfoHeader, Name} from "../cardDecks/cardDecks";
import {ActionsMenu, DeckWrapper, Action} from "../cardDecks/deck";

type PropsType = CardType & AdditionalPropsType;//тут куча пропсов

type AdditionalPropsType = {
    deleteCard: (id: string) => void,
    editCard: (id: string) => void
}

const Card = ({_id, question, grade, shots, rating, deleteCard, editCard}: PropsType) => {
    return (
        <DeckWrapper>
            <Name>{question}</Name>
            <InfoHeader>{grade}</InfoHeader>
            <InfoHeader>{shots}</InfoHeader>
            <InfoHeader>{rating}</InfoHeader>
            <ActionsMenu>
                <Action backgroundColor={"#ff506480"} onClick={() => deleteCard(_id)}>Delete</Action>
                <Action backgroundColor={"#ffff0080"} onClick={() => editCard(_id)}>Edit</Action>
            </ActionsMenu>
        </DeckWrapper>
    )
}

export default Card