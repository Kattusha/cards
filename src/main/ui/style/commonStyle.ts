import styled from 'styled-components/macro';
import {NavLink} from "react-router-dom";

export const H1 = styled.h1<{color?: string}>`
    font-size: 27px;
    color: ${props => props.color ? props.color : "#5c5c5c"};
    font-family: DINNextLTPro-Medium;
    font-weight: 400;
    margin: 20px 0 0;
`;

export const H3 = styled.h3<{ color?: string, fontSize?: string }>`
    font-size: ${props => props.fontSize ? props.fontSize : "21px"}; 
    text-align: center;
    color: ${props => props.color ? props.color : "#5c5c5c"};
`;

export const Span = styled.p`
    font-size: 15px;
    text-align: center;
    //color: #898989; 
    color: ${props => props.color ? props.color : "#898989"};
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
`;
export const FlexRowStart = styled.div`
    display: flex;
    align-items: flex-start;
    //justify-content: center;
`;
export const FlexRowEnd = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
`;
export const ContainerWrapper = styled(FlexRowCenter)`
    margin: 0 auto;
    @media (max-width: 924px){
      margin: 2% 2%;
    }
    @media (min-width: 925px){
      max-width: 912px;
    }
    @media (min-width: 1100px) {
      max-width: 1082px;
    }
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
        //cursor: default;
        //opacity: .4;
        background-color: #b0afaf;
        cursor: not-allowed;
    }
`;
export const TextLink = styled(NavLink)`
    font-family: 'DINNextLTPro-Bold';
    font-size: 15px;
    color: #32cdff;
    padding: 6px 5px 4px;
    margin-top: 10px;
    cursor: pointer;
    text-transform: uppercase;
    text-decoration: none;
       
    &:hover {
        filter: brightness(95%);
    }
`;
export const TransparentButton = styled.button`
    font-family: 'DINNextLTPro-Bold';
    font-size: 15px;
    padding: 10px 15px 6px;
    margin: 20px 10px 0px 10px;
    background-color: transparent;
    border: 2px solid #32cdff;
    border-radius: 7px;
    color: #32cdff;
    cursor: pointer;
    text-align: center; 
    text-transform: uppercase;
    text-decoration: none;
    
    &:hover {
        filter: brightness(95%);
    }
    &:focus {
        outline: none;
    }
    &:disabled {
        //cursor: default;
        //opacity: .4;
        background-color: #b0afaf;
        cursor: not-allowed;
    }
`;
export const HR = styled.hr`
  border: 0;
  border-top: 2px solid #e8e8e8;
  height: 0;
  margin: 20px 0;
`
