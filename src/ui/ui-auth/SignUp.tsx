import React from 'react';
import {SignUpReduxForm} from "../ui-forms/SignUpForm";
import {H3, Span} from "../commonStyle";
import {SignUpForm} from "../ui-forms/formsStyle";

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
