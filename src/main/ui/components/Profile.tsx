import React from 'react';
import styled from "styled-components/macro";
import {Button, H1} from "../style/commonStyle";
import {library} from "@fortawesome/fontawesome-svg-core";
import {fas} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconDiv} from "../style/headerStyle";
import {useDispatch, useSelector} from "react-redux";
import {logOut} from "../../../01-auth/bll/login-reducer";
import {AppStateType} from "../../bll/store";
import {Redirect, Route} from "react-router-dom";
import {DECK_CARDS_PATH_ME, MAIN_PATH, PROFILE_PATH} from "./Body";
import {MainContainer} from "../style/bodyStyle";
import noUserPhoto from '../images/no-user-photo.jpg'
import CardDecksContainer from "../../../02-tables/cardDecks/cardDecksContainer";
import CardsContainer from "../../../02-tables/cards/cardsContainer";

library.add(fas);

const Profile: React.FC = () => {

    const dispatch = useDispatch();
    const {isAuthorized, email} = useSelector((store: AppStateType) => store.login);

    const onLogOut = () => {
        dispatch(logOut());
    }
    if (!isAuthorized)
        return <Redirect to={MAIN_PATH}/>;
    return (

        <ProfileContainer>
            <UserCardInfo>
                <UserPhoto src={noUserPhoto} alt="no user photo"/>
                {/*userName*/}
                <H1>{email}</H1>
                <Line/>
                <Button color={"blue"} onClick={onLogOut}>
                    <IconDiv><FontAwesomeIcon icon={['fas', 'sign-out-alt']}/></IconDiv>
                    Log out
                </Button>
            </UserCardInfo>
            <UserDecksInfoContainer>
                <Route path={DECK_CARDS_PATH_ME}>
                    <CardsContainer/>
                </Route>
                <Route exact path={PROFILE_PATH}>
                    <CardDecksContainer/>
                </Route>
            </UserDecksInfoContainer>
        </ProfileContainer>
    )
}

export default Profile;

export const ProfileContainer = styled(MainContainer)`
  align-items: flex-start;
  justify-content: left;
`;
export const UserDecksInfoContainer = styled(MainContainer)`
  background-color: #fff;
  //border-radius: 15px;
  margin-left: 64px;
  max-width: 776px;
  //vertical-align: top;
  //width: 776px;
  padding: 20px 30px;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
`;
export const UserCardInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const UserPhoto = styled.img`
  border: 5px solid #fff;
  border-radius: 100%;
  height: 120px;
  margin: auto;
  width: 120px;
`;
const Line = styled.div`
  background-color: #e8e8e8;
  height: 1px;
  margin: 15px 0;
  width: 100%;
`;
