import React, {useEffect, useState} from "react";
import {EditorReduxForm} from "./editor";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../main/bll/store";
import {addDeckWithCards} from "../02-tables/bll/cardDecksReducer";
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

    // const editDeck = () => {
    //
    // };

    const createNewDeck = ({name, cards}: any) => {
        const newPack = {user_id: userId, name};
        dispatch(addDeckWithCards(newPack, cards));
    };

    if (editorType === 'Card Editor') return (
        <Modal closeModal={switchCardEditor}>
            <SingleCardReduxForm onSubmit={addCard}/>
        </Modal>
    );

    if (editedDeckId !== '') return (
            <EditorReduxForm onSubmit={addCard} deckId={editedDeckId}
                             name={cardPacks.find(deck => deck._id === editedDeckId)!.name}/>
    );

    return <EditorReduxForm onSubmit={createNewDeck}/>

};

export default DecksEditorContainer