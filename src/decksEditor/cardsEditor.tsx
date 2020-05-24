import React from "react";
import styled from "styled-components/macro";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Span} from "../main/ui/style/commonStyle";
import {Input} from "../main/ui/components/forForms/FormsControls";

const FormStyled = styled.form`
  width: 70%;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  padding: 30px 0;
  &:hover {
   background-color: antiquewhite;
  }
`;

const Card = styled.input`
  width: 240px;
  min-height: 276px;
  border-radius: 25px;
  box-shadow: 0 0 10px 4px rgba(0,0,0,.18);
  border: none;
  box-sizing: border-box;
  resize: none;
  &:hover {
    box-shadow: 0 0 10px 4px #32cdff
  }
`;

type PropsType = {

}

const CardsEditor: React.FC<InjectedFormProps>  =
    ({error, handleSubmit}) => {
        return (
            <FormStyled onSubmit={handleSubmit}>
                <Field name="Question" component={Card} type="Question" placeholder={'Question'}/>
                {error && <Span color={"red"}>{error}</Span>}
                <Field name="Answer" component={Card} type="Answer" placeholder={'Answer'}/>
                {error && <Span color={"red"}>{error}</Span>}
            </FormStyled>
        );
    };

export const CardsEditorReduxForm = reduxForm<{}, PropsType>({form: 'edit card'})(CardsEditor)