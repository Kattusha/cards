import {Field, InjectedFormProps, reduxForm} from "redux-form";
import React from "react";
import {Input} from "../../../main/ui/components/forForms/FormsControls";
import {Button, Span} from "../../../main/ui/style/commonStyle";
import {FormStyled} from "../../../main/ui/style/forForms/formControlsStyle";
import {emailValidation, maxLength8, requiredField} from "../../../main/ui/components/forForms/validators";
import Preloader from "../../../main/ui/components/preloader/Preloader";

type PropsType = {
    isLoading: boolean
}
export type SignInFormDataType = {
    email: string
    password: string
}

const SignInForm: React.FC<PropsType & InjectedFormProps<SignInFormDataType, PropsType>> =
    ({error, handleSubmit, isLoading, invalid, ...props}) => {
        return (
            <FormStyled onSubmit={handleSubmit}>
                <Field name="email" component={Input} type="email" placeholder="Email"
                       validate={[emailValidation, requiredField]}
                />
                <Field name="password" component={Input} type="password" placeholder="Password"
                       validate={[requiredField, maxLength8]}
                />
                {error && <Span color={"red"}>{error}</Span>}
                {isLoading ?
                    <Preloader isLoading={isLoading}/>
                    : <Button color={"blue"} disabled={invalid || isLoading}>Sign Up</Button>}
            </FormStyled>
        );
    };

export const SignInReduxForm = reduxForm<SignInFormDataType, PropsType>({form: 'signIn'})(SignInForm)