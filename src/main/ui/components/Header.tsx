import React from 'react';
import {HeaderContainer, HeaderWrapper, LogoImg, LogoLinkBlock, LogoText, MenuNavLink} from "../style/headerStyle";
import logo from '../images/logo.png'
import {FlexRowCenter, Button} from '../style/commonStyle';
import {NavLink} from "react-router-dom";
import {loginPath, newPasswordPath, profilePath, recoveryPasswordPath, signInPath} from './Body';

const Header:React.FC = () => {
    return (
        <HeaderWrapper>
            <HeaderContainer>
                <LogoLinkBlock>
                {/*<LogoLinkBlock as={NavLink} to='/login'>*/}
                    <LogoImg src={logo} alt="logo"/>
                    <LogoText>cards</LogoText>
                </LogoLinkBlock>
                <FlexRowCenter>
                    <MenuNavLink to={loginPath}>Log in</MenuNavLink>
                    <MenuNavLink to={recoveryPasswordPath}>Recovery</MenuNavLink>
                    <MenuNavLink to={newPasswordPath}>New password</MenuNavLink>
                    <MenuNavLink to={profilePath}>Profile</MenuNavLink>
                    <Button as={NavLink} to={signInPath} color={"white"}>Sign in</Button>
                </FlexRowCenter>
            </HeaderContainer>
        </HeaderWrapper>
    )
}

export default Header;
