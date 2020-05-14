import React from "react";
import styled from "styled-components/macro";
import Deck from "./deck";
import {CardPackType, CardType} from "../api";
import {CARD_DECKS_PATH} from "../../main/ui/components/Body";
import {MenuNavLink} from "../../main/ui/style/headerStyle";
import {NavLink} from "react-router-dom";

const DecksWrapper = styled.div`
  width: 100%;
  border: 2px solid #e8e8e8;
  border-radius: 10px;
`;

const DeckHeader = styled.div`
  display: flex;
  justify-content: space-around;
  color: #c4c4c4;
  background: #f7f7f7;
  padding: 10px 0;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

export const Name = styled.div`
  margin-left: 15px;
  text-align: left;
  font-size: 18px;
  flex-basis: 30%;
`;

export const InfoHeader = styled(Name)`
  flex-basis: 10%;
`;

type PropsType = {
    decks: Array<CardPackType | CardType>,
    deletePack: (id: string) => void
}

const CardDecks = ({decks, deletePack}: PropsType) => {
    return (
        <DecksWrapper>
            <DeckHeader>
                <Name>Deck name</Name>
                <InfoHeader>Grade</InfoHeader>
                <InfoHeader>Shots</InfoHeader>
                <InfoHeader>Rating</InfoHeader>
                <InfoHeader>Actions</InfoHeader>
            </DeckHeader>
            {decks.map(deck => <Deck key={deck._id} {...deck} deletePack={deletePack}/>)}
        </DecksWrapper>
    )
}

export default CardDecks