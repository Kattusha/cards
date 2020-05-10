import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../main/bll/store";
import {getCards, getDecks} from "./cardDecksReducer";
import Preloader from "../../main/ui/components/Preloader";
import CardDecks from "./cardDecks";

const CardDecksContainer = () => {

    const {decks, isLoading} = useSelector((store: AppStateType) => store.cardDecksReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDecks())
    }, []);

    const onDeckClickHandler = (id: string) => {
        dispatch(getCards());
    }

    return (
        <>
            {isLoading ? <Preloader/> :
                <CardDecks decks={decks}/>}
        </>
    )
}

export default CardDecksContainer