import React from "react";
import styled from "styled-components/macro";
import Deck from "./deck";
import {CardPackType} from "../api";

const DecksWrapper = styled.div`
  background-color: #fff;
  margin: 0 auto;
  width: 1082px;
`;

const DeckHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  color: gray;
  margin-bottom: 10px;
`;

 export const Name = styled.div`
  margin-left: 5px;
  text-align: left;
  font-size: 21px;
  flex-basis: 30%;
`;

export const InfoHeader = styled(Name)`
  flex-basis: 10%;
`;

type PropsType = {
    decks: Array<CardPackType>,
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