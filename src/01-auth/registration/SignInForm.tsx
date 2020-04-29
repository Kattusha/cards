import {Field, Form, reduxForm} from "redux-form";
import React from "react";
import {Input} from "../../main/ui/components/forForms/FormsControls";
import {Button} from "../../main/ui/style/commonStyle";
import { FormStyled } from "../../main/ui/style/forForms/formControlsStyle";
// import {requiredField} from "./validators";

const SignInForm = () => {
    return (
        <FormStyled>
            <Field name="name" component={Input} type="text" placeholder="Name"
                // validate={[requiredField]}
            />
            <Field name="email" component={Input} type="email" placeholder="Email"
                   // validate={[requiredField]}
            />
            <Field name="password" component={Input} type="password" placeholder="Password"
                   // validate={[requiredField]}
            />
            {/*<div>*/}
            {/*    <Field name="rememberMe" component={Input} type="checkbox"/>remember me*/}
            {/*</div>*/}
            <Button color={"blue"}>Sign Up</Button>
        </FormStyled>
    );
};

export const SignInReduxForm = reduxForm({form: 'signIn'})(SignInForm)