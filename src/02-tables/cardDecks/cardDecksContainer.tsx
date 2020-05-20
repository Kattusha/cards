import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../main/bll/store";
import {addDeck, choosePage, deleteDeck, getDecks, putDeck, getDecksMe} from "./cardDecksReducer";
import Preloader from "../../main/ui/components/preloader/Preloader";
import CardDecks from "./cardDecks";
import {AddDeckReduxForm} from "./addDeckForm";
import styled from "styled-components/macro";
import Pagination from "../pagination";
import Modal from "./modal";
import {EditDeckReduxForm} from "./editDeckForm";
import {CardPackType} from "../api";
import {H3} from "../../main/ui/style/commonStyle";
import {EditCardReduxForm} from "../cards/editCardForm";
import {postCard} from "../cards/cardsReducer";

const CardDecksContainer = () => {

    const {isLoading, cardPacksTotalCount, cardPacks, page, pageCount} =
        useSelector((store: AppStateType) => store.cardDecksReducer);
    const userId = useSelector((store: AppStateType) => store.login.userId);
    const dispatch = useDispatch();

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

    // const [isAddModalOpened, switchAddModal] = useState(false);
    // const openAddModal = () => switchAddModal(true);
    // const closeAddModal = () => switchAddModal(false);
    // const addPack = ({name}: any) => {
    //     let newPack = {
    //         user_id: userId,
    //         name,
    //     }
    //     dispatch(addDeck(newPack))
    //     //switchAddModal(false)
    // };

    const decksMe: Array<CardPackType> = cardPacks.filter((deck) => deck.user_id === userId)

    return (
        <>
            {isLoading ? <Preloader size={30} backColor="#fff" frontColor="#32cdff" isLoading={isLoading}/> :
                <Wrapper>
                    {/*{cardPacksTotalCount}*/}
                    {decksMe.length === 0 ? <H3 color={"#c4c4c4"}>This user has no decks.</H3>
                        :
                        <>
                            <p>Total count decks: {decksMe.length}</p>
                            {/*<AddDeckReduxForm onSubmit={addPack} isLoading={isLoading}/>*/}
                            <CardDecks decks={decksMe} deletePack={deletePack} editPack={editDeck}/>
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
            {/*{isAddModalOpened &&*/}
            {/*<Modal closeModal={closeAddModal}>*/}
            {/*    <AddDeckReduxForm isLoading={isLoading} onSubmit={addPack}/>*/}
            {/*</Modal>*/}
            {/*}*/}
        </>
    )
}

export default CardDecksContainer

export const Wrapper = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
`;