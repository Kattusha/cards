import React, {useEffect, useState} from "react";
import styled from "styled-components/macro";
import {WrappedFieldArrayProps} from "redux-form";
import {AddCardButton} from "../02-tables/cards/CardsOfDeck";
import SingleCardForm from "./singleCardForm";
import {CardType} from "../02-tables/api";


const AddCardButtonEditor = styled(AddCardButton)`
  right: 20px;
  left: auto;
`;

type PropsType = {
    error?: string,
    cards: Array<CardType>
}

const CardsEditor: React.FC<PropsType & WrappedFieldArrayProps> = ({fields, meta: {error}, cards}) => {

    useEffect(() => {
       if (cards.length === 0) fields.push({})
    }, []);

    const [cardsForEdit, setEditedCards] = useState<Array<CardType>>(cards);

    const addCard = () => {
        if (cards.length === 0) {
            fields.push({})
        } else {
            setEditedCards([...cardsForEdit,{} as CardType])
        }
    };
    const deleteCard = (index: number) => {
        if (cards.length === 0) {
            fields.remove(index)
        } else {
            const newCards = cardsForEdit.filter((_, id) => id !== index)
            setEditedCards(newCards)
        }
    };

    return (
        <>
            {cards.length !== 0 ?
                cardsForEdit.map((card, index) =>
                    <SingleCardForm cardForEdit={card} index={index} error={error} key={index} deleteCard={deleteCard}/>
                ) :
                fields.map((card, index) =>
                <SingleCardForm card={card} index={index} error={error} key={index} deleteCard={deleteCard}/>
            )}
            <AddCardButtonEditor type="button" onClick={addCard}>+</AddCardButtonEditor>
        </>
    );
};

export default CardsEditor