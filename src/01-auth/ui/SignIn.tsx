import React from 'react';
import {H3, Span, TextLink} from "../../main/ui/style/commonStyle";
import {SignUpForm} from "../../main/ui/style/forForms/formsStyle";
import {SignInFormDataType, SignInReduxForm} from "./ReduxForm/SignInForm";

type PropsType = {
    isLoading: boolean
    submitFnc: ({email, password}: SignInFormDataType) => void
    closeSignInModal: () => void
}

const SignIn: React.FC<PropsType> = ({submitFnc, isLoading, closeSignInModal}) => {

    const close = () => {
        closeSignInModal()
    };

    return (
        <SignUpForm>
            <H3>Create a account</H3>
            <Span>Already have an account?
                <TextLink to={'/' /*LOGIN_PATH*/} onClick={close}>Log in</TextLink>
            </Span>
            <SignInReduxForm onSubmit={submitFnc} isLoading={isLoading}/>
        </SignUpForm>
    )
}

export default SignIn
