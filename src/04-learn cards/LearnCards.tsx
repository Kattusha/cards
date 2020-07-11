import React, {useEffect, useState} from "react";
import {Button, H3} from "../main/ui/style/commonStyle";
import OneCard from "./OneCard";
import styled from "styled-components/macro";
import {faDizzy, faFrown, faGrimace, faGrinStars, faMehRollingEyes} from '@fortawesome/free-regular-svg-icons'
import GradeIcon from "./GradeIcon";
import {useDispatch} from "react-redux";
import {putGradeCard} from "../02-tables/bll/cardsReducer";
import {CardType} from "../02-tables/api/entities-cardsAPI";

const grades = [
    {iconTitle: faDizzy, tooltip: 'did not know', grade: 1},
    {iconTitle: faFrown, tooltip: 'forgot', grade: 2},
    {iconTitle: faMehRollingEyes, tooltip: 'thought for a long time', grade: 3},
    {iconTitle: faGrimace, tooltip: 'mixed up', grade: 4},
    {iconTitle: faGrinStars, tooltip: 'knew', grade: 5}
];


type PropsType = {
    cards: Array<CardType>
    closeModal: () => void
    // deleteCard: (id: string) => void,
    // editCard: (id: string) => void,
    // addCard: () => void
}

const LearnCards: React.FC<PropsType> = ({cards, closeModal}) => {

    const dispatch = useDispatch();
    const [isShowAnswer, setIsShowAnswer] = useState<boolean>(false);
    const [currentCard, setCurrentCard] = useState<CardType>(cards[0])
    const [countCard, setCountCard] = useState<number>(1)

    useEffect(() => {
        setCurrentCard(cards[countCard - 1])
    }, [cards, countCard]);

    const onChangeShow = (isShow: boolean) => {
        setIsShowAnswer(isShow)
    }

    const onNextCard = () => {
        if (countCard !== cards.length) {
            setCountCard(countCard + 1);
            setCurrentCard(cards[countCard]);
            setIsShowAnswer(false);
        } else closeModal();
    }
    const setGradeCard = (grade: number) => {
        dispatch(putGradeCard(currentCard._id, grade));
    }

    return (
        <>
            {!isShowAnswer ?
                <>
                    <OneCard text={currentCard.question} isShowAnswer={isShowAnswer} changeShow={onChangeShow}/>
                </>
                :
                <>
                    <OneCard text={currentCard.answer} isShowAnswer={isShowAnswer} changeShow={onChangeShow}/>
                </>
            }
            <H3 color={'#c4c4c4'} fontSize={'18px'}>Click on me to see the {!isShowAnswer ? 'answer' : 'question'}</H3>
            <Button color={"blue"} onClick={onNextCard}>{countCard !== cards.length ? 'Continue' : 'Finish'}</Button>

            <IconsWrapper>
                {grades.map((item, index) => (
                    <GradeIcon key={index} index={index + 1} tooltip={item.tooltip} icon={item.iconTitle}
                               setGradeCard={setGradeCard} grade={item.grade} currentGradeCard={currentCard.grade}/>
                ))}
            </IconsWrapper>
        </>
    )
}

export default LearnCards

const IconsWrapper = styled.div`
  position: absolute;
  bottom: 30px;
  left: 30px;
  display: flex;
`