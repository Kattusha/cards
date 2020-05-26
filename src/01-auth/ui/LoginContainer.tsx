import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {logIn} from "../bll/login-reducer";
import {AppStateType} from "../../main/bll/store";
import {Redirect} from "react-router-dom";
import {PROFILE_PATH} from "../../main/ui/components/Body";
import Login from "./Login";

type PropsType = {
    openSignInModal: () => void
    closeLogInModal: () => void
    openRecoveryModal: () => void
}

const LoginContainer: React.FC<PropsType> = ({openSignInModal, closeLogInModal, openRecoveryModal}) => {

    const dispatch = useDispatch();
    const {isAuthorized} = useSelector((store: AppStateType) => store.login);
    const {isLoading} = useSelector((store: AppStateType) => store.requestStatus);

    const login = ({email, password, rememberMe}: any) => {
        dispatch(logIn(email, password, rememberMe));
    }

    if (isAuthorized) {
        closeLogInModal();
        return <Redirect to={PROFILE_PATH}/>
    }

    return <Login submitFnc={login} isLoading={isLoading}
                  openSignInModal={openSignInModal}
                  openRecoveryModal={openRecoveryModal}
    />
}

export default LoginContainer;
