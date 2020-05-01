import React from 'react';
import {FormStyled} from "../../../main/ui/style/forForms/formControlsStyle";
import InputWithoutForms from "./input-withput-form";
import {Button} from "../../../main/ui/style/commonStyle";

const SignInWithoutForm = () => {
    return (
        <FormStyled>
            <InputWithoutForms placeholder={"Name"}/>
            <InputWithoutForms placeholder={"Email"}/>
            <InputWithoutForms placeholder={"Password"}/>
            <Button color={"blue"}>Sign Up</Button>
        </FormStyled>
    )
}

export default SignInWithoutForm