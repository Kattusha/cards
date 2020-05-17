import React from "react";
import styled from "styled-components/macro";
import {CardType} from "../api";
import Card from "./Card";
import {DeckHeader, DecksWrapper, InfoHeader, Name} from "../cardDecks/cardDecks";
import {Button} from "../../main/ui/style/commonStyle";

const AddCardButton = styled(Button)`
  width: 200px;
`;

type PropsType = {
    cards: Array<CardType>,
    deleteCard: (id: string) => void,
    editCard: (id: string) => void,
    addCard: () => void
}

const CardsOfDecks = ({cards, deleteCard, editCard, addCard}: PropsType) => {
    return (
        <>
            <DecksWrapper>
                <DeckHeader>
                    <Name>Question</Name>
                    <InfoHeader>Grade</InfoHeader>
                    <InfoHeader>Shots</InfoHeader>
                    <InfoHeader>Rating</InfoHeader>
                    <InfoHeader>Actions</InfoHeader>
                </DeckHeader>
                {cards.map(card => <Card key={card._id} {...card} deleteCard={deleteCard} editCard={editCard}/>)}
            </DecksWrapper>
            <AddCardButton onClick={addCard}>Add card</AddCardButton>
        </>
    )
}

export default CardsOfDecks