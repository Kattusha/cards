import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../main/bll/store";
import Preloader from "../../main/ui/components/Preloader";

/*const CardsContainer = () => {

    const {cards, isLoading} = useSelector((store: AppStateType) => store.cardDecksReducer);
    const dispatch = useDispatch();


    return (
        <>
            {isLoading ? <Preloader/> :
                <Cards cards={cards}/>}
        </>
    )
}

export default CardsContainer*/
