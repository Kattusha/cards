import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../main/bll/store";
import {addDeck, choosePage, deleteDeck, getDecks, putDeck, getDecksMe, actions} from "./cardDecksReducer";
import {choosePage, deleteDeck, getDecksMe, putDeck} from "./cardDecksReducer";
import Preloader from "../../main/ui/components/preloader/Preloader";
import CardDecks from "./cardDecks";
import styled from "styled-components/macro";
import Pagination from "../pagination";
import Modal from "../../main/ui/components/modal-forms/modal";
import {EditDeckReduxForm} from "./editDeckForm";
import {H3} from "../../main/ui/style/commonStyle";
import {EditCardReduxForm} from "../cards/editCardForm";
import {postCard} from "../cards/cardsReducer";
import {useHistory} from "react-router-dom";

const CardDecksContainer = () => {

    const {isLoading, cardPacksTotalCount, cardPacks, page, pageCount} =
        useSelector((store: AppStateType) => store.cardDecksReducer);
    // const userId = useSelector((store: AppStateType) => store.login.userId);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(getDecksMe())
    }, [dispatch]);

    const deletePack = (id: string) => {
        dispatch(deleteDeck(id))
    };

    const changePage = (page: number) => {
        dispatch(choosePage(page))
    };

    const [{isModalOpened, editedDeckId}, setChangeModal] = useState({isModalOpened: false, editedDeckId: ''});
    const closeModalWindow = () => setChangeModal({isModalOpened: false, editedDeckId: ''});
    const editDeck = (deckId: string) => {
        dispatch(actions.setEditedDeckId(deckId));
        history.push('/create')
    };
    const changePack = ({name}: any) => {
        let editedPack = {
            _id: editedDeckId,
            name
        }
        dispatch(putDeck(editedPack));
        closeModalWindow()
    };

    return (
        <>
            {isLoading ? <Preloader size={30} backColor="#fff" frontColor="#32cdff" isLoading={isLoading}/> :
                <Wrapper>
                    {cardPacks.length === 0 ? <H3 color={"#c4c4c4"}>This user has no decks.</H3>
                        :
                        <>
                            <p>Total count decks: {cardPacks.length}</p>
                            <CardDecks decks={cardPacks} deletePack={deletePack} editPack={editDeck}/>
                            <Pagination totalCount={cardPacksTotalCount} onPageCount={pageCount} currentPage={page}
                                        textAlign={'center'}
                                        changePage={changePage}/>
                        </>
                    }
                </Wrapper>}
            {isModalOpened &&
            <Modal closeModal={closeModalWindow}>
                <EditDeckReduxForm isLoading={isLoading} onSubmit={changePack}
                                   deck={cardPacks.find(deck => deck._id === editedDeckId)}/>
            </Modal>
            }
        </>
    )
}

export default CardDecksContainer

export const Wrapper = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
  align-items: flex-end;
`;