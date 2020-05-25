import React, {useState} from "react";
import {EditorReduxForm} from "./editor";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../main/bll/store";
import {addDeckWithCards} from "../02-tables/cardDecks/cardDecksReducer";
import {postCard} from "../02-tables/cards/cardsReducer";
import { Redirect } from "react-router-dom";
import Modal from "../02-tables/cardDecks/modal";
import { SingleCardReduxForm } from "./singleCardEditor";

type PropsType = {
    editorType?: string
}

const DecksEditorContainer: React.FC<PropsType> = ({editorType}) => {

    const dispatch = useDispatch();
    const userId = useSelector((store: AppStateType) => store.login.userId);
    const editedPackId = useSelector((store: AppStateType) => store.cardDecksReducer.editedDeckId);

    const [isCardEditorOpened, setCardEditor] = useState<boolean>(false);
    const switchCardEditor = () => setCardEditor(!isCardEditorOpened);


    const addCard = ({question, answer}: any) => {
        let card = {
            cardsPack_id: editedPackId,
            question, answer
        }
        dispatch(postCard(card));
        switchCardEditor()
    };

    const createNewDeck = ({name, cards}: any) => {
        let newPack = {user_id: userId, name};
        dispatch(addDeckWithCards(newPack, cards));
    }

    /*if (editorType === 'card editor')
*/
    if (editedPackId !== '') return <Redirect to={`/profile/cards/${editedPackId}`}/>;

    if (editorType === 'Card Editor') return(
        <Modal closeModal={switchCardEditor}>
            <SingleCardReduxForm onSubmit={addCard}/>
        </Modal>
        );

    return <EditorReduxForm onSubmit={createNewDeck}/>

};

export default DecksEditorContainer