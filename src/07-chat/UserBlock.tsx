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

library.add(far, fas);

const UserBlock = ({_id, name, avatar, ...props}: UserType) => {
    // debugger
    return (
        <UserBlockWrapper>
            <NavLink to={PROFILE_PATH}>
                <UserPhotoForMessage src={avatar || noUserPhoto} alt="user photo"/>
            </NavLink>
            <div>
                {name}
            </div>
        </UserBlockWrapper>
    )
}
export default UserBlock

export const UserBlockWrapper = styled.div`
    display: flex;
    align-items: flex-start;
    //justify-content: center;
    margin: 10px 20px;
`;