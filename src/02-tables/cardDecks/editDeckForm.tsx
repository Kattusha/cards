import React from "react";
import styled from "styled-components/macro";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input} from "../../main/ui/components/forForms/FormsControls";
import {Button, Span} from "../../main/ui/style/commonStyle";
import Preloader from "../../main/ui/components/preloader/Preloader";
import {DeckType} from "../api/entities-decksAPI";

const FormStyled = styled.form`
    display: flex;
    flex-direction: column;
    width: 400px;
    text-align: center;
    margin: 0 auto ;
`;

const FieldName = styled.div`
    margin: 10px auto;
    color: #32cdff;
    font-weight: bold;
    font-size: 20px;
`;

const StyledButton = styled(Button)`
    width: 200px;
    margin: 10px auto;
`;

const StyledField = styled(Input)`
    padding: 10px 0;
    width: 300px;
`;


type PropsType = {
    isLoading: boolean,
    deck?: DeckType
}

const EditDeckForm: React.FC<PropsType & InjectedFormProps<{}, PropsType>> =
    ({error, handleSubmit, isLoading, deck}) => {
        return (
            <FormStyled onSubmit={handleSubmit}>
                <FieldName>Deck name</FieldName>
                <Field name="name" component={StyledField} type="Name" placeholder={deck!.name}/>
                {error && <Span color={"red"}>{error}</Span>}
                {isLoading && <Preloader size={30} backColor="#fff" frontColor="#32cdff" isLoading={isLoading}/>}
                <StyledButton color={"blue"} disabled={isLoading}>Submit changes</StyledButton>
            </FormStyled>
        );
    };

export const EditDeckReduxForm = reduxForm<{}, PropsType>({form: 'edit deck'})(EditDeckForm)
