import React, {useEffect} from 'react';
import styled from 'styled-components';
import Header from "./components/Header";
import Body from "./components/Body";
import {useDispatch, useSelector} from "react-redux";
import {getMe} from "../../01-auth/login/login-reducer";
import {AppStateType} from "../bll/store";

const AppWrapper = styled.div`
  margin: 0 auto;
`;

const App: React.FC = () => {

    const dispatch = useDispatch();
    const {isAuthorized} = useSelector((store: AppStateType) => store.login);

    useEffect(()=>{
        dispatch(getMe());
    },[dispatch])

    return (
        <>
            <AppWrapper>
                <Header/>
                <Body/>
            </AppWrapper>
        </>
    )
}

export default App;
