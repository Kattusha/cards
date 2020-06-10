import {Field, InjectedFormProps, reduxForm} from "redux-form";
import React from "react";
import {Input, Textarea} from "../main/ui/components/forForms/FormsControls";
import {Button, Span} from "../main/ui/style/commonStyle";
import {FormStyled} from "../main/ui/style/forForms/formControlsStyle";
import {emailValidation, maxLength8, requiredField} from "../main/ui/components/forForms/validators";
import Preloader from "../main/ui/components/preloader/Preloader";
import styled from "styled-components/macro";

type PropsType = {
    isLoading: boolean
}
export type CreateMessageFormDataType = {
    message: string
}

const CreateMessageForm: React.FC<PropsType & InjectedFormProps<CreateMessageFormDataType, PropsType>> =
    ({error, handleSubmit, isLoading, invalid, ...props}) => {
        return (
            <CreateMessageFormStyled onSubmit={handleSubmit}>
                <Field name="message" component={Textarea} placeholder="Write a new message"
                       validate={[requiredField]}
                />
                {error && <Span color={"red"}>{error}</Span>}
                {isLoading ?
                    <Preloader isLoading={isLoading}/>
                    : <Button color={"blue"} disabled={invalid || isLoading}>Send message</Button>}
            </CreateMessageFormStyled>
        );
    };

export const CreateMessageReduxForm = reduxForm<CreateMessageFormDataType, PropsType>({form: 'createMessage'})(CreateMessageForm)

export const CreateMessageFormStyled = styled(FormStyled)`
    align-items: flex-start;
`;