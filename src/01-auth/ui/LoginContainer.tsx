import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {logIn} from "../bll/login-reducer";
import {AppStateType} from "../../main/bll/store";
import {Redirect} from "react-router-dom";
import {MAIN_PATH, PROFILE_PATH} from "../../main/ui/components/Routes";
import Login from "./Login";
import {DEV_VERSION} from "../../config";
import {LoginFormDataType} from "./ReduxForm/LoginForm";

type PropsType = {
    openSignInModal: () => void
    closeLogInModal: () => void
    openRecoveryModal: () => void
}

const LoginContainer: React.FC<PropsType> =
    React.memo(({openSignInModal, closeLogInModal, openRecoveryModal}) => {

    const dispatch = useDispatch();
    const {isAuthorized} = useSelector((store: AppStateType) => store.login);
    const {isLoading} = useSelector((store: AppStateType) => store.requestStatus);

    const login = ({email, password, rememberMe}: LoginFormDataType) => {
        dispatch(logIn(email, password, rememberMe));
    }
    if (isAuthorized) {
        closeLogInModal();
        return <Redirect to={MAIN_PATH}/> /*<Redirect to={PROFILE_PATH}/>*/
    }

    DEV_VERSION && console.log(`RENDER LoginContainer`);
    return <Login submitFnc={login} isLoading={isLoading}
                  openSignInModal={openSignInModal}
                  openRecoveryModal={openRecoveryModal}
    />
})

export default LoginContainer;
