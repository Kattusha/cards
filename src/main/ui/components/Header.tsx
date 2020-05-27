import React, {useCallback, useState} from 'react';
import {
    HeaderContainer,
    HeaderWrapper,
    IconDiv,
    LogoImg,
    LogoLinkBlock,
    LogoText,
    MenuNavLink
} from "../style/headerStyle";
import logo from '../images/logo.png'
import {Button, FlexRowCenter} from '../style/commonStyle';
import {NavLink} from "react-router-dom";
import {DECKS_CREATE, DECKS_PATH, PROFILE_PATH} from './Body';
import {useSelector} from "react-redux";
import {AppStateType} from "../../bll/store";
import {library} from "@fortawesome/fontawesome-svg-core";
import {far} from "@fortawesome/free-regular-svg-icons";
import {fas} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import SearchDeck from "../../../02-tables/cardDecks/searchDeck";
import Modal from "./modal-forms/modal";
// import {AddDeckReduxForm} from "../../../02-tables/cardDecks/addDeckForm";
// import {addDeck} from "../../../02-tables/cardDecks/cardDecksReducer";
import {DEV_VERSION} from "../../../config";
import LoginContainer from "../../../01-auth/ui/LoginContainer";
import SignInContainer from "../../../01-auth/ui/SignInContainer";
import RecoveryPasswordContainer from "../../../01-auth/ui/RecoveryPasswordContainer";

library.add(far, fas);

const Header: React.FC = () => {

    // const dispatch = useDispatch();
    const {isAuthorized, name} = useSelector((store: AppStateType) => store.login);
    // const {isLoading} = useSelector((store: AppStateType) => store.cardDecksReducer);
    // const userId = useSelector((store: AppStateType) => store.login.userId);

    // const [isAddModalOpened, switchAddModal] = useState(false);
    // const openAddModal = () => switchAddModal(true);
    // const closeAddModal = () => switchAddModal(false);
    // const addPack = ({name}: any) => {
    //     let newPack = {
    //         user_id: userId,
    //         name,
    //     }
    //     dispatch(addDeck(newPack))
    //     switchAddModal(false)
    // };

    const [isLogInModalOpened, switchLogInModal] = useState(false);
    const [isSignInModalOpened, switchSignInModal] = useState(false);
    const [isRecoveryModalOpened, switchRecoveryModal] = useState(false);

    const openLogInModal = () => {
        closeSignInModal();
        switchLogInModal(true);
    }
    const closeLogInModal = useCallback(
        () => switchLogInModal(false),
        []
    )

    const openSignInModal = useCallback(
        () => {
            closeLogInModal();
            switchSignInModal(true);
        },
        []
    );
    const closeSignInModal = () => switchSignInModal(false)

    const openRecoveryModal = useCallback(
        () => {
            closeLogInModal();
            switchRecoveryModal(true);
        },
        []
    )
    const closeRecoveryModal = () => switchRecoveryModal(false)

    DEV_VERSION && console.log(`RENDER Header`);
    // console.log('isLogInModalOpened: ' + isLogInModalOpened)
    // console.log('isSignInModalOpened: ' + isSignInModalOpened)
    // console.log('isRecoveryModalOpened: ' + isSignInModalOpened)
    return (
        <>
            <HeaderWrapper>
                <HeaderContainer>
                    <LogoLinkBlock as={NavLink} to='/'>
                        <LogoImg src={logo} alt="logo"/>
                        <LogoText>cards</LogoText>
                    </LogoLinkBlock>
                    {isAuthorized ? <SearchDeck/> : <></>}
                    <FlexRowCenter>
                        {isAuthorized ?
                            <>
                                <MenuNavLink to={DECKS_PATH}>All decks</MenuNavLink>
                                <MenuNavLink to={DECKS_CREATE}>
                                    <IconDiv><FontAwesomeIcon icon={['fas', 'plus']}/></IconDiv>
                                    Create deck
                                </MenuNavLink>
                                <MenuNavLink to={PROFILE_PATH}>
                                    <IconDiv><FontAwesomeIcon icon={['far', 'user']}/></IconDiv>
                                    {name}
                                </MenuNavLink>
                            </>
                            :
                            <Button color={"white"} onClick={openLogInModal}>Log in</Button>
                        }
                    </FlexRowCenter>
                </HeaderContainer>
            </HeaderWrapper>

            {/*{isAddModalOpened &&*/}
            {/*<Modal closeModal={closeAddModal}>*/}
            {/*    <AddDeckReduxForm isLoading={isLoading} onSubmit={addPack}/>*/}
            {/*</Modal>*/}
            {/*}*/}

            {isLogInModalOpened &&
            <Modal closeModal={closeLogInModal}>
                <LoginContainer closeLogInModal={closeLogInModal}
                                openSignInModal={openSignInModal}
                                openRecoveryModal={openRecoveryModal}
                />
            </Modal>
            }

            {isSignInModalOpened &&
            <Modal closeModal={closeSignInModal}>
                <SignInContainer closeSignInModal={closeSignInModal}
                                 openLogInModal={openLogInModal}/>
            </Modal>
            }

            {isRecoveryModalOpened &&
            <Modal closeModal={closeRecoveryModal}>
                <RecoveryPasswordContainer closeRecoveryModal={closeRecoveryModal}/>
            </Modal>
            }
        </>
    )
}

export default Header;
