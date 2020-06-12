import React from "react";
import styled from "styled-components/macro";
import {NavLink} from "react-router-dom";
import {DeckCover} from "../02-tables/cards/DeckInfo";
import noDeckCover from "../main/ui/images/no-deck-cover.jpg";
import {CardPackType} from "../02-tables/api/entities-decksAPI";
import {P_styled} from "../main/ui/style/commonStyle";
import {library} from "@fortawesome/fontawesome-svg-core";
import {far} from "@fortawesome/free-regular-svg-icons";
import {fas} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconDiv} from "../main/ui/style/headerStyle";

library.add(far, fas);

const DeckBlock = ({_id, name, grade, shots, rating, deckCover, cardsCount, ...props}: CardPackType) => {
    // debugger
    return (
        <DeckBlockWrapper as={NavLink} to={`/deck/${name}/cards/${_id}`}>
            <DeckCoverWrapper>
                <DeckCover src={noDeckCover || deckCover} alt="deck cover"/>
            </DeckCoverWrapper>
            <Div_FlexRowJustify>
                <P_styled color={'#5c5c5c'}>{name}</P_styled>
                <Span_styled><IconDiv><FontAwesomeIcon icon={['far', 'clone']}/></IconDiv>{cardsCount}</Span_styled>
            </Div_FlexRowJustify>
            {/*<span>{grade} {shots} {rating}</span>*/}
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
  opacity: 1;
  &:hover{
    opacity: .7;
    outline:none;
    //border: 1px solid #32cdff;
  }
`;
const DeckCoverWrapper = styled.div`
  box-shadow: 0 2px 6px rgba(0,0,0,.1), 0 6px 0 -1px #fff, 0 7px 6px rgba(0,0,0,.1), 0 11px 0 -1px #fff, 0 12px 6px rgba(0,0,0,.1);
  border-radius: 5px;
  margin-bottom: 10px;
`;

const Span_styled = styled.span`
    color: #c4c4c4;
    //margin-left: 1px;
`;
const Div_FlexRowJustify = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
