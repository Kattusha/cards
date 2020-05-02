import React from "react";
import {InputStyled} from "../../style/forForms/formControlsStyle";
//import {Span} from "../../style/commonStyle";

export const Input = ({input, meta, placeholder, ...props}: any) => {

    const hasError = meta.touched && meta.error;
    const placeholderText = hasError? meta.error : placeholder;

    return (
        <>
            <InputStyled hasError={hasError} errorText={meta.error} {...input} {...props}
                         placeholder={placeholderText}
            />
            {/*{hasError && <Span color={"red"}>{meta.error}</Span>}*/}
        </>
    )
}
