import React from "react";
import styled from "styled-components/macro";
import {CardType} from "../api";
import Card from "./Card";
import {DeckHeader, DecksWrapper, InfoHeader, Name} from "../cardDecks/cardDecks";
import {Button} from "../../main/ui/style/commonStyle";
import {Route} from "react-router-dom";
import {PROFILE_PATH} from "../../main/ui/components/Body";

const AddCardButton = styled(Button)`
 font-size: 35px;
 font-family: unset;
 border-radius: 100%;
 box-shadow: 0 2px 5px 0 rgba(0,0,0,.2);
 cursor: pointer;
 height: 32px;
 position: absolute;
 width: 32px;  
 padding: 0;
 left: 30px;
 bottom: -17px;
 line-height: 5px;
 &:hover:after { 
        content: "add new card in deck"; 
        font-family: 'DINNextLTPro-Bold';
        position: absolute;
        top: 20px;
        left: 40px;
        height: .9rem;   
        background-color: #4c4c4c7a;
        color: white;
        //color: #5c5c5c;
        width: max-content;
        font-size: 14px;
        text-transform: initial;
        border-radius: 5px;
        padding: 10px 12px 0px 10px;
        filter: none;
    }
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
                    <Route path={PROFILE_PATH}><InfoHeader>Actions</InfoHeader></Route>
                </DeckHeader>
                {cards.map(card => <Card key={card._id} {...card} deleteCard={deleteCard} editCard={editCard}/>)}
                <Route path={PROFILE_PATH}>
                    <AddCardButton onClick={addCard}>+</AddCardButton>
                </Route>
            </DecksWrapper>

        </>
    )
}

export default CardsOfDecks