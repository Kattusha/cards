import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../main/bll/store";
import {deleteDeck, getDecks} from "./cardDecksReducer";
import Preloader from "../../main/ui/components/Preloader";
import CardDecks from "./cardDecks";

const CardDecksContainer = () => {

    const isLoading = useSelector((store: AppStateType) => store.cardDecksReducer.isLoading);
    const decks = useSelector((store: AppStateType) => store.cardDecksReducer.decks.cardPacks);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDecks())
    }, []);

    const deletePack = (id: string) => {
        dispatch(deleteDeck(id))
    };
    const addPack = (name: string | null, path: string | null, grade: number | null, shots: number | null, rating: number | null,
                     type: string | null) => {
        let newPack = {
            user_id: "нужно его добавить в login-reducer",
            name,
            path,
            grade,
            shots,
            rating,
            type,
        }
    }


    return (
        <>
            {isLoading ? <Preloader/> :
                <CardDecks decks={decks} deletePack={deletePack}/>}
        </>
    )
}

export default CardDecksContainer