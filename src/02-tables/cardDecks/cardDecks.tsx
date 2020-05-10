import React from "react";
import styled from "styled-components/macro";
import Deck from "./deck";
import {GetDecksType} from "../api";

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
    decks: Array<GetDecksType>
}

const CardDecks = ({decks}: PropsType) => {
    return (
                <DecksWrapper>
                    <DeckHeader>
                        <Name>Deck name</Name>
                        <Name>Rating</Name>
                        <Name>Tags</Name>
                    </DeckHeader>
                    {decks.map((deck, id) => <Deck key={id} {...deck}/>)}
                </DecksWrapper>
    )
}

export default CardDecks