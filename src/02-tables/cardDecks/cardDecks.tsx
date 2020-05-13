import React from "react";
import styled from "styled-components/macro";
import Deck from "./deck";
import {CardPackType} from "../api";

const DecksWrapper = styled.div`
  width: 90%;
`;

const DeckHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  color: gray;
  margin-bottom: 10px;
`;

const Name = styled.div`
  text-align: center;
  font-size: 21px;
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
                        <Name>Rating</Name>
                        <Name>Shots</Name>
                    </DeckHeader>
                    {decks.map(deck => <Deck key={deck._id} {...deck} deletePack={deletePack}/>)}
                    <button>add deck</button>
                </DecksWrapper>
    )
}

export default CardDecks