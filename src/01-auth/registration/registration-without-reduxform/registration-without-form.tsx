import React, {useState} from 'react';
import {FormStyled} from "../../../main/ui/style/forForms/formControlsStyle";
import InputWithoutForms from "./input-withput-form";
import {Button} from "../../../main/ui/style/commonStyle";

const SignInWithoutForm = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const updateName = (name: string): void => {setName(name)};
    const updateEmail = (email: string): void => {setEmail(email)};
    const updatePassword = (password: string): void => {setPassword(password)};

    return (
        <FormStyled>
            <InputWithoutForms placeholder={"Name"} updateValue={updateName} value={name}/>
            <InputWithoutForms placeholder={"Email"} updateValue={updateEmail} value={email}/>
            <InputWithoutForms placeholder={"Password"} updateValue={updatePassword} value={password}/>
            <Button color={"blue"}>Sign Up</Button>
        </FormStyled>
    )
}

export default SignInWithoutForm