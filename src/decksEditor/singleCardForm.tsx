import React, {useEffect, useRef} from "react";
import styled from "styled-components/macro";
import {change, Field} from "redux-form";
import {Span} from "../main/ui/style/commonStyle";
import {Input} from "../main/ui/components/forForms/FormsControls";
import {useDispatch} from "react-redux";
import {AddCardButton} from "../02-tables/cards/CardsOfDeck";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
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
    index?: number,
    card?: string,
    deleteCard?: (index: number) => void,
    cardForEdit?: CardType,
}

const SingleCardForm: React.FC<PropsType> =
    ({error, index, card, cardForEdit, deleteCard}) => {

        const dispatch = useDispatch();

        const questionFieldName = cardForEdit ? `${cardForEdit._id}.question` : `${card}.question`;
        const answerFieldName = cardForEdit ? `${cardForEdit._id}.answer` : `${card}.answer`;

        const questionRef = useRef<HTMLDivElement>(null);
        const answerRef = useRef<HTMLDivElement>(null);

        useEffect(() => {
            if (cardForEdit) {
                dispatch(change("editor", questionFieldName, cardForEdit.question));
                dispatch(change("editor", answerFieldName, cardForEdit.answer));
                questionRef.current!.innerText = cardForEdit.question;
                answerRef.current!.innerText = cardForEdit.answer;
            }
        }, [cardForEdit]);

        const onChangeQuestion = (e: React.FormEvent<HTMLDivElement>, name: string) => {
            const value = e.currentTarget.textContent;
            dispatch(change("editor", name, value ? value : ''))
        };
        const onChangeAnswer = (e: React.FormEvent<HTMLDivElement>, name: string) => {
            const value = e.currentTarget.textContent;
            dispatch(change("editor", name, value ? value : ''));
        };

        return (
            <FormStyled key={index}>
                <InvisibleWrapper>
                    <Field name={questionFieldName} component={Input} type="hidden"/>
                </InvisibleWrapper>
                <Card contentEditable={true} placeholder={cardForEdit ? '' : 'QUESTION'}
                      onInput={e => onChangeQuestion(e, questionFieldName)} ref={questionRef}/>
                {error && <Span color={"red"}>{error}</Span>}
                <InvisibleWrapper>
                    <Field name={answerFieldName} component={Input} type="hidden"/>
                </InvisibleWrapper>
                <Card contentEditable={true} placeholder={cardForEdit ? '' : 'ANSWER'}
                      onInput={e => onChangeAnswer(e, answerFieldName)} ref={answerRef}/>
                {error && <Span color={"red"}>{error}</Span>}
                {typeof index === 'number' &&
                <DeleteCard type="button" onClick={() => deleteCard!(index!)} onMouseOver={() => console.log(index)}>
                    <FontAwesomeIcon icon="trash"/>
                </DeleteCard>}
            </FormStyled>
        );
    };

export default SingleCardForm