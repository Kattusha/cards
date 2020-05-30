import React, {useEffect, useState} from "react";
import styled from "styled-components/macro";
import {WrappedFieldArrayProps} from "redux-form";
import {AddCardButton} from "../02-tables/cards/CardsOfDeck";
import SingleCardForm from "./singleCardForm";
import {CardType} from "../02-tables/api/entities-cardsAPI";
import {useLocation} from "react-router-dom";
import {useDispatch} from "react-redux";


const AddCardButtonEditor = styled(AddCardButton)`
  right: 20px;
  left: auto;
`;

type PropsType = {
    error?: string,
    cards: Array<CardType>,
}

const CardsEditor: React.FC<PropsType & WrappedFieldArrayProps> = ({meta: {error}, cards, fields}) => {

    const location = useLocation();
    const dispatch = useDispatch();

    const [cardsAmount, setCardsAmount] = useState<number>(0);

    useEffect(() => {
        if (cards) {
            dispatch(fields.removeAll());
            if (cardsAmount < cards.length) {
                let i = 0;
                for (i; i < cards.length; i++) {
                    fields.push({});
                }
                setCardsAmount(i)
            }
        }
        if (location.pathname === `/create` && fields.length === 0) fields.push({});
    }, [cards]);

    const deleteCard = (index: number) => {
        fields.remove(index)
    }

    return (
        <>
            {fields.map((cardName, index) =>
                <SingleCardForm name={cardName} index={index} error={error} key={index}
                                cardForEdit={cards ? cards[index] : undefined} deleteCard={deleteCard}/>
            )}
            <AddCardButtonEditor type="button" onClick={() => fields.push({})}>+</AddCardButtonEditor>
        </>
    );
};

export default React.memo(CardsEditor)