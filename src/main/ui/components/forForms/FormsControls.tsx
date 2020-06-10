import React from "react";
import {ErrorBlock, InputStyled, TextareaStyled} from "../../style/forForms/formControlsStyle";

export const Input = ({input, meta, placeholder, ...props}: any) => {
    const hasError = meta.touched && meta.error /*? true : false;*/
    return (
            <>
                <InputStyled hasError={hasError} {...input} {...props}
                             errorText={meta.error}
                             placeholder={placeholder}
                />
                {hasError && <ErrorBlock>{meta.error}</ErrorBlock>}
            </>
    )
}

export const Textarea = ({input, meta, placeholder, ...props}: any) => {
    const hasError = meta.touched && meta.error;
    return (
        <>
            <TextareaStyled {...input} {...props} />
            {hasError && <ErrorBlock>{meta.error}</ErrorBlock>}
        </>
    )
}