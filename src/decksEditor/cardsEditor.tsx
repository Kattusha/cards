import React, {useEffect, useState} from "react";
import styled from "styled-components/macro";
import {arrayRemove, WrappedFieldArrayProps} from "redux-form";
import {AddCardButton} from "../02-tables/cards/CardsOfDeck";
import SingleCardForm from "./singleCardForm";
import {CardType} from "../02-tables/api";
import {useDispatch} from "react-redux";


const AddCardButtonEditor = styled(AddCardButton)`
  right: 20px;
  left: auto;
`;

type PropsType = {
    error?: string,
    cards: Array<CardType>,
    isEdit: boolean
}

const CardsEditor: React.FC<PropsType & WrappedFieldArrayProps> = ({meta: {error}, cards, isEdit}) => {

    const dispatch = useDispatch();

    useEffect(() => {
        if (cards.length === 0 || !cards) setNewCards([{} as CardType])
    }, []);

    const [cardsForEdit, setEditedCards] = useState<Array<CardType>>(cards);
    const [newCards, setNewCards] = useState<Array<CardType>>([]);

    const addCard = () => {
        setNewCards([...newCards, {} as CardType])
    };

    const deleteEditedCard = (index: number,fullCardName: string) => {
        const newCards = cardsForEdit.filter((_, id) => id !== index);
        dispatch(arrayRemove('editor', fullCardName, index));
        setEditedCards(newCards)
    };
    const deleteNewCard = (index: number,fullCardName: string) => {
        const newCardsArr = newCards.filter((_, id) => id !== index);
        dispatch(arrayRemove('editor', fullCardName, index));
        setNewCards(newCardsArr)
    };

    return (
        <>
            {cardsForEdit.map((card, index) =>
                <SingleCardForm cardForEdit={card} index={index} error={error} key={index} deleteCard={deleteEditedCard}/>
            )}
            {newCards.map((card, index) =>
                <SingleCardForm cardForEdit={card} index={index} error={error} key={index} deleteCard={deleteNewCard}/>
            )}
            <AddCardButtonEditor type="button" onClick={addCard}>+</AddCardButtonEditor>
        </>
    );
};

export default CardsEditor