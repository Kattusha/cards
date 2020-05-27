import React from 'react';
import {H3, Span, TextLink} from "../../main/ui/style/commonStyle";
import {LoginForm} from "../../main/ui/style/forForms/formsStyle";
import {LoginFormDataType, LoginReduxForm} from "./ReduxForm/LoginForm";
import {DEV_VERSION} from "../../config";

type PropsType = {
    isLoading: boolean
    openSignInModal: () => void
    openRecoveryModal: () => void
    submitFnc: ({email, password, rememberMe}: LoginFormDataType) => void
}

const Login: React.FC<PropsType> = ({isLoading, submitFnc, openSignInModal, openRecoveryModal}) => {

    DEV_VERSION && console.log(`RENDER Login`);
    return (
        <>
            <LoginForm>
                <H3>Log in with your account</H3>
                <Span>Don't have an account?
                    <TextLink to={'/'/*SIGN_IN_PATH*/} onClick={openSignInModal}>Sign in</TextLink>
                </Span>
                <LoginReduxForm onSubmit={submitFnc} isLoading={isLoading} openRecoveryModal={openRecoveryModal}/>
            </LoginForm>


        </>
    )
}

export default Login
