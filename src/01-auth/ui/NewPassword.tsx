import React from 'react';
import {H3} from "../../main/ui/style/commonStyle";
import {NewPasswordForm} from "../../main/ui/style/forForms/formsStyle";
import {NewPasswordFormDataType, NewPasswordReduxForm} from "./ReduxForm/NewPasswordForm";

type NewPasswordType = {
    isLoading: boolean
    submitFnc: ({password, repeatPassword}: NewPasswordFormDataType) => void
}

const NewPassword: React.FC<NewPasswordType> = ({isLoading, submitFnc}) => {
    return (
        <NewPasswordForm>
            <H3>Enter new password</H3>
            <NewPasswordReduxForm onSubmit={submitFnc} isLoading={isLoading}/>
        </NewPasswordForm>
    )
}

export default NewPassword;
