import React from 'react';
import {InputStyled} from "../../../main/ui/style/forForms/formControlsStyle";

type PropsType = {
    placeholder: string
}

const InputWithoutForms = (props: PropsType) => {
    return (
        <InputStyled placeholder={props.placeholder}/>
    )
};

export default InputWithoutForms