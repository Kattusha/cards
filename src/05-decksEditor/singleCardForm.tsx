import React, {useEffect, useRef} from "react";
import styled from "styled-components/macro";
import {change, Field, formValueSelector} from "redux-form";
import {Span} from "../main/ui/style/commonStyle";
import {Input} from "../main/ui/components/forForms/FormsControls";
import {connect, useDispatch} from "react-redux";
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
    name?: string,
    cardForEdit?: CardType,
    singleCardMode?: boolean,
    deleteCard?: (index: number) => void
};

type MapStateToPropsType = {
    question?: string,
    answer?: string
}

const SingleCardForm: React.FC<MapStateToPropsType & PropsType> =
    ({
         error, index, cardForEdit, name,
         singleCardMode, deleteCard, question, answer
     }) => {

        const dispatch = useDispatch();

        const questionRef = useRef<HTMLDivElement>(null);
        const answerRef = useRef<HTMLDivElement>(null);

        const formName = singleCardMode ? 'card editor' : 'editor';
        console.log(question, answer)
        useEffect(() => {
            if (question) {
                questionRef.current!.innerText = question;
            }
            if (answer) {
                answerRef.current!.innerText = answer;
            }
            if (cardForEdit && !answer && !question) {
                dispatch(change(formName, `${name}.question`, cardForEdit.question));
                dispatch(change(formName, `${name}.answer`, cardForEdit.answer));
                dispatch(change(formName, `${name}.id`, cardForEdit._id));
                questionRef.current!.innerText = cardForEdit.question;
                answerRef.current!.innerText = cardForEdit.answer;
            }
        });

        const onBlurHandler = (e:  React.FocusEvent<HTMLDivElement>, name: string) => {
            const value = e.currentTarget.textContent;
            dispatch(change(formName, name, value));
        }

        return (
            <FormStyled key={index}>
                {cardForEdit &&
                <InvisibleWrapper>
                    <Field name={`${name}.id`} component={Input} type="hidden"/>
                </InvisibleWrapper>}
                <InvisibleWrapper>
                    <Field name={`${name}.question`} component={Input} type="hidden"/>
                </InvisibleWrapper>
                <Card contentEditable={true} placeholder={cardForEdit ? '' : 'QUESTION'}
                      ref={questionRef} onBlur={e =>onBlurHandler(e, `${name}.question`)}/>
                {error && <Span color={"red"}>{error}</Span>}
                <InvisibleWrapper>
                    <Field name={`${name}.answer`} component={Input} type="hidden"/>
                </InvisibleWrapper>
                <Card contentEditable={true} placeholder={cardForEdit ? '' : 'ANSWER'}
                      ref={answerRef} onBlur={e =>onBlurHandler(e, `${name}.answer`)}/>
                {error && <Span color={"red"}>{error}</Span>}
                {typeof index === 'number' &&
                <DeleteCard type="button" onClick={() => deleteCard!(index!)}>
                    <FontAwesomeIcon icon="trash"/>
                </DeleteCard>}
            </FormStyled>
        );
    };

const ConnectedSingleCardForm = connect<MapStateToPropsType>((state, props: PropsType) => {
        const selector = formValueSelector(props.singleCardMode ? 'card editor' : 'editor');
        return {
            question: selector(state, `${props.name}.question`),
            answer: selector(state, `${props.name}.answer`)
        }
    }
)(SingleCardForm);

export default React.memo(ConnectedSingleCardForm)