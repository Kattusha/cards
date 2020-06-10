import React from 'react';
import {library} from "@fortawesome/fontawesome-svg-core";
import {fas} from "@fortawesome/free-solid-svg-icons";
import {MessageType} from "./entities-chatAPI";
import noUserPhoto from '../main/ui/images/no-user-photo.jpg'
import styled from "styled-components/macro";
import {UserPhoto} from "../06-change profile/Settings";
import {TextNavLink} from '../main/ui/style/headerStyle';
import {PROFILE_PATH} from "../main/ui/components/Body";
import {NavLink} from "react-router-dom";

library.add(fas);

type PropsType = {
    message: MessageType
}

const Message: React.FC<PropsType> = ({message}) => {

    const avatar = message.avatar !== "some avatar" ? message.avatar : null

    const messageDate = new Date(message.updated)
    const todayDate = new Date()

    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const diffDays = Math.round((todayDate.getTime() - messageDate.getTime()) / (oneDay));

    // debugger
    return (
        <MessageItemContainer>
            <NavLink to={PROFILE_PATH}>
                <UserPhotoForMessage src={avatar || noUserPhoto} alt="user photo"/>
            </NavLink>
            <MessageInfo>
                <div>
                    <TextNavLink to={PROFILE_PATH}>{message.user_name}</TextNavLink>
                    <TextTime>{`${diffDays} days ago`}</TextTime>
                </div>
                <div>
                    <h3>{message.message}</h3>
                </div>
            </MessageInfo>
        </MessageItemContainer>
    )
}

export default Message;

const MessageItemContainer = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 30px;
`

const UserPhotoForMessage = styled(UserPhoto)`
  height: 60px;
  width: 60px;
  margin: 0;
`;
const TextTime = styled.span`
  color: #afafaf;
  font-size: 14px;
  font-weight: 700;
  margin-left: 3px;
  margin-right: 10px;
`
const MessageInfo = styled.div`
margin-left: 5%;
`
