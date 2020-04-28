import styled from 'styled-components';
import React from "react";

export const BlockWrapper = styled.div`
    margin-bottom: 30px;
    width: 100%;
`;
export const FlexRowCenter = styled.div`
    display: flex;
    align-items: center;
    height: 100%;
`;
export const ContainerWrapper = styled(FlexRowCenter)`
    margin: 0 auto;
    width: 1082px;
`;
const Link = ({ className, children }) => (
    <a className={className}>
        {children}
    </a>
);
export const Button = styled.button`
    font-family: 'DINNextLTPro-Bold';
    font-size: 15px;
    padding: 13px 25px 9px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    text-decoration: none;
    
    background: ${props => props.color==="blue" ? "white" : "blue"};
    color: ${props => props.color==="blue" ? "#32cdff" : "#000"};
    text-transform: ${props => props.color==="blue" ? "uppercase" : "normal"};
    
    &:hover {
        filter: brightness(95%);
    }
    &:focus {
        outline: none;
    }
`;

