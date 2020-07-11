import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../main/bll/store";
import {choosePage, getDecks} from "../02-tables/bll/cardDecksReducer";
import Preloader from "../main/ui/components/preloader/Preloader";
import Pagination from "../02-tables/pagination";
import {MainContainer} from "../main/ui/style/bodyStyle";
import DeckBlock from "../03-decksAll-decksMe/DeckBlock";
import styled from "styled-components/macro";
import {H3, Button, FlexRowEnd} from "../main/ui/style/commonStyle";
import {getUsers} from "./chat-reducer";
import UserBlock from "./UserBlock";

const UsersContainer: React.FC = (props: any) => {

    const dispatch = useDispatch();
    const {isLoading} = useSelector((store: AppStateType) => store.requestStatus);
    const {users, usersTotalCount, pageCount, page} = useSelector((store: AppStateType) => store.chatroom);

    useEffect(() => {
        dispatch(getUsers())
    }, [dispatch]);

    const changePage = (page: number) => {
        // dispatch(choosePage(page))
    };

    return (
        <>
            {isLoading ? <Preloader isLoading={isLoading}/> :
                <DecksContainer whiteBox>
                    <DecksAllWrapper>
                        {users && users.map(user => <UserBlock key={user._id} {...user}/>)}
                    </DecksAllWrapper>
                </DecksContainer>}
        </>
    )
}

export default UsersContainer

const DecksContainer = styled(MainContainer)`
  flex-direction: column;
  align-items: flex-start;
  justify-content: normal;
  text-align: end;
  padding: 15px 25px;
`;
const DecksAllWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  flex-wrap: wrap;
`;