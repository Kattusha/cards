import React from "react";
import {InputStyled} from "../../style/forForms/formControlsStyle";

export const Input = ({input, ...props}: any) => {

    return (
        <InputStyled {...input} {...props} />
    )


    // const hasError = meta.touched && meta.error;
    // const hasErrorBlock = hasError && style.error;
    // return (
    //     <div className={`${style.block} ${hasErrorBlock}`}>
    //         {hasError && <span>{meta.error}</span>}
    //         <input {...input} {...props} />
    //     </div>
    // )
}
