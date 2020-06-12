import React, {useEffect} from 'react';
import styled from "styled-components/macro";
import {library} from "@fortawesome/fontawesome-svg-core";
import {fas} from "@fortawesome/free-solid-svg-icons";
import {MainContainer} from "../main/ui/style/bodyStyle";
import {Button, FlexRowCenter, FlexRowEnd, HR} from "../main/ui/style/commonStyle";
import {Line} from '../main/ui/components/Profile';
import {useDispatch, useSelector} from "react-redux";
import {getMessages, sendMessage} from "./chat-reducer";
import {AppStateType} from "../main/bll/store";
import {MessageType} from "./entities-chatAPI";
import Message from './Message';
import {LoginFormDataType, LoginReduxForm} from "../01-auth/ui/ReduxForm/LoginForm";
import {CreateMessageFormDataType, CreateMessageReduxForm} from "./CreateMessageForm";
import {logIn} from "../01-auth/bll/login-reducer";
import Preloader from "../main/ui/components/preloader/Preloader";


library.add(fas);

const Chat: React.FC = () => {

    const dispatch = useDispatch()
    const {isLoading} = useSelector((store: AppStateType) => store.requestStatus);
    const {messages} = useSelector((store: AppStateType) => store.chatroom)

    const newArrayMessages = messages ? [...messages.slice(0, 6)] : null

    useEffect(() => {
        dispatch(getMessages())
    }, [dispatch])

    const sendNewMessage = ({message}: CreateMessageFormDataType) => {
        dispatch(sendMessage(message));
        // dispatch(reset('createMessage'));
    }

    if (isLoading)
        return <Preloader isLoading={isLoading}/>

    return (
        <ChatContainer>
            <FlexRowEnd>
                <Button disabled={true}>Create discuss</Button>
            </FlexRowEnd>
            <Line/>
            <MessagesWrapper>
                {/*{messages && messages.map((m) => <Message key={m._id} message={m}/>).reverse()}*/}
                {newArrayMessages && newArrayMessages.map((m) => <Message key={m._id} message={m}/>).reverse()}
            </MessagesWrapper>
            <CreateMessageReduxForm onSubmit={sendNewMessage} isLoading={isLoading}/>
        </ChatContainer>
    )
}

export default Chat;

const ChatContainer = styled(MainContainer)`
  //justify-content: left;
  align-items: flex-start;
  flex-direction: column;
`;
const MessagesWrapper = styled(FlexRowCenter)`
flex-direction: column;
width: 50%;
`
