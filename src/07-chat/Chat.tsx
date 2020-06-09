import React, {useEffect} from 'react';
import styled from "styled-components/macro";
import {library} from "@fortawesome/fontawesome-svg-core";
import {fas} from "@fortawesome/free-solid-svg-icons";
import {MainContainer} from "../main/ui/style/bodyStyle";
import {Button, FlexRowEnd, HR} from "../main/ui/style/commonStyle";
import { Line } from '../main/ui/components/Profile';
import {useDispatch, useSelector} from "react-redux";
import {getMessages} from "./chat-reducer";
import {AppStateType} from "../main/bll/store";
import {MessageType} from "./entities-chatAPI";
import Message from './Message';

library.add(fas);

const Chat: React.FC = () => {

    const dispatch = useDispatch()
    const {messages} = useSelector((store: AppStateType) => store.chatroom)

    useEffect(()=>{
        dispatch(getMessages())
    },[dispatch])

    return (
        <ChatContainer>
            <FlexRowEnd>
                <Button>Create discuss</Button>
            </FlexRowEnd>
            <Line/>
            <div>
                {messages && messages.map((m)=><Message key={m._id} message={m}/>)}
            </div>
        </ChatContainer>
    )
}

export default Chat;

const ChatContainer = styled(MainContainer)`
  //justify-content: left;
  flex-direction: column;
`;