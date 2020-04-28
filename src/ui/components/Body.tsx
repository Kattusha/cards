import React from 'react';
import {MainContainer, MainWrapper} from '../style/bodyStyle';
import SignUp from "./auth/SignUp";
import {Route} from "react-router-dom";

const Body = () => {
    return (
        <MainWrapper>
            <MainContainer>
                <Route path='/signup' component={SignUp}/>
                {/*<Route exact path='/' render={() => <App/>}/>*/}
                {/*<Route path='/profile/:userId?' render={() => <ProfileContainer/>}/>*/}
            </MainContainer>
        </MainWrapper>
    )
}

export default Body;
