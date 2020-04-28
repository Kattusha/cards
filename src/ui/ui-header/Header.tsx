import React from 'react';
import {HeaderContainer, HeaderWrapper, LogoImg, LogoLinkBlock, LogoText, MenuNavLink} from "./headerStyle";
import logo from '../../images/logo2.png'
import {FlexRowCenter, Button} from '../commonStyle';
import {NavLink} from "react-router-dom";

const Header = () => {
    return (
        <HeaderWrapper>
            <HeaderContainer>
                <LogoLinkBlock>
                {/*<LogoLinkBlock as={NavLink} to='/'>*/}
                    <LogoImg src={logo} alt="logo"/>n
                    <LogoText>cards</LogoText>
                </LogoLinkBlock>
                <FlexRowCenter>
                    {/*<MenuLink>Home</MenuLink>*/}
                    <MenuNavLink to='/login'>Log in</MenuNavLink>
                    <MenuNavLink to="/signup">Sign up</MenuNavLink>
                    <MenuNavLink to="/forgot">Forgot</MenuNavLink>
                    <MenuNavLink to="/newpassword">New password</MenuNavLink>
                    <MenuNavLink to="/profile">Profile</MenuNavLink>
                    <Button as={NavLink} to='/signup' color={"blue"}>Sign up</Button>
                </FlexRowCenter>
            </HeaderContainer>
        </HeaderWrapper>
    )
}

export default Header;
