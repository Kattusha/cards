import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../main/bll/store";
import {addDeck, deleteDeck, getDecks} from "./cardDecksReducer";
import Preloader from "../../main/ui/components/Preloader";
import CardDecks from "./cardDecks";
import {AddDeckReduxForm} from "./addDeckForm";

const CardDecksContainer = () => {

    const isLoading = useSelector((store: AppStateType) => store.cardDecksReducer.isLoading);
    const decks = useSelector((store: AppStateType) => store.cardDecksReducer.decks.cardPacks);
    const userId = useSelector((store: AppStateType) => store.login.userId);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDecks())
    }, []);

    const deletePack = (id: string) => {
        dispatch(deleteDeck(id))
    };
    const addPack = ({name}: any) => {
        let newPack = {
            user_id: userId,
            name,
        }
        dispatch(addDeck(newPack))
    }


    return (
        <>
            {isLoading ? <Preloader/> :
                <>
                    <CardDecks decks={decks} deletePack={deletePack}/>
                    <AddDeckReduxForm onSubmit={addPack} isLoading={isLoading}/>
                </>}
        </>
    )
}

export default CardDecksContainer