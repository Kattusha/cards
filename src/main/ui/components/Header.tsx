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
import {CHAT_PATH, DECKS_CREATE, DECKS_PATH, MAP_PATH, PROFILE_PATH} from './Routes';
import {useSelector} from "react-redux";
import {AppStateType} from "../../bll/store";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import SearchDeck from "../../../02-tables/cardDecks/searchDeck";
import Modal from "./modal-forms/modal";
import {DEV_VERSION} from "../../../config";
import LoginContainer from "../../../01-auth/ui/LoginContainer";
import SignInContainer from "../../../01-auth/ui/SignInContainer";
import RecoveryPasswordContainer from "../../../01-auth/ui/RecoveryPasswordContainer";

const Header: React.FC = () => {

    const {isAuthorized, name} = useSelector((store: AppStateType) => store.login);

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
                                <MenuNavLink to={DECKS_PATH} activeClassName='active'>All decks</MenuNavLink>
                                <MenuNavLink to={CHAT_PATH} activeClassName='active'>
                                    <IconDiv><FontAwesomeIcon icon={'comments'}/></IconDiv>
                                    Chat
                                </MenuNavLink>
                                <MenuNavLink to={MAP_PATH} activeClassName='active'>
                                    <IconDiv><FontAwesomeIcon icon={'map-marker'}/></IconDiv>
                                    Map
                                </MenuNavLink>
                                <MenuNavLink to={DECKS_CREATE} activeClassName='active'>
                                    <IconDiv><FontAwesomeIcon icon={'plus'}/></IconDiv>
                                    Create deck
                                </MenuNavLink>
                                <MenuNavLink to={PROFILE_PATH} activeClassName='active'>
                                    <IconDiv><FontAwesomeIcon icon={'user'}/></IconDiv>
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
