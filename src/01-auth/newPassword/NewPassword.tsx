import React from 'react';
import {H3, Span} from "../../main/ui/style/commonStyle";
import {LoginForm, NewPasswordForm} from "../../main/ui/style/forForms/formsStyle";
import {LoginReduxForm} from "../login/LoginForm";
import {NewPasswordReduxForm} from "./NewPasswordForm";

const NewPassword = () => {
    return (
        <NewPasswordForm>
            <H3>Enter new password</H3>
            <NewPasswordReduxForm />
        </NewPasswordForm>
    )
}

export default NewPassword;
