import {Field, InjectedFormProps, reduxForm} from "redux-form";
import React from "react";
import {Input} from "../../../main/ui/components/forForms/FormsControls";
import {Button, Span, FlexRowStart} from "../../../main/ui/style/commonStyle";
import {FormStyled} from "../../../main/ui/style/forForms/formControlsStyle";
import {
    emailValidation,
    maxLength8,
    passwordValidation,
    requiredField
} from "../../../main/ui/components/forForms/validators";
import Preloader from "../../../main/ui/components/preloader/Preloader";
import styled from "styled-components/macro";

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
                       validate={[requiredField, maxLength8, passwordValidation]}
                />
                <FlexRowStart>
                    <TextForPassword>Passwords must contain:
                        <Ul>
                            <li>a minimum of 8 characters in length</li>
                            <li>a minimum of 1 lower case letter [a-z] and</li>
                            <li>a minimum of 1 upper case letter [A-Z] and</li>
                            <li>a minimum of 1 numeric character [0-9] and</li>
                            <li>a minimum of 1 special character: !@#$%^&*</li>
                        </Ul>
                    </TextForPassword>
                </FlexRowStart>
                {error && <Span color={"red"}>{error}</Span>}
                {isLoading ?
                    <Preloader isLoading={isLoading}/>
                    : <Button color={"blue"} disabled={invalid || isLoading}>Sign Up</Button>}
            </FormStyled>
        );
    };

export const SignInReduxForm = reduxForm<SignInFormDataType, PropsType>({form: 'signIn'})(SignInForm)

export const TextForPassword = styled(Span)`
  text-align: start; 
  //font-family: 'DINNextLTPro-Bold';
  font-size: 14px;
  //color: #5c5c5c;
  margin-top: 30px;
`;

const Ul = styled.ul`
  padding-inline-start: 15px;
  margin-block-start: 5px;
  margin-block-end: 5px;
`;