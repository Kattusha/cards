import React from 'react';
import {H3, Span, TextLink} from "../../main/ui/style/commonStyle";
import {LoginForm} from "../../main/ui/style/forForms/formsStyle";
import {LoginReduxForm} from "./LoginForm";
import {useDispatch, useSelector} from "react-redux";
import {login} from "./login-reducer";
import {AppStateType} from "../../main/bll/store";
import {Redirect} from "react-router-dom";
import {PROFILE_PATH, SIGN_IN_PATH} from "../../main/ui/components/Body";

const Login: React.FC = () => {

    const dispatch = useDispatch();
    const {isAuthorized, isLoading}  = useSelector((store: AppStateType) => store.login);

    const onLogin = ({email, password, rememberMe}: any) => {
        dispatch(login(email, password, rememberMe));
    }

    if (isAuthorized) return <Redirect to={PROFILE_PATH}/>

    return (
        <LoginForm>
            <H3>Log in with your account</H3>
            <Span>Don't have an account?<TextLink to={SIGN_IN_PATH}>Sign in</TextLink></Span>
            <LoginReduxForm onSubmit={onLogin} isLoading={isLoading}/>
        </LoginForm>
    )
}

export default Login;
