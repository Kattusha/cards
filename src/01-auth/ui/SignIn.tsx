import React from 'react';
import {H3, Span, TextLink} from "../../main/ui/style/commonStyle";
import {SignUpForm} from "../../main/ui/style/forForms/formsStyle";
import {SignInFormDataType, SignInReduxForm} from "./ReduxForm/SignInForm";
import {MAIN_PATH} from "../../main/ui/components/Body";

type PropsType = {
    isLoading: boolean
    submitFnc: ({email, password}: SignInFormDataType) => void
    openLogInModal: () => void
}

const SignIn: React.FC<PropsType> = ({submitFnc, isLoading, openLogInModal}) => {
    return (
        <SignUpForm>
            <H3>Create a account</H3>
            <Span>Already have an account?
                <TextLink to={MAIN_PATH} onClick={openLogInModal}>Log in</TextLink>
            </Span>
            <SignInReduxForm onSubmit={submitFnc} isLoading={isLoading}/>
        </SignUpForm>
    )
}

export default SignIn
