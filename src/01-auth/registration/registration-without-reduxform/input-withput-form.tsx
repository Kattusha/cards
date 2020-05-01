import React from 'react';
import {InputStyled} from "../../../main/ui/style/forForms/formControlsStyle";

type PropsType = {
    placeholder: string,
    value: string,
    updateValue: (arg0: string) => void
}

const InputWithoutForms = (props: PropsType) => {

    const onChangeHandler = (e: any): void => {
        props.updateValue(e.currentTarget.value)
    };

    return (
        <InputStyled placeholder={props.placeholder} value={props.value} onChange={(e) => onChangeHandler(e)}/>
    )
};

export default InputWithoutForms