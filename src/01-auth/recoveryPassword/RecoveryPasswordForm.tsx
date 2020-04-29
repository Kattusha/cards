import {Field, reduxForm} from "redux-form";
import React from "react";
import {Input} from "../../main/ui/components/forForms/FormsControls";
import {Button} from "../../main/ui/style/commonStyle";
import {FormStyled} from "../../main/ui/style/forForms/formControlsStyle";
// import {requiredField} from "./validators";

const RecoveryPasswordForm = () => {
    return (
        <FormStyled>
            <Field name="email" component={Input} type="email" placeholder="Email"
                   // validate={[requiredField]}
            />
            <Button color={"blue"}>Reset Password</Button>
        </FormStyled>
    );
};

export const RecoveryPasswordReduxForm = reduxForm({form: 'recoveryPassword'})(RecoveryPasswordForm)