import React from "react";
import styled from "styled-components/macro";

const HeaderWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
`;

const CardsEditorWrapper = styled.div`
  width: 70%;
  display: flex;
  justify-content: space-around;
  padding: 30px 0;
  &:hover {
   background-color: antiquewhite;
  }
`;


const CardDecksContainer = () => {
    return (
        <>
            <HeaderWrapper>

            </HeaderWrapper>
            <CardsEditorWrapper>

            </CardsEditorWrapper>
        </>
    )
};

export default CardDecksContainer