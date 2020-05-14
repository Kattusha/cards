import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../main/bll/store";
import Preloader from "../../main/ui/components/preloader/Preloader";
import {getCards} from "./cardsReducer";
import CardDecks from "../cardDecks/cardDecks";
import {compose} from "redux";
import { withRouter } from "react-router-dom";

const CardsContainer: React.FC = (props: any) => {

    const dispatch = useDispatch();
    const {isLoading} = useSelector((store: AppStateType) => store.cards);
    const cards = useSelector((store: AppStateType) => store.cards.cards.cards);
    debugger
    let deckId = props.match.params.deckId;

    useEffect(() => {
        dispatch(getCards(deckId))
    }, []);

    const deleteCard = (id: string) => {
        // dispatch(deleteDeck(id))
        console.log("need delete card")
    };

    return (
        <>
            {isLoading ? <Preloader size={30} backColor="#fff" frontColor="#32cdff" isLoading={isLoading}/> :
                // <Cards cards={cards}/>
                <CardDecks decks={cards} deletePack={deleteCard}/>
            }
        </>
    )
}

export default compose(
    withRouter
)(CardsContainer)

// export default CardsContainer
