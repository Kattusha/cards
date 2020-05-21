import React, {useState} from "react";
import {H3, Span} from "../main/ui/style/commonStyle";
import {CardType} from "../02-tables/api";
import OneCard from "./OneCard";
import styled from "styled-components/macro";
import {library} from "@fortawesome/fontawesome-svg-core";
import {far} from "@fortawesome/free-regular-svg-icons";
import {fas} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconDiv} from "../main/ui/style/headerStyle";

library.add(far, fas);

type PropsType = {
    cards: Array<CardType>
    // deleteCard: (id: string) => void,
    // editCard: (id: string) => void,
    // addCard: () => void
}

const LearnCards: React.FC<PropsType> = ({cards}) => {

    const [isShowAnswer, setIsShowAnswer] = useState<boolean>(false);

    const onChangeShow = (isShow: boolean) => {
        setIsShowAnswer(isShow)
    }

    return (
        <>
            {/*<H3 color={'#c4c4c4'}>Cards will be displayed here</H3>*/}

            {!isShowAnswer ?
                <>
                    <OneCard text={cards[0].question} isShowAnswer={isShowAnswer} changeShow={onChangeShow}/>
                    <H3 color={'#c4c4c4'} fontSize={'18px'}>Click on me to see
                        the {isShowAnswer ? 'answer' : 'question'}</H3>
                </>
                :
                <>
                    <OneCard text={cards[0].answer} isShowAnswer={isShowAnswer} changeShow={onChangeShow}/>
                    <H3 color={'#c4c4c4'} fontSize={'18px'}>Click on me to see
                        the {isShowAnswer ? 'answer' : 'question'}</H3>
                    <div>
                        <IconFase text={'did not know'} item={1}><FontAwesomeIcon icon={['far', 'dizzy']}/></IconFase>
                        <IconFase text={'forgot'} item={3}><FontAwesomeIcon icon={['far', 'frown']}/></IconFase>
                        <IconFase text={'thought for a long time'} item={5}><FontAwesomeIcon
                            icon={['far', 'meh-rolling-eyes']}/></IconFase>
                        <IconFase text={'mixed up'} item={7}><FontAwesomeIcon icon={['far', 'grimace']}/></IconFase>
                        <IconFase text={'knew'} item={9}><FontAwesomeIcon icon={['far', 'grin-stars']}/></IconFase>
                    </div>
                </>
            }

        </>
    )
}

export default LearnCards

const IconFase = styled.div<{ text?: string, item?: number }>`
    margin-right: 10px;
    display: inline-block;
    font-size: 25px;
    color: #c4c4c4;
    cursor: pointer;
    &:hover{
      color: #32cdff;
    }
    &:hover:after { 
        content: '${props => props.text}'; 
        font-family: 'DINNextLTPro-Bold';
        position: absolute;
        bottom: 30px;
        left: calc(20px * ${props => props.item ? props.item : 1});
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

