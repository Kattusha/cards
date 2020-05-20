import React, {useState} from 'react';
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
import {DECKS_PATH, LOGIN_PATH, PROFILE_PATH} from './Body';
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../bll/store";
import {library} from "@fortawesome/fontawesome-svg-core";
import {far} from "@fortawesome/free-regular-svg-icons";
import {fas} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import SearchDeck from "../../../02-tables/cardDecks/searchDeck";
import Modal from "../../../02-tables/cardDecks/modal";
import {AddDeckReduxForm} from "../../../02-tables/cardDecks/addDeckForm";
import {addDeck} from "../../../02-tables/cardDecks/cardDecksReducer";

library.add(far, fas);

const Header: React.FC = () => {

    const dispatch = useDispatch();
    const {isAuthorized, email} = useSelector((store: AppStateType) => store.login);
    const {isLoading} = useSelector((store: AppStateType) => store.cardDecksReducer);
    const userId = useSelector((store: AppStateType) => store.login.userId);

    const [isAddModalOpened, switchAddModal] = useState(false);
    const openAddModal = () => switchAddModal(true);
    const closeAddModal = () => switchAddModal(false);
    const addPack = ({name}: any) => {
        let newPack = {
            user_id: userId,
            name,
        }
        dispatch(addDeck(newPack))
        switchAddModal(false)
    };

    return (
        <>
            <HeaderWrapper>
                <HeaderContainer>
                    <LogoLinkBlock as={NavLink} to='/'>
                        <LogoImg src={logo} alt="logo"/>
                        <LogoText>cards</LogoText>
                        {isAuthorized ? <SearchDeck/> : <></>}
                    </LogoLinkBlock>
                    <FlexRowCenter>
                        {isAuthorized ?
                            <>
                                <MenuNavLink to={DECKS_PATH}>All decks</MenuNavLink>
                                <MenuNavLink to={PROFILE_PATH} onClick={openAddModal}>
                                    <IconDiv><FontAwesomeIcon icon={['fas', 'plus']}/></IconDiv>
                                    Create deck
                                </MenuNavLink>
                                <MenuNavLink to={PROFILE_PATH}>
                                    <IconDiv><FontAwesomeIcon icon={['far', 'user']}/></IconDiv>
                                    {/*User*/}
                                    {email}
                                </MenuNavLink>
                            </>
                            :
                            <Button as={NavLink} to={LOGIN_PATH} color={"white"}>Log in</Button>
                        }
                    </FlexRowCenter>
                </HeaderContainer>
            </HeaderWrapper>
            {isAddModalOpened &&
            <Modal closeModal={closeAddModal}>
                <AddDeckReduxForm isLoading={isLoading} onSubmit={addPack}/>
            </Modal>
            }
        </>
    )
}

export default Header;
