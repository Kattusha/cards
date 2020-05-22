import React from 'react';
import {H3} from "../../main/ui/style/commonStyle";
import {RecoveryPasswordReduxForm} from './RecoveryPasswordForm';
import {RecoveryPasswordForm} from "../../main/ui/style/forForms/formsStyle";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../main/bll/store";
import {recoveryPassword} from "./recoveryPassword-reducer";

const RecoveryPassword: React.FC = () => {

    const {isSendEmail, isLoading} = useSelector((store: AppStateType) => store.recoveryPassword);
    const dispatch = useDispatch();

    const onRecoveryPassword = ({email}: any) => {
        dispatch(recoveryPassword(email));
    }

    return (
        <RecoveryPasswordForm>
            {!isSendEmail?
            <>
                <H3>What's your email?</H3>
                <RecoveryPasswordReduxForm onSubmit={onRecoveryPassword} isLoading={isLoading}/>
            </>
                :
                <H3>Thanks! Check your email for instructions to reset your password.</H3>
            }

        </RecoveryPasswordForm>
    )
}

export default RecoveryPassword;
