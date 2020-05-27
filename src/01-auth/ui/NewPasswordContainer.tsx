import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../main/bll/store";
import {setNewPassword} from "../bll/recoveryPassword-reducer";
import {stopSubmit} from "redux-form";
import NewPassword from "./NewPassword";

const NewPasswordContainer: React.FC = (props: any) => {

    const dispatch = useDispatch();
    // const {isSaveNewPassword} = useSelector((store: AppStateType) => store.recoveryPassword);
    const {isLoading} = useSelector((store: AppStateType) => store.requestStatus);

    const setPassword = ({password, repeatPassword}: any) => {
        if (password === repeatPassword) {
            dispatch(setNewPassword(props.match.params.token, password));
        } else dispatch(stopSubmit("newPassword", {_error: 'Password mismatch'}));
    }

    // if (isSaveNewPassword)
    //     return <Redirect to={LOGIN_PATH}/>

    return <NewPassword isLoading={isLoading} submitFnc={setPassword} />
}

export default NewPasswordContainer;
