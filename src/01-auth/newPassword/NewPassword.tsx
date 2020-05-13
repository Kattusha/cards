import React from 'react';
import {H3} from "../../main/ui/style/commonStyle";
import {NewPasswordForm} from "../../main/ui/style/forForms/formsStyle";
import {NewPasswordReduxForm} from "./NewPasswordForm";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../main/bll/store";
import {setNewPassword} from "../recoveryPassword/recoveryPassword-reducer";
import {stopSubmit} from "redux-form";
import {Redirect} from "react-router-dom";
import {loginPath} from "../../main/ui/components/Body";

const NewPassword: React.FC = (props: any) => {

    const dispatch = useDispatch();
    const {isSaveNewPassword, isLoading} = useSelector((store: AppStateType) => store.recoveryPassword);

    const onSetNewPassword = ({password, repeatPassword}: any) => {
        if (password === repeatPassword) {
            debugger
            let token = props.match.params.token;
            dispatch(setNewPassword(token, password));
        } else dispatch(stopSubmit("newPassword", {_error: 'Password mismatch'}));
    }

    if (isSaveNewPassword) return <Redirect to={loginPath}/>

    return (
        <NewPasswordForm>
            <H3>Enter new password</H3>
            <NewPasswordReduxForm onSubmit={onSetNewPassword} isLoading={isLoading}/>
        </NewPasswordForm>
    )
}

export default NewPassword;
