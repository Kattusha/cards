import React from "react";
import {ErrorBlock, InputStyled, TextareaStyled} from "../../style/forForms/formControlsStyle";

export const Input = ({input, meta, placeholder, ...props}: any) => {
    const hasError = meta.touched && meta.error /*? true : false;*/
    return (
            <div>
                <InputStyled hasError={hasError} {...input} {...props}
                             errorText={meta.error}
                             placeholder={placeholder}
                />
                {hasError && <ErrorBlock>{meta.error}</ErrorBlock>}
            </div>
    )
}

export const Textarea = ({input, meta, placeholder, ...props}: any) => {
    const hasError = meta.touched && meta.error;
    return (
        <div>
            <TextareaStyled {...input} {...props} />
            {hasError && <ErrorBlock>{meta.error}</ErrorBlock>}
        </div>
    )
}