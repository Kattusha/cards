import React, {useEffect} from 'react';
import styled from 'styled-components';
import Header from "./components/Header";
import Body, {LOGIN_PATH} from "./components/Body";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../bll/store";
import Preloader from "./components/preloader/Preloader";
import {initializationApp} from "../bll/app-reducer";
import {Redirect} from "react-router-dom";

const AppWrapper = styled.div`
  margin: 0 auto;
`;

const App: React.FC = () => {

    const dispatch = useDispatch();
    const {isInitializedApp}  = useSelector((store: AppStateType) => store.app);
    const {isLoading}  = useSelector((store: AppStateType) => store.login);

    useEffect(()=>{
        console.log("initializationApp");
        dispatch(initializationApp());
    },[dispatch])

    if (isInitializedApp === null)
    //     return <Redirect to={LOGIN_PATH}/>;
        return <Preloader size={30} backColor="#fff" frontColor="#32cdff" isLoading={isLoading}/>

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
