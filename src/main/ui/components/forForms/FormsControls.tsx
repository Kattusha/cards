import React from "react";
import {ErrorBlock, InputStyled} from "../../style/forForms/formControlsStyle";
//import {Span} from "../../style/commonStyle";

export const Input = ({input, meta, placeholder, ...props}: any) => {
    const hasError = meta.touched && meta.error ? true : false;
    // const placeholderText = hasError? meta.error : placeholder;
    return (
        <>
            <div>
                <InputStyled hasError={hasError} {...input} {...props}
                             errorText={meta.error}
                             placeholder={placeholder}
                />
                {hasError && <ErrorBlock>{meta.error}</ErrorBlock>}
            </div>
        </>
    )
}
