import React from 'react';
import {library} from "@fortawesome/fontawesome-svg-core";
import {fas} from "@fortawesome/free-solid-svg-icons";
import {MessageType} from "./entities-chatAPI";
import { FlexRowCenter } from '../main/ui/style/commonStyle';
import noUserPhoto from '../main/ui/images/no-user-photo.jpg'
import styled from "styled-components/macro";
import {UserPhoto} from "../06-change profile/Settings";
import { TextNavLink } from '../main/ui/style/headerStyle';
import Profile from "../main/ui/components/Profile";
import {PROFILE_PATH} from "../main/ui/components/Body";

library.add(fas);

type PropsType = {
    message: MessageType
}

const Message: React.FC<PropsType> = ({message}) => {


    const messageDate = new Date(message.updated)
    const todayDate = new Date()

    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const diffDays = Math.round((todayDate.getTime() - messageDate.getTime()) / (oneDay));

    // debugger
    return (
        <FlexRowCenter>
            <UserPhotoForMessage src={message.avatar || noUserPhoto} alt="user photo" />
            <div>
                <div>
                    <TextNavLink to={PROFILE_PATH}>{message.user_name}</TextNavLink>
                    <TextTime>{`${diffDays} days ago`}</TextTime>
                </div>
                <div>
                    <p>{message.message}</p>
                </div>
            </div>
        </FlexRowCenter>
    )
}

export default Message;

const UserPhotoForMessage = styled(UserPhoto)`
  height: 100px;
  width: 100px;
`;
const TextTime = styled.span`
  color: #afafaf;
  font-size: 16px;
  font-weight: 700;
  margin-left: 3px;
  margin-right: 10px;
`
