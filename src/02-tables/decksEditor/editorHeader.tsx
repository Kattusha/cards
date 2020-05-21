import React from "react";
import styled from "styled-components/macro";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Span} from "../../main/ui/style/commonStyle";
import {Input} from "../../main/ui/components/forForms/FormsControls";

const FormStyled = styled.form`
  height: 34px;
  width: 100%;
  font-size: 30px;
  font-weight: bold;
`;

type PropsType = {

}

const EditorHeader: React.FC<InjectedFormProps>  =
    ({error, handleSubmit}) => {
        return (
            <FormStyled onSubmit={handleSubmit}>
                <Field name="Deck name" component={Input} type="Deck name" placeholder={'Deck name'}/>
                {error && <Span color={"red"}>{error}</Span>}
            </FormStyled>
        );
    };

export const EditorHeaderReduxForm = reduxForm<{}, PropsType>({form: 'edit deck'})(EditorHeader)