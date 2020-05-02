import {Field, reduxForm} from "redux-form";
import React from "react";
import {Input} from "../../main/ui/components/forForms/FormsControls";
import {Button, Span} from "../../main/ui/style/commonStyle";
import {FormStyled, InputCheckBoxDiv} from "../../main/ui/style/forForms/formControlsStyle";
import {requiredField} from "../../main/ui/components/forForms/validators";

// type PropsType = {
//     onSubmit: () => void
// }

const LoginForm = ({error, handleSubmit}: any) => {
    return (
        <FormStyled onSubmit={handleSubmit}>
            <Field name="email" component={Input} type="email" placeholder="Email"
                   validate={[requiredField]}
            />
            <Field name="password" component={Input} type="password" placeholder="Password"
                   validate={[requiredField]}
            />
            <InputCheckBoxDiv>
                <Field name="rememberMe" component={Input} type="checkbox"/>remember me
            </InputCheckBoxDiv>
            {error && <Span color={"red"}>{error}</Span>}
            <Button color={"blue"}>Log in</Button>
        </FormStyled>
    );
};

export const LoginReduxForm = reduxForm({form: 'login'})(LoginForm)