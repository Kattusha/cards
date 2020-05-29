import React, {useEffect, useRef} from "react";
import styled from "styled-components/macro";
import {change, Field} from "redux-form";
import {Span} from "../main/ui/style/commonStyle";
import {Input} from "../main/ui/components/forForms/FormsControls";
import {useDispatch} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {CardType} from "../02-tables/api/entities-cardsAPI";

const FormStyled = styled.div`
  width: 100%;
  min-width: 650px;
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

const DeleteCard = styled.button`
  position: absolute;
  top: 20%;
  right: 1%;
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
    deleteCard?: (index: number, fullCardName: string) => void,
    cardForEdit?: CardType,
    singleCardMode?: boolean
}

const SingleCardForm: React.FC<PropsType> =
    ({error, index, cardForEdit, deleteCard, singleCardMode}) => {

        const dispatch = useDispatch();

        const fullCardName = cardForEdit && cardForEdit._id ? `editedCards` :  `newCards`;
        const questionFieldName = cardForEdit && cardForEdit._id && !singleCardMode ? `editedCards[${index}].question`
            : singleCardMode ? 'question' : `newCards[${index}].question` ;
        const answerFieldName = cardForEdit && cardForEdit._id && !singleCardMode ? `editedCards[${index}].answer`
            : singleCardMode ? 'answer' : `newCards[${index}].answer`;

        const questionRef = useRef<HTMLDivElement>(null);
        const answerRef = useRef<HTMLDivElement>(null);

        const formName = singleCardMode ? 'card editor' : 'editor';

        useEffect(() => {
            if (cardForEdit && cardForEdit._id) {
                dispatch(change(formName, questionFieldName, cardForEdit.question));
                dispatch(change(formName, answerFieldName, cardForEdit.answer));
                dispatch(change(formName, `editedCards[${index}].id`, cardForEdit._id));
                questionRef.current!.innerText = cardForEdit.question;
                answerRef.current!.innerText = cardForEdit.answer;
            }
        }, [cardForEdit]);

        const onChangeQuestion = (e: React.FormEvent<HTMLDivElement>, name: string) => {
            const value = e.currentTarget.textContent;
            dispatch(change(formName, name, value))
        };
        const onChangeAnswer = (e: React.FormEvent<HTMLDivElement>, name: string) => {
            const value = e.currentTarget.textContent;
            dispatch(change(formName, name, value));
        };

        return (
            <FormStyled key={index}>
                {cardForEdit && cardForEdit._id &&
                <InvisibleWrapper>
                    <Field name={`editedCards[${index}].id`} component={Input} type="hidden"/>
                </InvisibleWrapper>}
                <InvisibleWrapper>
                    <Field name={questionFieldName} component={Input} type="hidden"/>
                </InvisibleWrapper>
                <Card contentEditable={true} placeholder={cardForEdit && cardForEdit._id ? '' : 'QUESTION'}
                      onInput={e => onChangeQuestion(e, questionFieldName)} ref={questionRef}/>
                {error && <Span color={"red"}>{error}</Span>}
                <InvisibleWrapper>
                    <Field name={answerFieldName} component={Input} type="hidden"/>
                </InvisibleWrapper>
                <Card contentEditable={true} placeholder={cardForEdit && cardForEdit._id ? '' : 'ANSWER'}
                      onInput={e => onChangeAnswer(e, answerFieldName)} ref={answerRef}/>
                {error && <Span color={"red"}>{error}</Span>}
                {typeof index === 'number' &&
                <DeleteCard type="button" onClick={() => deleteCard!(index!,fullCardName)}>
                    <FontAwesomeIcon icon="trash"/>
                </DeleteCard>}
            </FormStyled>
        );
    };

export default React.memo(SingleCardForm)