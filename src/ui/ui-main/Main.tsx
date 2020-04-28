import React from 'react';
import {MainContainer, MainWrapper} from './mainStyle';
import SignUp from "../ui-auth/SignUp";
import {Route} from "react-router-dom";

const Main = () => {
    return (
        <MainWrapper>
            <MainContainer>
                <Route path='/signup' component={SignUp}/>
            </MainContainer>
        </MainWrapper>
    )
}

export default Main;
