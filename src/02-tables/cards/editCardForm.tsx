import React from "react";
import styled from "styled-components/macro";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input} from "../../main/ui/components/forForms/FormsControls";
import {Button, Span} from "../../main/ui/style/commonStyle";
import Preloader from "../../main/ui/components/preloader/Preloader";
import {CardType} from "../api/entities-cardsAPI";

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
    modalType: string
    card?: CardType
}

const EditCardForm: React.FC<PropsType & InjectedFormProps<{}, PropsType>>  =
    ({error, handleSubmit, isLoading, card, modalType}) => {
        return (
            <FormStyled onSubmit={handleSubmit}>
                <FieldName>Question</FieldName>
                <Field name="question" component={StyledField} type="Question" placeholder={card ? card!.question : ''}/>
                {error && <Span color={"red"}>{error}</Span>}
                <FieldName>Answer</FieldName>
                <Field name="answer" component={StyledField} type="Answer" placeholder={card ? card!.answer : ''}/>
                {error && <Span color={"red"}>{error}</Span>}
                {isLoading && <Preloader size={30} backColor="#fff" frontColor="#32cdff" isLoading={isLoading}/>}
                <StyledButton color={"blue"} disabled={isLoading}>
                    {modalType === 'edit' ? 'Submit changes' : 'Add card'}
                </StyledButton>
            </FormStyled>
        );
    };

export const EditCardReduxForm = reduxForm<{}, PropsType>({form: 'add or edit card'})(EditCardForm)
