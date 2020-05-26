import {Field, InjectedFormProps, reduxForm} from "redux-form";
import React from "react";
import {Input} from "../../../main/ui/components/forForms/FormsControls";
import {Button, Span, TextLink} from "../../../main/ui/style/commonStyle";
import {FormStyled, InputCheckBoxDiv} from "../../../main/ui/style/forForms/formControlsStyle";
import {emailValidation, maxLength8, requiredField} from "../../../main/ui/components/forForms/validators";
import Preloader from "../../../main/ui/components/preloader/Preloader";
import {MAIN_PATH} from "../../../main/ui/components/Body";

type PropsType = {
    isLoading: boolean
    openRecoveryModal: () => void
}
export type LoginFormDataType = {
    email: string
    password: string
    rememberMe: boolean
}

const LoginForm: React.FC<PropsType & InjectedFormProps<LoginFormDataType, PropsType>> =
    ({error, handleSubmit, invalid, isLoading, openRecoveryModal, ...props}) => {
        return (
            <FormStyled onSubmit={handleSubmit}>
                <Field name="email" component={Input} type="email" placeholder="Email"
                       validate={[emailValidation, requiredField]}/>
                <Field name="password" component={Input} type="password" placeholder="Password"
                       validate={[requiredField, maxLength8]}/>
                <InputCheckBoxDiv>
                    <Field name="rememberMe" component={Input} type="checkbox"/>remember me
                </InputCheckBoxDiv>

                {error && <Span color={"red"}>{error}</Span>}
                {isLoading && <Preloader isLoading={isLoading}/>}

                <TextLink to={MAIN_PATH} onClick={openRecoveryModal}>Forgot password?</TextLink>
                <Button color={"blue"} disabled={invalid || isLoading}>Log in</Button>
            </FormStyled>
        );
    };

export const LoginReduxForm = reduxForm<LoginFormDataType, PropsType>({form: 'login'})(LoginForm)