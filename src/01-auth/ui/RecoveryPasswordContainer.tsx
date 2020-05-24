import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../main/bll/store";
import RecoveryPassword from "./RecoveryPassword";

const RecoveryPasswordContainer: React.FC = () => {

    const dispatch = useDispatch();
    const {isSendEmail} = useSelector((store: AppStateType) => store.recoveryPassword);
    const {isLoading} = useSelector((store: AppStateType) => store.requestStatus);

    const recoveryPassword = ({email}: any) => {
        dispatch(recoveryPassword(email));
    }

    return <RecoveryPassword isSendEmail={isSendEmail} isLoading={isLoading} submitFnc={recoveryPassword}/>
}

export default RecoveryPasswordContainer;
