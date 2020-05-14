import React from 'react';
import {H3, Span, TextLink} from "../../main/ui/style/commonStyle";
import {SignUpForm} from "../../main/ui/style/forForms/formsStyle";
import {SignInReduxForm} from "./SignInForm";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../main/bll/store";
import {registration} from "./registration-reducer";
import {Redirect} from 'react-router-dom';
import {LOGIN_PATH} from "../../main/ui/components/Body";

const SignIn = () => {
    const dispatch = useDispatch();
    const {isRegistrationInProgress, isRegistrationSuccessful} = useSelector((store: AppStateType) => store.registration);

    const register = (formData: any) => {
        dispatch(registration(formData.email, formData.password))
    }

    if (isRegistrationSuccessful) return <Redirect to={LOGIN_PATH}/>

    return (
        <SignUpForm>
            <H3>Create a account</H3>
            <Span>Already have an account?<TextLink to={LOGIN_PATH}>Log in</TextLink></Span>
            <SignInReduxForm onSubmit={register} regInProgress={isRegistrationInProgress}/>
        </SignUpForm>
    )
}

export default SignIn;
