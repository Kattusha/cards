import React from "react";
import {ErrorBlock, InputStyled} from "../../style/forForms/formControlsStyle";

export const Input = ({input, meta, placeholder, ...props}: any) => {
    const hasError = meta.touched && meta.error ? true : false;
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
