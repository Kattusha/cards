import React, {useState} from "react";
import styled from "styled-components/macro";
import {CardPackType} from "../api";
import {InfoHeader, Name} from "./cardDecks";

const DeckWrapper = styled.div`
  height: 100px;
  margin-bottom: 10px;
  box-shadow: 0 0 0 3px #f7f7f7;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const DeleteButton = styled.button`
  width: 100px;
  height: 50px;
  margin-left: 5px;
  text-align: left;
  line-height: 50px;
  background-color: coral;
  border-radius: 10px;
  cursor: pointer;
`;

const ActionsMenu = styled.div`
  display: flex;
  flex-flow: column;
  font-size: 15px;
`;

const Action = styled.div`
  width: 100px;
  height: 20px;
  cursor: pointer;
  &:hover {
   color: #32cdff;
  }
`;


type PropsType = CardPackType & AdditionalPropsType;//тут куча пропсов

type AdditionalPropsType = {
    deletePack: (id: string) => void
}

const Deck = ({_id, grade, name, shots, rating, deletePack, ...props}: PropsType) => {
    return (
        <DeckWrapper>
            <Name>{name}</Name>
            <InfoHeader>{grade}</InfoHeader>
            <InfoHeader>{shots}</InfoHeader>
            <InfoHeader>{rating}</InfoHeader>
            <ActionsMenu>
                <Action onClick={() => deletePack(_id)}>Delete</Action>
                <Action>Change</Action>
            </ActionsMenu>
        </DeckWrapper>
    )
}

export default Deck