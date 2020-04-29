import React from 'react';
import {SignInReduxForm} from "./SignInForm";
import {H3, Span} from "../../main/ui/style/commonStyle";
import {SignUpForm} from "../../main/ui/style/forForms/formsStyle";

const SignIn = () => {
    return (
        <SignUpForm>
            <H3>Create a account</H3>
            <Span>Already have an account?</Span>
            <SignInReduxForm />
        </SignUpForm>
    )
}

export default SignIn;
