import {Field, InjectedFormProps, reduxForm} from "redux-form";
import React from "react";
import {Input} from "../../main/ui/components/forForms/FormsControls";
import {Button, Span} from "../../main/ui/style/commonStyle";
import {FormStyled, InputCheckBoxDiv} from "../../main/ui/style/forForms/formControlsStyle";
import {requiredField} from "../../main/ui/components/forForms/validators";
import Preloader from "../../main/ui/components/preloader/Preloader";

type PropsType = {
    isLoading: boolean
}

const LoginForm: React.FC<PropsType & InjectedFormProps<{}, PropsType>>  = ({error, handleSubmit, submitting , isLoading}) => {
    return (
        <FormStyled onSubmit={handleSubmit}>
            <Field name="email" component={Input} type="email" placeholder="Email"
                   validate={[requiredField]} />
            <Field name="password" component={Input} type="password" placeholder="Password"
                   validate={[requiredField]} />
            <InputCheckBoxDiv>
                <Field name="rememberMe" component={Input} type="checkbox"/>remember me
            </InputCheckBoxDiv>

            {error && <Span color={"red"}>{error}</Span>}
            {isLoading && <Preloader size={30} backColor="#fff" frontColor="#32cdff" isLoading={isLoading}/>}

            <Button color={"blue"} disabled={isLoading}>Log in</Button>
        </FormStyled>
    );
};

export const LoginReduxForm = reduxForm<{}, PropsType>({form: 'login'})(LoginForm)