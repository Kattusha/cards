import styled from 'styled-components/macro';
import {BlockWrapper, ContainerWrapper, FlexRowCenter} from "./commonStyle";
import {NavLink} from "react-router-dom";

export const HeaderWrapper = styled(BlockWrapper)`
    background-color: #32cdff;
    box-shadow: 0 3px 5px rgba(0,0,0,.05);
    height: 60px;
    display: flex;
`;
export const HeaderContainer = styled(ContainerWrapper)`
    justify-content: space-between;
    width: 100%;
`;
export const LogoLinkBlock = styled(FlexRowCenter)`
    cursor: pointer;
    text-decoration: none;
`;
export const LogoImg = styled.img`
    height: 44px;
    width: 44px;
    margin-right: 5px;
`;
export const LogoText = styled.span`
    font-family: 'DINNextLTPro-Bold';
    font-size: 30px;
    color: #fff;
    text-transform: lowercase;
`;
export const MenuNavLink = styled(NavLink)`
    font-family: 'DINNextLTPro-Bold';
    font-size: 15px;
    color: #fff;
    text-transform: uppercase;
    text-decoration: none;
    margin-top: 6px;
    margin-right: 40px;
    opacity: .8;
    cursor: pointer;
    
    &:hover, &.active {
      opacity: 1;
      border-bottom: 2px solid #fff;
      padding-top: 2px;
    }
    &:last-child{
      margin-right: 0px
    }
`;
export const TextNavLink = styled(NavLink)`
    font-family: 'DINNextLTPro-Bold';
    font-size: 18px;
    color: #1cb0f6;
    //text-transform: uppercase;
    text-decoration: none;
    margin-top: 6px;
    margin-right: 40px;
    //opacity: .8;
    cursor: pointer;
    
    &:last-child{
      margin-right: 0px
    }
`;
export const IconDiv = styled.div`
    margin-right: 10px;
    display: inline-block;
`;
