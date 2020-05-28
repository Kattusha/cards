import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../main/bll/store";
import {choosePage, getDecks} from "../02-tables/bll/cardDecksReducer";
import Preloader from "../main/ui/components/preloader/Preloader";
import Pagination from "../02-tables/pagination";
import {MainContainer} from "../main/ui/style/bodyStyle";
import DeckBlock from "./DeckBlock";
import styled from "styled-components/macro";

const DecksAllContainer: React.FC = (props: any) => {

    const dispatch = useDispatch();
    const {
        isLoading,
        cardPacksTotalCount,
        cardPacks,
        page,
        pageCount} = useSelector((store: AppStateType) => store.cardDecksReducer);
    // const userId = useSelector((store: AppStateType) => store.login.userId);


    useEffect(() => {
        dispatch(getDecks())
    }, [dispatch]);

    const changePage = (page: number) => {
        dispatch(choosePage(page))
    };

    return (
        <>
            {isLoading ? <Preloader size={30} backColor="#fff" frontColor="#32cdff" isLoading={isLoading}/> :
                <DecksContainer whiteBox>
                    <p>Total count decks: {cardPacksTotalCount}</p>
                    <DecksAllWrapper>
                        { cardPacks.map(deck => <DeckBlock key={deck._id} {...deck}/>) }
                    </DecksAllWrapper>
                    <Pagination totalCount={cardPacksTotalCount} onPageCount={pageCount} currentPage={page}
                                textAlign={'none'}
                                changePage={changePage}/>

                </DecksContainer>}
        </>
    )
}

export default DecksAllContainer

//styles
const DecksContainer = styled(MainContainer)`
  flex-direction: column;
  align-items: stretch;
  justify-content: normal;
  text-align: end;
  padding: 15px 25px;
`;
const DecksAllWrapper = styled.div`
  display: flex;
  //justify-content: space-around;
  margin-top: 30px;
  flex-wrap: wrap;
`;