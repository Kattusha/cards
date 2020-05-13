import React from 'react';
import {H3, Span, TextLink} from "../../main/ui/style/commonStyle";
import {LoginForm} from "../../main/ui/style/forForms/formsStyle";
import {LoginReduxForm} from "./LoginForm";
import {useDispatch, useSelector} from "react-redux";
import {login} from "./login-reducer";
import {AppStateType} from "../../main/bll/store";
import {Redirect} from "react-router-dom";
import {profilePath, signInPath} from "../../main/ui/components/Body";

const Login: React.FC = () => {

    const dispatch = useDispatch();
    const {isAuthorized, isLoading}  = useSelector((store: AppStateType) => store.login);

    const onLogin = ({email, password, rememberMe}: any) => {
        dispatch(login(email, password, rememberMe));
    }

    if (isAuthorized) return <Redirect to={profilePath}/>

    return (
        <LoginForm>
            <H3>Log in with your account</H3>
            <Span>Don't have an account?<TextLink to={signInPath}>Sign in</TextLink></Span>
            <LoginReduxForm onSubmit={onLogin} isLoading={isLoading}/>
        </LoginForm>
    )
}

export default Login;
