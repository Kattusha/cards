import {Field, reduxForm} from "redux-form";
import React from "react";
import {Input} from "../../main/ui/components/forForms/FormsControls";
import {Button} from "../../main/ui/style/commonStyle";
import {FormStyled} from "../../main/ui/style/forForms/formControlsStyle";
// import {requiredField} from "./validators";

// type PropsType = {
//     onSubmit: () => void
// }

const LoginForm = (props: any) => {
    return (
        <FormStyled onSubmit={props.handleSubmit}>
            <Field name="email" component={Input} type="email" placeholder="Email"
                   // validate={[requiredField]}
            />
            <Field name="password" component={Input} type="password" placeholder="Password"
                   // validate={[requiredField]}
            />
            {/*<div>*/}
            {/*    <Field name="rememberMe" component={Input} type="checkbox"/>remember me*/}
            {/*</div>*/}
            <Button color={"blue"}>Log in</Button>
        </FormStyled>
    );
};

export const LoginReduxForm = reduxForm({form: 'login'})(LoginForm)