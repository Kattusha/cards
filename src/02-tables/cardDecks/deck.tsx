import React from "react";
import styled from "styled-components/macro";
import {InfoHeader, Name} from "./cardDecks";
import {NavLink} from "react-router-dom";
import {CardPackType} from "../api/entities-decksAPI";

export const DeckWrapper = styled.div`
  padding: 10px 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-top: 2px solid #e8e8e8;
  background-color: #fff;
  &:hover {
        filter: brightness(95%);
    }
`;

// const DeleteButton = styled.button`
//   width: 100px;
//   height: 50px;
//   margin-left: 5px;
//   text-align: left;
//   line-height: 50px;
//   background-color: coral;
//   border-radius: 10px;
//   cursor: pointer;
// `;

export const ActionsMenu = styled.div`
  display: flex;
  flex-flow: column;
  font-size: 15px;
`;

export const Action = styled.div<{ backgroundColor: string }>`
  border-radius: 10px;
  cursor: pointer;
  background-color: ${props => props.backgroundColor};
  padding: 2px 15px;
  margin-bottom: 5px;
  font-size: 14px;
  
  &:hover {
   //color: #32cdff;
   opacity: .8;
  }
`;
export const NameDeckNavLink = styled(NavLink)`
    font-family: 'DINNextLTPro-Bold';
    //font-size: 15px;
    color: #32cdff;
    text-decoration: none;
    opacity: .8;
    cursor: pointer;
    
    &:hover {
        opacity: 1;
    }
`;

type PropsType = CardPackType & AdditionalPropsType;//тут куча пропсов

type AdditionalPropsType = {
    deletePack: (id: string) => void,
    editPack: (id: string) => void
}

const Deck = ({_id, name, grade, shots, rating, deletePack, editPack}: PropsType) => {
    return (
        <DeckWrapper>
            <Name>
                <NameDeckNavLink to={`/profile/cards/${_id}`}>
                    {name}
                </NameDeckNavLink>
            </Name>
            <InfoHeader>{grade}</InfoHeader>
            <InfoHeader>{shots}</InfoHeader>
            <InfoHeader>{rating}</InfoHeader>
            <ActionsMenu>
                <Action backgroundColor={"#ff506480"} onClick={() => deletePack(_id)}>Delete</Action>
                <Action backgroundColor={"#ffff0080"} onClick={() => editPack(_id)}>Change</Action>
            </ActionsMenu>
        </DeckWrapper>
    )
}

export default Deck