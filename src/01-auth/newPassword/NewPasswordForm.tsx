import {Field, reduxForm} from "redux-form";
import React from "react";
import {Input} from "../../main/ui/components/forForms/FormsControls";
import {Button} from "../../main/ui/style/commonStyle";
import {FormStyled} from "../../main/ui/style/forForms/formControlsStyle";
// import {requiredField} from "./validators";

const NewPasswordForm = () => {
    return (
        <FormStyled>
            <Field name="password" component={Input} type="password" placeholder="Password"
                   // validate={[requiredField]}
            />
            {/*<div>*/}
            {/*    <Field name="rememberMe" component={Input} type="checkbox"/>remember me*/}
            {/*</div>*/}
            <Button color={"blue"}>Change password</Button>
        </FormStyled>
    );
};

export const NewPasswordReduxForm = reduxForm({form: 'newPassword'})(NewPasswordForm)