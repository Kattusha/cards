import React, {useEffect} from "react";
import styled from "styled-components/macro";
import {change, Field, WrappedFieldArrayProps} from "redux-form";
import {Span} from "../main/ui/style/commonStyle";
import {Input} from "../main/ui/components/forForms/FormsControls";
import {useDispatch} from "react-redux";
import {AddCardButton} from "../02-tables/cards/CardsOfDeck";

const FormStyled = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  padding: 30px 0;
  &:hover {
   background-color: antiquewhite;
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

const InvisibleTextArea = styled(Input)`
  display: none;
`;

const AddCardButtonEditor = styled(AddCardButton)`
  right: 20px;
  left: auto;
`;

type PropsType = {
    error: string
}

const CardsEditor: React.FC<WrappedFieldArrayProps<{}>> = ({fields, meta: {error}}) => {

    const dispatch = useDispatch();

    useEffect(() => {
        fields.push({})
    }, [])

    const onChangeQuestion = (e: React.FormEvent<HTMLDivElement>, name: string) => {
        const value = e.currentTarget.textContent;
        dispatch(change("editor", name, value ? value : ''))
    };
    const onChangeAnswer = (e: React.FormEvent<HTMLDivElement>, name: string) => {
        const value = e.currentTarget.textContent;
        dispatch(change("editor", name, value ? value : ''));
    };

    return (
        <>
            {fields.map((card, index) =>
                <FormStyled key={index}>
                    <Field name={`${card}.question`} component={InvisibleTextArea} type="text"/>
                    <Card contentEditable={true} placeholder={'QUESTION'} onInput={e => onChangeQuestion(e, `${card}.question`)}/>
                    {error && <Span color={"red"}>{error}</Span>}
                    <Field name={`${card}.answer`} component={InvisibleTextArea} type="text"/>
                    <Card contentEditable={true} placeholder={'ANSWER'} onInput={e => onChangeAnswer(e, `${card}.answer`)}/>
                    {error && <Span color={"red"}>{error}</Span>}
                </FormStyled>
            )}
            <AddCardButtonEditor onClick={() => fields.push({})}>+</AddCardButtonEditor>
        </>
    );
};

export default CardsEditor