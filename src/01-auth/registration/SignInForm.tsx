import {Field, InjectedFormProps, reduxForm} from "redux-form";
import React from "react";
import {Input} from "../../main/ui/components/forForms/FormsControls";
import {Button, Span} from "../../main/ui/style/commonStyle";
import {FormStyled} from "../../main/ui/style/forForms/formControlsStyle";
import {emailValidation, passwordValidation, requiredField} from "../../main/ui/components/forForms/validators";
import Preloader from "../../main/ui/components/preloader/Preloader";

type IPassProps = {
    regInProgress: boolean
}

const minLength7 = passwordValidation(7)

const SignInForm = ({error, handleSubmit, regInProgress, invalid}: IPassProps & InjectedFormProps<{}, IPassProps>) => {
    return (
        <FormStyled onSubmit={handleSubmit}>
            <Field name="email" component={Input} type="email" placeholder="Email"
                   validate={[emailValidation, requiredField]}
            />
            <Field name="password" component={Input} type="password" placeholder="Password"
                   validate={[requiredField, minLength7]}
            />
            {error && <Span color={"red"}>{error}</Span>}
            {regInProgress ?
                <Preloader size={30} backColor="#fff" frontColor="#32cdff" isLoading={regInProgress}/>
                : <Button color={"blue"} disabled={invalid || regInProgress}>Sign Up</Button>}
        </FormStyled>
    );
};

export const SignInReduxForm = reduxForm<{}, IPassProps>({form: 'signIn'})(SignInForm)