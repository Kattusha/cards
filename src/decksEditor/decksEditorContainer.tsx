import React, {useEffect, useState} from "react";
import {EditorReduxForm} from "./editor";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../main/bll/store";
import {actions, createOrEditDeckWithCards} from "../02-tables/cardDecks/cardDecksReducer";
import {postCard} from "../02-tables/cards/cardsReducer";
import Modal from "../main/ui/components/modal-forms/modal";
import {SingleCardReduxForm} from "./singleCardEditor";
import {useHistory, useLocation, useParams} from "react-router-dom";
import {destroy, reset} from "redux-form";

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

    const [isCardEditorOpened, setCardEditor] = useState<boolean>(false);
    const switchCardEditor = () => setCardEditor(!isCardEditorOpened);

    useEffect(() => {
        if (redirectedId) history.push(`/profile/cards/${redirectedId}`);
        return () => {dispatch(actions.setRedirectedId(''))}
    }, [redirectedId])

    const addCard = async({question, answer}: any) => {
        const card = {
            cardsPack_id: editedDeckId,
            question, answer
        }
        await (async () => {
            dispatch(postCard(card));
        })();
        switchCardEditor()
    };

    const editDeck = async ({name, editedCards, newCards}: any) => {
       /* const editedPack = cardPacks.find(deck => deck._id === deckId);
        const newPackName = name !== editedPack!.name ? {_id: deckId, name} : undefined;
        const correctedCards = editedCards ? editedCards.map((card: {id: string; }) => {
            return {...card, _id: card.id}
        }) : undefined;
        const correctedNewCards = newCards ? newCards.map((card: any) => {
            return {...card, cardsPack_id: editedDeckId}
        }) : undefined;
        dispatch(createOrEditDeckWithCards(newPackName, correctedCards, correctedNewCards));*/
        dispatch(destroy('editor'))
        console.log(name, editedCards, newCards)
    };

    const createNewDeck = async({name, newCards}: any) => {
        const newPack = {user_id: userId!, name};
        dispatch(createOrEditDeckWithCards(newPack, undefined, newCards));
    };

    if (location.pathname === `/edit/${deckId}`) return (
            <EditorReduxForm onSubmit={editDeck} deckId={deckId}
                             name={cardPacks.find(deck => deck._id === deckId)!.name}/>
    );

    if (location.pathname === '/create') return <EditorReduxForm onSubmit={createNewDeck}/>;

    return (
        <Modal closeModal={switchCardEditor}>
            <SingleCardReduxForm onSubmit={addCard}/>
        </Modal>
    );
};

export default DecksEditorContainer