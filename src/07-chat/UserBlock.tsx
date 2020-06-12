import React from "react";
import {NavLink} from "react-router-dom";
import {FlexRowStart} from "../main/ui/style/commonStyle";
import {library} from "@fortawesome/fontawesome-svg-core";
import {far} from "@fortawesome/free-regular-svg-icons";
import {fas} from "@fortawesome/free-solid-svg-icons";
import {UserType} from "./entities-chatAPI";
import {PROFILE_PATH} from "../main/ui/components/Routes";
import noUserPhoto from "../main/ui/images/no-user-photo.jpg";
import {UserPhotoForMessage} from "./Message";
import styled from "styled-components/macro";
import {UserPhoto} from "../06-change profile/Settings";
import {TextNavLink} from "../main/ui/style/headerStyle";

library.add(far, fas);

const UserBlock = ({_id, name, avatar, ...props}: UserType) => {
    // debugger
    return (
        <UserBlockWrapper>
            <NavLink to={`/profile/${name}/${_id}`}>
                <UserImg src={avatar || noUserPhoto} alt="user photo"/>
            </NavLink>
            <div>
                <TextNavLink to={`/profile/${name}/${_id}`}>{name}</TextNavLink>
            </div>
        </UserBlockWrapper>
    )
}
export default UserBlock

const UserBlockWrapper = styled.div`
    display: flex;
    align-items: center;
    //justify-content: center;
    margin: 10px 20px;
`;
const UserImg = styled(UserPhoto)`
  height: 60px;
  width: 60px;
  margin-right: 20px;
`;