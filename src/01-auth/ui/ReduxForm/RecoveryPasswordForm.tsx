import {Field, InjectedFormProps, reduxForm} from "redux-form";
import React from "react";
import {Input} from "../../../main/ui/components/forForms/FormsControls";
import {Button, Span} from "../../../main/ui/style/commonStyle";
import {FormStyled} from "../../../main/ui/style/forForms/formControlsStyle";
import {emailValidation, requiredField} from "../../../main/ui/components/forForms/validators";
import Preloader from "../../../main/ui/components/preloader/Preloader";

type PropsType = {
    isLoading: boolean
}
export type RecoveryPasswordFormDataType = {
    email: string
}

const RecoveryPasswordForm: React.FC<PropsType & InjectedFormProps<RecoveryPasswordFormDataType, PropsType>> =
    ({error, handleSubmit, invalid, isLoading, ...props}) => {
        return (
            <FormStyled onSubmit={handleSubmit}>
                <Field name="email" component={Input} type="email" placeholder="Email"
                       validate={[emailValidation, requiredField]}
                />

                {error && <Span color={"red"}>{error}</Span>}
                {isLoading && <Preloader isLoading={isLoading}/>}

                <Button color={"blue"} disabled={invalid || isLoading}>Reset Password</Button>
            </FormStyled>
        );
    };

export const RecoveryPasswordReduxForm = reduxForm<RecoveryPasswordFormDataType, PropsType>({form: 'recoveryPassword'})(RecoveryPasswordForm)