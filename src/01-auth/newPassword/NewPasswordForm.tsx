import {Field, InjectedFormProps, reduxForm} from "redux-form";
import React from "react";
import {Input} from "../../main/ui/components/forForms/FormsControls";
import {Button, Span} from "../../main/ui/style/commonStyle";
import {FormStyled} from "../../main/ui/style/forForms/formControlsStyle";
import {maxLength, requiredField} from "../../main/ui/components/forForms/validators";
import Preloader from "../../main/ui/components/preloader/Preloader";

type PropsType = {
    isLoading: boolean
}
const maxLength8 = maxLength(8);

const NewPasswordForm: React.FC<PropsType & InjectedFormProps<{}, PropsType>>  =
    ({error, handleSubmit, invalid, isLoading, ...props}) => {
    return (
        <FormStyled onSubmit={handleSubmit}>
            <Field name="password" component={Input} type="password" placeholder="Password"
                   validate={[requiredField, maxLength8]}
            />
            <Field name="repeatPassword" component={Input} type="password" placeholder="Repeat password"
                   validate={[requiredField, maxLength8]}
            />

            {error && <Span color={"red"}>{error}</Span>}
            {isLoading && <Preloader size={30} backColor="#fff" frontColor="#32cdff" isLoading={isLoading}/>}

            <Button color={"blue"} disabled={invalid || isLoading}>Change password</Button>
        </FormStyled>
    );
};

export const NewPasswordReduxForm = reduxForm<{}, PropsType>({form: 'newPassword'})(NewPasswordForm)