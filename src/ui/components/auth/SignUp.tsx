import React from 'react';
import {SignUpReduxForm} from "./SignUpForm";
import {H3, Span} from "../../style/commonStyle";
import {SignUpForm} from "../../style/forForms/formsStyle";

const SignUp = () => {
    return (
        <SignUpForm>
            <H3>Create a account</H3>
            <Span>Already have an account?</Span>
            <SignUpReduxForm />
        </SignUpForm>
    )
}

export default SignUp;
