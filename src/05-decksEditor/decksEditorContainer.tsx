import React, {useEffect} from "react";
import {EditorReduxForm} from "./editor";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../main/bll/store";
import {actions, createOrEditDeckWithCards} from "../02-tables/bll/cardDecksReducer";
import {useHistory, useLocation, useParams} from "react-router-dom";

type PropsType = {
    editorType?: string
}

const DecksEditorContainer: React.FC<PropsType> = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const userId = useSelector((store: AppStateType) => store.login.userId);
    const {editedDeckId, redirectedId, cardPacks} = useSelector((store: AppStateType) => store.cardDecksReducer);
    const {deckId} = useParams()

    useEffect(() => {
        return () => {
            if (deckId) dispatch(actions.setEditedDeckId(''))
        }
    }, [])
    useEffect(() => {
        return () => {dispatch(actions.setRedirectedId(''))}
    }, [redirectedId]);


    const editDeck = ({name, editedCards, newCards}: any) => {
        const editedPack = cardPacks.find(deck => deck._id === deckId);
        const newPackName = name !== editedPack!.name ? {_id: deckId, name} : undefined;
        const correctedCards = editedCards ? editedCards.map((card: {id: string; }) => {
            return {...card, _id: card.id}
        }) : undefined;
        const correctedNewCards = newCards ? newCards.map((card: any) => {
            return {...card, cardsPack_id: editedDeckId}
        }) : undefined;
        dispatch(createOrEditDeckWithCards(newPackName, correctedCards, correctedNewCards));
    };

    const createNewDeck = ({name, newCards}: any) => {
        const newPack = {user_id: userId!, name};
        dispatch(createOrEditDeckWithCards(newPack, undefined, newCards));
    };

    if (redirectedId) history.push(`/profile/cards/${redirectedId}`);

    if (location.pathname === `/edit/${deckId}`) return (
            <EditorReduxForm onSubmit={editDeck} deckId={deckId}
                             name={cardPacks.find(deck => deck._id === deckId)!.name}/>
    );

    return <EditorReduxForm onSubmit={createNewDeck}/>;
};

export default DecksEditorContainer