import React from 'react';
import {H3, Span, TextLink} from "../../main/ui/style/commonStyle";
import {SignUpForm} from "../../main/ui/style/forForms/formsStyle";
import {SignInReduxForm} from "./SignInForm";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../main/bll/store";
import {registration} from "./registration-reducer";
import { Redirect } from 'react-router-dom';
import {loginPath} from "../../main/ui/components/Body";
import {MenuNavLink} from "../../main/ui/style/headerStyle";

const SignIn = () => {
    const dispatch = useDispatch();
    const regSuccess = useSelector((store: AppStateType) => store.registration.isRegistrationSuccessful);
    const regInProgress = useSelector((store: AppStateType) => store.registration.isRegistrationInProgress);

    const register = (formData: any) => {
        dispatch(registration(formData.email, formData.password))
    }

    if (regSuccess) return <Redirect to={loginPath}/>

    return (
        <SignUpForm>
            <H3>Create a account</H3>
            <Span>Already have an account?<TextLink to={loginPath}>Log in</TextLink></Span>
            <SignInReduxForm onSubmit={register} regInProgress={regInProgress}/>
        </SignUpForm>
    )
}

export default SignIn;
