import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../main/bll/store";
import Preloader from "../../main/ui/components/preloader/Preloader";
import {chooseCardsPage, deleteCard, getCards, postCard, putCard} from "./cardsReducer";
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import CardsOfDecks from "./CardsOfDeck";
import Pagination from "../pagination";
import Modal from "../cardDecks/modal";
import {EditCardReduxForm} from "./editCardForm";

const CardsContainer: React.FC = (props: any) => {
debugger
    const dispatch = useDispatch();
    const {isLoading, cards, cardsTotalCount, pageCount, page} = useSelector((store: AppStateType) => store.cards);
    let deckId = props.match.params.deckId;

    useEffect(() => {
        dispatch(getCards(deckId))
    }, [dispatch, deckId]);

    const onDeleteCard = (id: string) => dispatch(deleteCard(id));

    const changePage = (page: number) => dispatch(chooseCardsPage(page, deckId));

    const [{isEditOpened, editedCardId}, switchEditModal] = useState({isEditOpened: false, editedCardId: ''});
    const closeEditModal = () => switchEditModal({isEditOpened: false, editedCardId: ''});
    const editCard = (cardId: string) => switchEditModal({isEditOpened: true, editedCardId: cardId});
    const changeCard = ({question, answer}: any) => {
        let card = {
            cardsPack_id: deckId,
            _id: editedCardId,
            question, answer
        }
        dispatch(putCard(card));
        switchEditModal({isEditOpened: false, editedCardId: ''})
    };

    const [isAddModalOpened, switchAddModal] = useState(false);
    const openAddModal = () => switchAddModal(true);
    const closeAddModal = () => switchAddModal(false);
    const addCard = ({question, answer}: any) => {
        let card = {
            cardsPack_id: deckId,
            question, answer
        }
        dispatch(postCard(card));
        switchAddModal(false)
    };

    return (
        <>
            {isLoading ? <Preloader size={30} backColor="#fff" frontColor="#32cdff" isLoading={isLoading}/> :
                <>
                    <CardsOfDecks cards={cards} deleteCard={onDeleteCard} editCard={editCard} addCard={openAddModal}/>
                    <Pagination totalCount={cardsTotalCount} onPageCount={pageCount} currentPage={page}
                                textAlign={'center'}
                                changePage={changePage}/>
                </>
            }
            {isEditOpened &&
            <Modal closeModal={closeEditModal}>
                <EditCardReduxForm isLoading={isLoading} onSubmit={changeCard} modalType={'edit'}
                                   card={cards.find(card => card._id === editedCardId)}/>
            </Modal>
            }
            {isAddModalOpened &&
            <Modal closeModal={closeAddModal}>
                <EditCardReduxForm isLoading={isLoading} onSubmit={addCard} modalType={'add'}/>
            </Modal>
            }
        </>
    )
}

export default compose(
    withRouter
)(CardsContainer)

