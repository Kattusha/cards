import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../main/bll/store";
import {getCards} from "../cardDecks/cardDecksReducer";
import Preloader from "../../main/ui/components/Preloader";
import Cards from "./cards";

const CardsContainer = () => {

    const {cards, isLoading} = useSelector((store: AppStateType) => store.cardDecksReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCards())
    }, [])

    return (
        <>
            {isLoading ? <Preloader/> :
                <Cards cards={cards}/>}
        </>
    )
}

export default CardsContainer
