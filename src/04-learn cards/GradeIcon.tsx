import React, {useState} from "react";
import {Button, H3, Span} from "../main/ui/style/commonStyle";
import {CardType} from "../02-tables/api";
import OneCard from "./OneCard";
import styled from "styled-components/macro";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faDizzy, faFrown, faMehRollingEyes, faGrimace, faGrinStars, IconDefinition  } from '@fortawesome/free-regular-svg-icons'
import {IconDiv} from "../main/ui/style/headerStyle";

type PropsType = {
    index: number
    tooltip: string
    icon: IconDefinition
    grade: number
    currentGradeCard: number
    setGradeCard: (grade: number) => void,
    // editCard: (id: string) => void,
    // addCard: () => void
}

const GradeIcon: React.FC<PropsType> = ({tooltip, icon, grade, currentGradeCard, index, setGradeCard}) => {

    const onGradeCard = (): void =>{
        // debugger
        setGradeCard(grade);
    }

    return (
            <IconWrapper onClick={onGradeCard}>
                <IconFase text={tooltip} colorBlue={currentGradeCard === index}>
                    <FontAwesomeIcon icon={icon}/>
                </IconFase>
            </IconWrapper>
    )
}

export default GradeIcon

const IconWrapper = styled.div`
position: relative;
`
const IconFase = styled.div<{ text?: string, colorBlue?: boolean}>`
    margin-right: 10px;
    display: inline-block;
    font-size: 25px;
    color: ${props => props.colorBlue ? "#32cdff" : "#c4c4c4"}; 
    cursor: pointer;
    &:hover{
      color: #32cdff;
    }
    &:hover:after { 
        content: '${props => props.text}'; 
        font-family: 'DINNextLTPro-Bold';
        position: absolute;
        bottom: -10px;
        left: 5px;
        height: .9rem;   
        //background-color: #4c4c4c7a;
        color: #32cdff;
        width: max-content;
        font-size: 14px;
        text-transform: initial;
        border-radius: 5px;
        padding: 10px 12px 0px 10px;
        filter: none;
    }
`;

