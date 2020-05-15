import React from "react";
import {CardType} from "../api";
import Card from "./Card";
import {DeckHeader, DecksWrapper, InfoHeader, Name} from "../cardDecks/cardDecks";

type PropsType = {
    cards: Array<CardType>,
    deleteCard: (id: string) => void
}

const CardsOfDecks = ({cards, deleteCard}: PropsType) => {
    return (
        <DecksWrapper>
            <DeckHeader>
                <Name>Question</Name>
                <InfoHeader>Grade</InfoHeader>
                <InfoHeader>Shots</InfoHeader>
                <InfoHeader>Rating</InfoHeader>
                <InfoHeader>Actions</InfoHeader>
            </DeckHeader>
            {cards.map(card => <Card key={card._id} {...card} deleteCard={deleteCard}/>)}
        </DecksWrapper>
    )
}

export default CardsOfDecks