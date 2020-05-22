import {Field, InjectedFormProps, reduxForm} from "redux-form";
import React from "react";
import {Input} from "../../main/ui/components/forForms/FormsControls";
import {Button, Span, TextLink} from "../../main/ui/style/commonStyle";
import {FormStyled, InputCheckBoxDiv} from "../../main/ui/style/forForms/formControlsStyle";
import {emailValidation, maxLength, requiredField} from "../../main/ui/components/forForms/validators";
import Preloader from "../../main/ui/components/preloader/Preloader";
import {RECOVERY_PASSWORD_PATH} from "../../main/ui/components/Body";

type PropsType = {
    isLoading: boolean
}

const maxLength8 = maxLength(8);

const LoginForm: React.FC<PropsType & InjectedFormProps<{}, PropsType>>  =
    ({error, handleSubmit, invalid, isLoading, ...props}) => {
    return (
        <FormStyled onSubmit={handleSubmit}>
            <Field name="email" component={Input} type="email" placeholder="Email"
                   validate={[emailValidation, requiredField]} />
            <Field name="password" component={Input} type="password" placeholder="Password"
                   validate={[requiredField, maxLength8]} />
            <InputCheckBoxDiv>
                <Field name="rememberMe" component={Input} type="checkbox"/>remember me
            </InputCheckBoxDiv>

            {error && <Span color={"red"}>{error}</Span>}
            {isLoading && <Preloader size={30} backColor="#fff" frontColor="#32cdff" isLoading={isLoading}/>}

            <TextLink to={RECOVERY_PASSWORD_PATH}>Forgot password?</TextLink>
            <Button color={"blue"} disabled={invalid || isLoading}>Log in</Button>
        </FormStyled>
    );
};

export const LoginReduxForm = reduxForm<{}, PropsType>({form: 'login'})(LoginForm)