import React from 'react';
import {HeaderContainer, HeaderWrapper, LogoImg, LogoLinkBlock, LogoText, MenuNavLink} from "../style/headerStyle";
import logo from '../images/logo.png'
import {FlexRowCenter, Button} from '../style/commonStyle';
import {NavLink} from "react-router-dom";

const Header = () => {
    return (
        <HeaderWrapper>
            <HeaderContainer>
                <LogoLinkBlock>
                {/*<LogoLinkBlock as={NavLink} to='/login'>*/}
                    <LogoImg src={logo} alt="logo"/>
                    <LogoText>cards</LogoText>
                </LogoLinkBlock>
                <FlexRowCenter>
                    <MenuNavLink to='/login'>Log in</MenuNavLink>
                    {/*<MenuNavLink to="/signIn">Sign up</MenuNavLink>*/}
                    <MenuNavLink to="/recoveryPassword">Recovery</MenuNavLink>
                    <MenuNavLink to="/newPassword">New password</MenuNavLink>
                    <MenuNavLink to="/profile">Profile</MenuNavLink>
                    <Button as={NavLink} to='/signIn' color={"white"}>Sign up</Button>
                </FlexRowCenter>
            </HeaderContainer>
        </HeaderWrapper>
    )
}

export default Header;
