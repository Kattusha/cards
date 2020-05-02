import React, {useCallback, useEffect} from 'react';
import {H3, Span} from "../../main/ui/style/commonStyle";
import {LoginForm} from "../../main/ui/style/forForms/formsStyle";
import {LoginReduxForm} from "./LoginForm";
import {useDispatch, useSelector} from "react-redux";
import {login} from "./login-reducer";
import {AppStateType} from "../../main/bll/store";
import {useHistory} from "react-router-dom";
import {profilePath} from "../../main/ui/components/Body";

const Login: React.FC = () => {

    const isAuth = useSelector((store: AppStateType) => store.login.isAuth);
    const isLoading = useSelector((store: AppStateType) => store.login.isloading);
    const dispatch = useDispatch();
    const history = useHistory();

    const onLogin = useCallback(({email, password, rememberMe}: any) => {
        dispatch(login(email, password, rememberMe));
    }, []);

    useEffect(() => {
        if (isAuth)
            history.push(profilePath)
    }, [isAuth])

    return (
        <LoginForm>
            <H3>Log in with your account</H3>
            <Span>Don't have an account??</Span>
            <LoginReduxForm onSubmit={onLogin} isLoading={isLoading}/>
        </LoginForm>
    )
}

export default Login;
