import React, {useEffect, useState} from "react";
import {EditorReduxForm} from "./editor";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../main/bll/store";
import {addDeckWithCards} from "../02-tables/cardDecks/cardDecksReducer";
import {postCard} from "../02-tables/cards/cardsReducer";
import { Redirect } from "react-router-dom";
import Modal from "../02-tables/cardDecks/modal";
import { SingleCardReduxForm } from "./singleCardEditor";
import {useHistory} from "react-router-dom";

type PropsType = {
    editorType?: string
}

const DecksEditorContainer: React.FC<PropsType> = ({editorType}) => {

    const dispatch = useDispatch();
    const history = useHistory();
    const userId = useSelector((store: AppStateType) => store.login.userId);
    const {editedDeckId, redirectedId} = useSelector((store: AppStateType) => store.cardDecksReducer);

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

    const createNewDeck = ({name, cards}: any) => {
        const newPack = {user_id: userId, name};
        dispatch(addDeckWithCards(newPack, cards));
    };

    if (editorType === 'Card Editor') return(
        <Modal closeModal={switchCardEditor}>
            <SingleCardReduxForm onSubmit={addCard}/>
        </Modal>
        );

    return <EditorReduxForm onSubmit={createNewDeck}/>

};

export default DecksEditorContainer