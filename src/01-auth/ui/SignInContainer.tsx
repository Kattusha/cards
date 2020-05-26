import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../main/bll/store";
import {registration} from "../bll/registration-reducer";
import SignIn from "./SignIn";

type PropsType = {
    closeSignInModal: () => void
    openLogInModal: () => void
}

const SignInContainer: React.FC<PropsType> = ({closeSignInModal, openLogInModal}) => {
    const dispatch = useDispatch();
    const {isRegistratedUser} = useSelector((store: AppStateType) => store.registration);
    const {isLoading} = useSelector((store: AppStateType) => store.requestStatus);

    const register = ({email, password}: any) => {
        dispatch(registration(email, password))
    }

    if (isRegistratedUser) {
        closeSignInModal();
        // return <Redirect to={LOGIN_PATH}/>
    }

    return <SignIn submitFnc={register} isLoading={isLoading} openLogInModal={openLogInModal}/>
}

export default SignInContainer
