import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../main/bll/store";
import {addDeck, choosePage, deleteDeck, getDecks, putDeck} from "./cardDecksReducer";
import Preloader from "../../main/ui/components/preloader/Preloader";
import CardDecks from "./cardDecks";
import {AddDeckReduxForm} from "./addDeckForm";
import styled from "styled-components/macro";
import Pagination from "../pagination";
import Modal from "./modal";
import {EditDeckReduxForm} from "./editDeckForm";

const CardDecksContainer = () => {

    const {isLoading, cardPacksTotalCount, cardPacks, page, pageCount} =
        useSelector((store: AppStateType) => store.cardDecksReducer);
    const userId = useSelector((store: AppStateType) => store.login.userId);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDecks())
    }, [dispatch]);

    const deletePack = (id: string) => {
        dispatch(deleteDeck(id))
    };
    const addPack = ({name}: any) => {
        let newPack = {
            user_id: userId,
            name,
        }
        dispatch(addDeck(newPack))
    };
    const changePage = (page: number) => {
        dispatch(choosePage(page))
    };

    const [{isModalOpened, editedDeckId}, setChangeModal] = useState({isModalOpened: false, editedDeckId: ''});
    const closeModalWindow = () => setChangeModal({isModalOpened: false, editedDeckId: ''});
    const editDeck = (deckId: string) => {
        setChangeModal({isModalOpened: true, editedDeckId: deckId});
    }
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
                    {cardPacksTotalCount}
                    <AddDeckReduxForm onSubmit={addPack} isLoading={isLoading}/>
                    <CardDecks decks={cardPacks} deletePack={deletePack} editPack={editDeck}/>
                    <Pagination totalCount={cardPacksTotalCount} onPageCount={pageCount} currentPage={page}
                                textAlign={'center'}
                                changePage={changePage}/>
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

const Wrapper = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
`;