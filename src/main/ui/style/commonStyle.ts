import styled from 'styled-components/macro';
import React from "react";

export const H3 = styled.h3`
    font-size: 21px;
    text-align: center;
    color: #5c5c5c;
`;

export const Span = styled.p`
    font-size: 15px;
    text-align: center;
    //color: #898989;
    color: ${props => props.color === "red" ? "red" : "#898989"};
    font-family:${props => props.color === "red" ? "DINNextLTPro-Bold" : "DINNextLTPro-Regular"}; // 'DINNextLTPro-Bold';
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
export const Button = styled.button`
    font-family: 'DINNextLTPro-Bold';
    font-size: 15px;
    padding: 13px 25px 9px;
    margin-top: ${props => props.color === "white" ? "0" : "20px"};
    border: none;
    border-radius: 8px;
    cursor: pointer;
    text-decoration: none;
    
    background: ${props => props.color === "white" ? "#fff" : "#32cdff"};
    color: ${props => props.color === "white" ? "#32cdff" : "#fff"};
    text-transform: uppercase;
    
    &:hover {
        filter: brightness(95%);
    }
    &:focus {
        outline: none;
    }
    &:disabled {
      cursor: default;
      opacity: .4;
    }
`;

