import React from "react";
import styled from "styled-components/macro";
import {CardPackType} from "../02-tables/api";
import {NavLink} from "react-router-dom";
import {DeckCover} from "../02-tables/cards/DeckInfo";
import noDeckCover from "../main/ui/images/no-deck-cover.jpg";

const DeckBlock = ({_id, name, grade, shots, rating, ...props}: CardPackType) => {
    // debugger
    return (
        <DeckBlockWrapper as={NavLink} to={`/deck/${name}/cards/${_id}`}>
            <DeckCoverWrapper>
                <DeckCover src={noDeckCover} alt="deck cover"/>
            </DeckCoverWrapper>
            <p>{name}</p>
            <span>{grade} {shots} {rating}</span>
        </DeckBlockWrapper>
    )
}
export default DeckBlock

//styles
const DeckBlockWrapper = styled.div`
  font-family: 'DINNextLTPro-Medium';
  font-size: 15px;
  margin: 0 1.5% 40px 1.5%;
  width: 144px;
  color: #5c5c5c;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-decoration: none;
  opacity: .7;
  &:hover{
    opacity: 1;
    outline:none;
    //border: 1px solid #32cdff;
  }
`;
const DeckCoverWrapper = styled.div`
  box-shadow: 0 2px 6px rgba(0,0,0,.1), 0 6px 0 -1px #fff, 0 7px 6px rgba(0,0,0,.1), 0 11px 0 -1px #fff, 0 12px 6px rgba(0,0,0,.1);
  border-radius: 5px;
  margin-bottom: 10px;
`;