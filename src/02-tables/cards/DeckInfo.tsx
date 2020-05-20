import React from 'react';
import styled from "styled-components/macro";
import {H1} from "../../main/ui/style/commonStyle";
import {library} from "@fortawesome/fontawesome-svg-core";
import {fas} from "@fortawesome/free-solid-svg-icons";
import noDeckCover from "../../main/ui/images/no-deck-cover.jpg";
import {ProfileContainer, UserCardInfo, UserDecksInfoContainer} from '../../01-auth/profile/Profile';
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../main/bll/store";
import {CardPackType} from "../api";
import {DECK_CARDS_PATH_USER} from "../../main/ui/components/Body";
import { Route } from 'react-router-dom';
import CardsContainer from "./cardsContainer";

library.add(fas);

const DeckInfo: React.FC = (props: any) => {

    const dispatch = useDispatch();
    let deckId: string = props.match.params.deckId;

    const {cardPacks} = useSelector((store: AppStateType) => store.cardDecksReducer);

    const deck: CardPackType | undefined = cardPacks.find((deck) => deck._id === deckId);
    // debugger
    // const {isAuthorized, email} = useSelector((store: AppStateType) => store.login);
    //
    // const onLogOut = () => {
    //     dispatch(logOut());
    // }
    // if (!isAuthorized)
    //     return <Redirect to={LOGIN_PATH}/>;

    return (
        <ProfileContainer>
            <BlockDeckAbout>
                <DeckCover src={noDeckCover} alt="deck cover"/>
                <H1>{deck?.name}
                    {/*{email}*/}
                </H1>
                <p>User: {deck?.user_name}</p>
            </BlockDeckAbout>
            <UserDecksInfoContainer>
                {/*<Route path={DECK_CARDS_PATH_USER}>*/}
                    <CardsContainer/>
                {/*</Route>*/}
                {/*<Route exact path={PROFILE_PATH}>*/}
                {/*    <CardDecksContainer/>*/}
                {/*</Route>*/}
            </UserDecksInfoContainer>
        </ProfileContainer>
    )
}

export default DeckInfo;

const BlockDeckAbout = styled(UserCardInfo)`
  align-items: flex-start;
`;
export const DeckCover = styled.img`
  border-radius: 30px;
  height: 100%;
  width: 100%;
`;
