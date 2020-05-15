import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../main/bll/store";
import Preloader from "../../main/ui/components/preloader/Preloader";
import {getCards, deleteCard} from "./cardsReducer";
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import CardsOfDecks from "./CardsOfDeck";

const CardsContainer: React.FC = (props: any) => {

    const dispatch = useDispatch();
    const {isLoading} = useSelector((store: AppStateType) => store.cards);
    const cards = useSelector((store: AppStateType) => store.cards.cards.cards);
    debugger
    let deckId = props.match.params.deckId;

    useEffect(() => {
        dispatch(getCards(deckId))
    }, []);

    const onDeleteCard = (id: string) => {
        dispatch(deleteCard(id));
        // console.log("need delete card")
    };

    return (
        <>
            {isLoading ? <Preloader size={30} backColor="#fff" frontColor="#32cdff" isLoading={isLoading}/> :
                <CardsOfDecks cards={cards} deleteCard={onDeleteCard}/>
            }
        </>
    )
}

export default compose(
    withRouter
)(CardsContainer)

// export default CardsContainer
