import {Field, InjectedFormProps, reduxForm} from "redux-form";
import React from "react";
import {Input} from "../../main/ui/components/forForms/FormsControls";
import {Button, Span} from "../../main/ui/style/commonStyle";
import { FormStyled } from "../../main/ui/style/forForms/formControlsStyle";
import {emailValidation, requiredField} from "../../main/ui/components/forForms/validators";
import Preloader from "../../main/ui/components/Preloader";

type IFormProps = {
    email: string;
    password: string;
}

type IPassProps = {
    regInProgress: boolean
}

const SignInForm = ({error, handleSubmit, regInProgress}: IPassProps & InjectedFormProps<IFormProps, IPassProps>) => {
    return (
        <FormStyled onSubmit={handleSubmit}>
            <Field name="email" component={Input} type="email" placeholder="Email"
                   validate={[emailValidation, requiredField]}
            />
            <Field name="password" component={Input} type="password" placeholder="Password"
                   validate={[requiredField]}
            />
            {error && <Span color={"red"}>{error}</Span>}
            {regInProgress ? <Preloader/> :
                <Button color={"blue"}>Sign Up</Button>}
        </FormStyled>
    );
};

export const SignInReduxForm = reduxForm<IFormProps, IPassProps>({form: 'signIn'})(SignInForm)