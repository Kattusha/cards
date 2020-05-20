import React, {useEffect} from "react";
import styled from "styled-components/macro";
import {change, Field, WrappedFieldArrayProps} from "redux-form";
import {Span} from "../main/ui/style/commonStyle";
import {Input} from "../main/ui/components/forForms/FormsControls";
import {useDispatch} from "react-redux";
import {AddCardButton} from "../02-tables/cards/CardsOfDeck";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import SingleCardForm from "./singleCardForm";
import {CardType} from "../02-tables/api";

const FormStyled = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  padding: 30px 0;
  position: relative;
  &:hover {
   background-color: #32cdff;;
  }
`;

const Card = styled.div`
  font-size: 27px;
  height: 323px;
  margin-bottom: 30px;
  width: 280px;
  background-color: #fff;
  border-radius: 12.5%/10.8375%;
  box-shadow: 0 3px 10px 0 rgba(0,0,0,.18);
  display: flex;
  cursor: text;
  justify-content: center;
  align-items: center;
  text-align: center;
  word-break: break-all;
  word-wrap: break-word;
  &:hover {
    box-shadow: 0 0 10px 4px #32cdff
  };
  &:focus {
    outline: none
  };
  &:empty::before {
    content: attr(placeholder);
    color: gray;
  };
  &:empty:focus::before {
    content: "";
  };
  &:empty:focus {
    line-height: 323px;
  }
`;

const InvisibleWrapper = styled.div`
  display: none;
`;

const AddCardButtonEditor = styled(AddCardButton)`
  right: 20px;
  left: auto;
`;

const DeleteCard = styled.button`
  position: absolute;
  top: 20%;
  right: 3%;
  color: #32cdff;
  border-radius: 100%;
  font-size: 30px;
  border: none;
  background-color: white;
  height: 45px;
  width: 45px;
  line-height: 45px;
  cursor: pointer;
  outline: none;
  &:hover {
    color: white;
    background-color: #32cdff;;
  }
`;

type PropsType = {
    error?: string,
    cards: Array<CardType>
}

const CardsEditor: React.FC<PropsType & WrappedFieldArrayProps> = ({fields, meta: {error}, cards}) => {

    useEffect(() => {
        fields.push({})
    }, [])
    console.log(cards.length === 0)
    return (
        <>
            {cards.length !== 0 ?
                cards.map((card, index) =>
                    <SingleCardForm cardForEdit={card} index={index} fields={fields} error={error} key={index}/>
                ) :
                fields.map((card, index) =>
                <SingleCardForm card={card} index={index} fields={fields} error={error} key={index}/>
            )}
            <AddCardButtonEditor type="button" onClick={() => fields.push({})}>+</AddCardButtonEditor>
        </>
    );
};

export default CardsEditor