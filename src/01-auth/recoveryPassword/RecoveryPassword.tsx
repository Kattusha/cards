import React from 'react';
import {H3, Span} from "../../main/ui/style/commonStyle";
import {RecoveryPasswordReduxForm} from './RecoveryPasswordForm';
import {RecoveryPasswordForm} from "../../main/ui/style/forForms/formsStyle";

const RecoveryPassword = () => {
    return (
        <RecoveryPasswordForm>
            <H3>What's your email?</H3>
            <RecoveryPasswordReduxForm />
        </RecoveryPasswordForm>
    )
}

export default RecoveryPassword;
