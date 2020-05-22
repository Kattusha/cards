import React from "react";
import styled from "styled-components/macro";
import Deck from "./deck";
import {CardPackType} from "../api";

export const DecksWrapper = styled.div`
  width: 100%;
  border: 2px solid #e8e8e8;
  border-radius: 10px;
  position: relative;
  margin: 30px 0px;
`;

export const DeckHeader = styled.div`
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
    decks: Array<CardPackType>,
    deletePack: (id: string) => void,
    editPack: (id: string) => void,
}

const CardDecks = ({decks, deletePack, editPack}: PropsType) => {
    return (
        <DecksWrapper>
            <DeckHeader>
                <Name>Deck name</Name>
                <InfoHeader>Grade</InfoHeader>
                <InfoHeader>Shots</InfoHeader>
                <InfoHeader>Rating</InfoHeader>
                <InfoHeader>Actions</InfoHeader>
            </DeckHeader>
            {decks.map(deck => <Deck key={deck._id} {...deck} deletePack={deletePack} editPack={editPack}/>)}
        </DecksWrapper>
    )
}

export default CardDecks