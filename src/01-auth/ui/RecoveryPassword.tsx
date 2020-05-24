import React from 'react';
import {H3} from "../../main/ui/style/commonStyle";
import {RecoveryPasswordFormDataType, RecoveryPasswordReduxForm} from './ReduxForm/RecoveryPasswordForm';
import {RecoveryPasswordForm} from "../../main/ui/style/forForms/formsStyle";

type PropsType = {
    isSendEmail: boolean | null
    isLoading: boolean
    submitFnc: ({email}: RecoveryPasswordFormDataType) => void
}

const RecoveryPassword: React.FC<PropsType> = ({isLoading, isSendEmail, submitFnc}) => {

    return (
        <RecoveryPasswordForm>
            {!isSendEmail?
            <>
                <H3>What's your email?</H3>
                <RecoveryPasswordReduxForm onSubmit={submitFnc} isLoading={isLoading}/>
            </>
                :
                <H3>Thanks! Check your email for instructions to reset your password.</H3>
            }
        </RecoveryPasswordForm>
    )
}

export default RecoveryPassword
