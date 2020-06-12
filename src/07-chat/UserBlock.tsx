import React from "react";
import styled from "styled-components/macro";
import {NavLink} from "react-router-dom";
import {FlexRowStart} from "../main/ui/style/commonStyle";
import {library} from "@fortawesome/fontawesome-svg-core";
import {far} from "@fortawesome/free-regular-svg-icons";
import {fas} from "@fortawesome/free-solid-svg-icons";
import {UserType} from "./entities-chatAPI";
import {PROFILE_PATH} from "../main/ui/components/Routes";
import noUserPhoto from "../main/ui/images/no-user-photo.jpg";
import {UserPhotoForMessage} from "./Message";

library.add(far, fas);

const UserBlock = ({_id, name, avatar, ...props}: UserType) => {
    debugger
    return (
        <FlexRowStart>
            {name}

            {/*<NavLink to={PROFILE_PATH}>*/}
            {/*    <UserPhotoForMessage src={avatar || noUserPhoto} alt="user photo"/>*/}
            {/*</NavLink>*/}
            {/*<div>*/}
            {/*    {name}*/}
            {/*</div>*/}
        </FlexRowStart>

        // <DeckBlockWrapper as={NavLink} to={`/profile/${name}/${_id}`}>
        //     <DeckCoverWrapper>
        //         <DeckCover src={noDeckCover || deckCover} alt="deck cover"/>
        //     </DeckCoverWrapper>
        //     <Div_FlexRowJustify>
        //         <P_styled color={'#5c5c5c'}>{name}</P_styled>
        //         <Span_styled><IconDiv><FontAwesomeIcon icon={['far', 'clone']}/></IconDiv>{cardsCount}</Span_styled>
        //     </Div_FlexRowJustify>
        //     {/*<span>{grade} {shots} {rating}</span>*/}
        // </DeckBlockWrapper>
    )
}
export default UserBlock

//styles
const DeckBlockWrapper = styled.div`
  font-family: 'DINNextLTPro-Medium';
  font-size: 15px;
  margin: 0 1.5% 40px 1.5%;
  width: 144px;
  color: #5c5c5c;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-decoration: none;
  opacity: 1;
  &:hover{
    opacity: .7;
    outline:none;
    //border: 1px solid #32cdff;
  }
`;
const DeckCoverWrapper = styled.div`
  box-shadow: 0 2px 6px rgba(0,0,0,.1), 0 6px 0 -1px #fff, 0 7px 6px rgba(0,0,0,.1), 0 11px 0 -1px #fff, 0 12px 6px rgba(0,0,0,.1);
  border-radius: 5px;
  margin-bottom: 10px;
`;

const Span_styled = styled.span`
    color: #c4c4c4;
    //margin-left: 1px;
`;
const Div_FlexRowJustify = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
