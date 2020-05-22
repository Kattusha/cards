import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input} from "../../main/ui/components/forForms/FormsControls";
import {Button, Span} from "../../main/ui/style/commonStyle";
import Preloader from "../../main/ui/components/preloader/Preloader";
import styled from "styled-components/macro";

type PropsType = {
    isLoading: boolean
}

const FormStyled = styled.form`
    display: flex;
    flex-direction: column;
    max-width: 300px;
    text-align: center;
    margin: 0 auto;
    margin-bottom: 30px;
`;

const AddDeckForm: React.FC<PropsType & InjectedFormProps<{}, PropsType>>  =
    ({error, handleSubmit, isLoading, ...props}) => {
        return (
            <FormStyled onSubmit={handleSubmit}>
                <Field name="name" component={Input} type="Name" placeholder="Name"/>
                {error && <Span color={"red"}>{error}</Span>}
                {isLoading && <Preloader size={30} backColor="#fff" frontColor="#32cdff" isLoading={isLoading}/>}
                <Button color={"blue"} disabled={isLoading}>Add deck</Button>
            </FormStyled>
        );
    };

export const AddDeckReduxForm = reduxForm<{}, PropsType>({form: 'add deck'})(AddDeckForm)