import React from 'react';
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
import {CARD_DECKS_PATH, LOGIN_PATH, PROFILE_PATH} from './Body';
import {useSelector} from "react-redux";
import {AppStateType} from "../../bll/store";
import {library} from "@fortawesome/fontawesome-svg-core";
import {far} from "@fortawesome/free-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

library.add(far);

const Header: React.FC = () => {

    const {isAuthorized, email} = useSelector((store: AppStateType) => store.login);

    return (
        <HeaderWrapper>
            <HeaderContainer>
                <LogoLinkBlock>
                    {/*<LogoLinkBlock as={NavLink} to='/login'>*/}
                    <LogoImg src={logo} alt="logo"/>
                    <LogoText>cards</LogoText>
                </LogoLinkBlock>
                <FlexRowCenter>
                    {/*<MenuNavLink to={loginPath}>Log in</MenuNavLink>*/}
                    {/*<MenuNavLink to={recoveryPasswordPath}>Recovery</MenuNavLink>*/}
                    {/*<MenuNavLink to={newPasswordPath}>New password</MenuNavLink>*/}
                    {/*<MenuNavLink to={profilePath}>Profile</MenuNavLink>*/}
                    <MenuNavLink to={CARD_DECKS_PATH}>Decks</MenuNavLink>


                    {isAuthorized ?
                        <MenuNavLink to={PROFILE_PATH}>
                            <IconDiv><FontAwesomeIcon icon={['far', 'user']}/></IconDiv>
                            {/*User*/}
                            {email}
                        </MenuNavLink>
                        :
                        <Button as={NavLink} to={LOGIN_PATH} color={"white"}>Log in</Button>
                    }
                </FlexRowCenter>
            </HeaderContainer>
        </HeaderWrapper>
    )
}

export default Header;
