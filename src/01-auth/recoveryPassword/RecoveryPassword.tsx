import React, {useCallback, useEffect} from 'react';
import {H3} from "../../main/ui/style/commonStyle";
import {RecoveryPasswordReduxForm} from './RecoveryPasswordForm';
import {RecoveryPasswordForm} from "../../main/ui/style/forForms/formsStyle";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../main/bll/store";
import {useHistory} from "react-router-dom";
import {newPasswordPath} from "../../main/ui/components/Body";
import {recoveryPassword} from "./recoveryPassword-reducer";

const RecoveryPassword: React.FC = () => {

    const isSendEmail = useSelector((store: AppStateType) => store.recoveryPassword.isSendEmail);
    const isLoading = useSelector((store: AppStateType) => store.recoveryPassword.isloading);
    const dispatch = useDispatch();
    const history = useHistory();

    const onRecoveryPassword = useCallback(({email}: any) => {
        dispatch(recoveryPassword(email));
    }, []);

    useEffect(() => {
        if (isSendEmail)
            history.push(newPasswordPath)
    }, [isSendEmail])

    return (
        <RecoveryPasswordForm>
            <H3>What's your email?</H3>
            <RecoveryPasswordReduxForm onSubmit={onRecoveryPassword} isLoading={isLoading}/>
        </RecoveryPasswordForm>
    )
}

export default RecoveryPassword;
