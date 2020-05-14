import React from 'react';
import styled from "styled-components/macro";
import {Button, H3, H1, ContainerWrapper} from "../../main/ui/style/commonStyle";
import {library} from "@fortawesome/fontawesome-svg-core";
import {fas} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconDiv} from "../../main/ui/style/headerStyle";
import {useDispatch, useSelector} from "react-redux";
import {logOut} from "../login/login-reducer";
import {AppStateType} from "../../main/bll/store";
import {Redirect} from "react-router-dom";
import {LOGIN_PATH} from "../../main/ui/components/Body";
import {MainContainer} from "../../main/ui/style/bodyStyle";
import noUserPhoto from '../../main/ui/images/no-user-photo.jpg'
import CardDecksContainer from "../../02-tables/cardDecks/cardDecksContainer";

library.add(fas);

const Profile: React.FC = () => {

    const dispatch = useDispatch();
    const {isAuthorized, email} = useSelector((store: AppStateType) => store.login);

    const onLogOut = () => {
        dispatch(logOut());
    }

    if (!isAuthorized) return <Redirect to={LOGIN_PATH}/>

    return (
        <ProfileContainer>
            <UserCardInfo>
                <UserPhoto src={noUserPhoto} alt="no user photo"/>
                {/*userName*/}
                <H1>{email}</H1>
                <Line />
                <Button color={"blue"} onClick={onLogOut}>
                    <IconDiv><FontAwesomeIcon icon={['fas', 'sign-out-alt']}/></IconDiv>
                    Log out
                </Button>
            </UserCardInfo>
            <UserDecksInfoContainer>
                <CardDecksContainer />
            </UserDecksInfoContainer>
        </ProfileContainer>
    )
}

export default Profile;

const ProfileContainer = styled(MainContainer)`
  align-items: flex-start;
  justify-content: left;
`;
const UserDecksInfoContainer = styled(MainContainer)`
  background-color: #fff;
  border-radius: 15px;
  margin-left: 64px;
  max-width: 776px;
  //vertical-align: top;
  width: 776px;
`;

const UserCardInfo = styled.div`
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
