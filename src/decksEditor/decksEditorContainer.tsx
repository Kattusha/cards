import React, {useEffect, useState} from "react";
import {EditorReduxForm} from "./editor";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../main/bll/store";
import {createOrEditDeckWithCards} from "../02-tables/cardDecks/cardDecksReducer";
import {postCard} from "../02-tables/cards/cardsReducer";
import Modal from "../main/ui/components/modal-forms/modal";
import {SingleCardReduxForm} from "./singleCardEditor";
import {useHistory} from "react-router-dom";

type PropsType = {
    editorType?: string
}

const DecksEditorContainer: React.FC<PropsType> = ({editorType}) => {

    const dispatch = useDispatch();
    const history = useHistory();
    const userId = useSelector((store: AppStateType) => store.login.userId);
    const {editedDeckId, redirectedId, cardPacks} = useSelector((store: AppStateType) => store.cardDecksReducer);

    const [isCardEditorOpened, setCardEditor] = useState<boolean>(false);
    const switchCardEditor = () => setCardEditor(!isCardEditorOpened);

    useEffect(() => {
        if (redirectedId !== '') history.push(`/profile/cards/${redirectedId}`)
    }, [redirectedId]);

    const addCard = ({question, answer}: any) => {
        const card = {
            cardsPack_id: editedDeckId,
            question, answer
        }
        dispatch(postCard(card));
        switchCardEditor()
    };

    const editDeck = ({name, editedCards, newCards}: any) => {
        const editedPack = cardPacks.find(deck => deck._id === editedDeckId);
        const newPack = name !== editedPack!.name ? {_id: editedPack!._id, name: name} : undefined;
        const correctedCards = editedCards ? editedCards.map((card: {id: string; }) => {
            return {...card, _id: card.id}
        }) : undefined;
        const correctedNewCards = newCards ? newCards.map((card: any) => {
            return {...card, cardsPack_id: editedDeckId}
        }) : undefined;
        dispatch(createOrEditDeckWithCards(newPack, correctedCards, correctedNewCards))
    };

    const createNewDeck = ({name, newCards}: any) => {
        const newPack = {user_id: userId!, name};
        dispatch(createOrEditDeckWithCards(newPack, undefined, newCards));
    };

    if (editorType === 'Card Editor') return (
        <Modal closeModal={switchCardEditor}>
            <SingleCardReduxForm onSubmit={addCard}/>
        </Modal>
    );

    if (editedDeckId !== '') return (
            <EditorReduxForm onSubmit={editDeck} deckId={editedDeckId}
                             name={cardPacks.find(deck => deck._id === editedDeckId)!.name}/>
    );

    return <EditorReduxForm onSubmit={createNewDeck}/>
};

export default DecksEditorContainer