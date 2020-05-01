import React from 'react';
import {H3, Span} from "../../main/ui/style/commonStyle";
import {LoginForm} from "../../main/ui/style/forForms/formsStyle";
import {LoginReduxForm} from "./LoginForm";

const Login = () => {

    let onAddPost = (formData: any) => {
        // props.addPost(values.postText);
        //props.login(formData.email, formData.password, formData.rememberMe);
        alert(formData.email + '' + formData.password);

    };

    return (
        <LoginForm>
            <H3>Log in with your account</H3>
            <Span>Don't have an account??</Span>
            <LoginReduxForm onSubmit={onAddPost} />
        </LoginForm>
    )
}

export default Login;
