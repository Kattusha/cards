import React from 'react';
import {H3, Span} from "../../main/ui/style/commonStyle";
import {LoginForm} from "../../main/ui/style/forForms/formsStyle";
import {LoginReduxForm} from "./LoginForm";

const Login = () => {
    return (
        <LoginForm>
            <H3>Log in with your account</H3>
            <Span>Don't have an account??</Span>
            <LoginReduxForm />
        </LoginForm>
    )
}

export default Login;
