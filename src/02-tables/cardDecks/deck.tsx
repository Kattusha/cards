import React from "react";
import styled from "styled-components/macro";

const DeckWrapper = styled.div`
  height: 100px;
  margin-bottom: 10px;
  box-shadow: 0 0 0 3px #f7f7f7;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  cursor: pointer;
`;

const DeckName = styled.div`
  text-align: center;
  font-size: 21px;
`;

const DeckRating = styled(DeckName)`
  
`;

const DeckTags = styled(DeckName)`
  
`;

type DeckPropsType = {
    name: string,
    grade: string,
    tags: string,
}

const Deck = ({name, grade, tags}: DeckPropsType) => {
    return (
        <DeckWrapper>
            <DeckName>{name}</DeckName>
            <DeckRating>{grade}</DeckRating>
            <DeckTags>{tags}</DeckTags>
        </DeckWrapper>
    )
}

export default Deck