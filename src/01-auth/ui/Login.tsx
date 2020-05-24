import React from 'react';
import {H3, Span, TextLink} from "../../main/ui/style/commonStyle";
import {LoginForm} from "../../main/ui/style/forForms/formsStyle";
import {LoginFormDataType, LoginReduxForm} from "./ReduxForm/LoginForm";
import {SIGN_IN_PATH} from "../../main/ui/components/Body";

type PropsType = {
    isLoading: boolean
    submitFnc: ({email, password, rememberMe}: LoginFormDataType) => void
}

const Login: React.FC<PropsType> = ({isLoading, submitFnc}) => {
    return (
        <LoginForm>
            <H3>Log in with your account</H3>
            <Span>Don't have an account?<TextLink to={SIGN_IN_PATH}>Sign in</TextLink></Span>
            <LoginReduxForm onSubmit={submitFnc} isLoading={isLoading}/>
        </LoginForm>
    )
}

export default Login
