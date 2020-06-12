import React, {useEffect} from 'react';
import styled from "styled-components/macro";
import {H1, H3, TransparentButton} from "../main/ui/style/commonStyle";
import {library} from "@fortawesome/fontawesome-svg-core";
import {fas} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconDiv} from "../main/ui/style/headerStyle";
import {useDispatch, useSelector} from "react-redux";
import {logOut} from "../01-auth/bll/login-reducer";
import {AppStateType} from "../main/bll/store";
import {NavLink, Redirect, Route} from "react-router-dom";
import {DECK_CARDS_PATH_ME, MAIN_PATH, PROFILE_PATH, SETTINGS_PATH} from "../main/ui/components/Routes";
import {MainContainer} from "../main/ui/style/bodyStyle";
import noUserPhoto from '../main/ui/images/no-user-photo.jpg'
import CardDecksContainer from "../02-tables/cardDecks/cardDecksContainer";
import CardsContainer from "../02-tables/cards/cardsContainer";
import {getDecks} from "../02-tables/bll/cardDecksReducer";
import {getUsers, getUser} from "./chat-reducer";
import Profile from "../main/ui/components/Profile";

library.add(fas);

const ProfileUser: React.FC = (props: any) => {

    const displayedUserId: string = props.match.params.userId;
    const userName: string = props.match.params.userName;

    const dispatch = useDispatch();
    const {isLoading} = useSelector((store: AppStateType) => store.requestStatus);
    const {userId} = useSelector((store: AppStateType) => store.login);
    const {displayedUser} = useSelector((store: AppStateType) => store.chatroom);

    const countDecks: number = displayedUser?.publicCardPacksCount ? displayedUser?.publicCardPacksCount : 0

    useEffect(() => {
        // debugger
        dispatch(getUser(displayedUserId))
    }, [dispatch]);

    if (userId === displayedUserId)
        return <Redirect to={PROFILE_PATH}/>

    return (
        <ProfileContainer>
            <UserCardInfo>
                <UserPhoto src={displayedUser?.avatar && noUserPhoto} alt="no user photo"/>
                {/*userName*/}
                <H1>{userName}</H1>
                <Line/>
            </UserCardInfo>
            <UserDecksInfoContainer>
                <H3 fontSize={'18px'}>{`Count decks: ${countDecks}`}</H3>
            </UserDecksInfoContainer>
        </ProfileContainer>
    )
}

export default ProfileUser;

export const ProfileContainer = styled(MainContainer)`
  align-items: flex-start;
  justify-content: left;
`;
export const UserDecksInfoContainer = styled(MainContainer)`
  background-color: #fff;
  //border-radius: 15px;
  margin-left: 54px;
  max-width: 776px;
  //vertical-align: top;
  //width: 776px;
  padding: 20px 30px;
  align-items: flex-start;
  justify-content: center;
  width: 70%;
`;
export const UserCardInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30%;
`;
const UserPhoto = styled.img`
  border: 5px solid #fff;
  border-radius: 100%;
  height: 120px;
  margin: auto;
  width: 120px;
`;
export const Line = styled.div`
  background-color: #e8e8e8;
  height: 2px;
  margin: 15px 0;
  width: 100%;
`;
const ButtonsBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;
