import React from "react";
import styled from "styled-components/macro";
import {CardPackType} from "../api";

const DeckWrapper = styled.div`
  height: 100px;
  margin-bottom: 10px;
  box-shadow: 0 0 0 3px #f7f7f7;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const DeckName = styled.div`
  text-align: center;
  font-size: 21px;
`;

const DeckRating = styled(DeckName)`
  
`;

const DeckTags = styled(DeckName)`
  
`;

const DeleteButton = styled.button`
  width: 100px;
  height: 50px;
  text-align: center;
  line-height: 50px;
  background-color: coral;
  border-radius: 10px;
  cursor: pointer;
`;

type PropsType = CardPackType & AdditionalPropsType;//тут куча пропсов

type AdditionalPropsType = {
    deletePack: (id: string) => void
}

const Deck = ({_id, grade, name, shots, rating, deletePack, ...props}: PropsType) => {
    return (
        <DeckWrapper>
            <DeckName>{name}</DeckName>
            <DeckRating>{grade}</DeckRating>
            <DeckTags>{shots}</DeckTags>
            <DeleteButton onClick={() => deletePack(_id)}>delete</DeleteButton>
        </DeckWrapper>
    )
}

export default Deck