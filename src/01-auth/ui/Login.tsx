import React, {useState} from 'react';
import {H3, Span, TextLink} from "../../main/ui/style/commonStyle";
import {LoginForm} from "../../main/ui/style/forForms/formsStyle";
import {LoginFormDataType, LoginReduxForm} from "./ReduxForm/LoginForm";
import {SIGN_IN_PATH} from "../../main/ui/components/Body";
import Modal from "../../main/ui/components/modal-forms/modal";
import SignInContainer from "./SignInContainer";

type PropsType = {
    isLoading: boolean
    submitFnc: ({email, password, rememberMe}: LoginFormDataType) => void
    closeLogInModal: () => void
}

const Login: React.FC<PropsType> = ({isLoading, submitFnc, closeLogInModal}) => {

    const [isSignInModalOpened, switchSignInModal] = useState(false);
    const openSignInModal = () => {
        // closeLogInModal()

        switchSignInModal(true)
        console.log(`isSignInModalOpened: ${isSignInModalOpened}`)
        // debugger
    };
    const closeSignInModal = () => switchSignInModal(false);

    // const onSubmitFnc = () =>{
    //     closeSignInModal()
    //     submitFnc();
    // }

    return (
        <>
            <LoginForm>
                <H3>Log in with your account</H3>
                <Span>Don't have an account?
                    <TextLink to={'/'/*SIGN_IN_PATH*/} onClick={openSignInModal}>Sign in</TextLink>
                </Span>
                <LoginReduxForm onSubmit={submitFnc} isLoading={isLoading}/>
            </LoginForm>

            {isSignInModalOpened &&
            <Modal closeModal={closeSignInModal} height={'386px'} width={'300px'}>
                <SignInContainer closeSignInModal={closeSignInModal}/>
            </Modal>
            }
        </>
    )
}

export default Login
