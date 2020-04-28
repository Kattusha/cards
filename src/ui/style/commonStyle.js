import styled from 'styled-components';
import React from "react";

export const H3 = styled.h3`
    font-size: 21px;
    text-align: center;
    color: #5c5c5c;
`;

export const Span = styled.p`
    //font-size: ${props => props.sizze==="little" ? "15px" : "18px"};
    font-size: 15px;
    text-align: center;
    color: #898989;
`;

export const BlockWrapper = styled.div`
    margin-bottom: 30px;
    width: 100%;
`;
export const FlexRowCenter = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
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
    
    background: ${props => props.color==="white" ? "#fff" : "#32cdff"};
    color: ${props => props.color==="white" ? "#32cdff" : "#fff"};
    text-transform: uppercase;
    
    &:hover {
        filter: brightness(95%);
    }
    &:focus {
        outline: none;
    }
`;

