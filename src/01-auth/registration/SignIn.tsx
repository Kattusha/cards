import React from 'react';
import {H3, Span} from "../../main/ui/style/commonStyle";
import {SignUpForm} from "../../main/ui/style/forForms/formsStyle";
import SignInWithoutForm from "./registration-without-reduxform/registration-without-form";

const SignIn = () => {
    return (
        <SignUpForm>
            <H3>Create a account</H3>
            <Span>Already have an account?</Span>
            <SignInWithoutForm />
        </SignUpForm>
    )
}

export default SignIn;
