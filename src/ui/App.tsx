import React from 'react';
import {Route} from "react-router-dom";
import styled from 'styled-components';
import Header from "./ui-header/Header";
import Main from "./ui-main/Main";
import SignUp from './ui-auth/SignUp';

const AppWrapper = styled.div`
    margin: 0 auto;
    `;

const App = () => {
    return (
        <AppWrapper>
            <Header />
            <Main />


            {/*<Route exact path='/' render={() => <App/>}/>*/}

            {/*<Route path='/profile/:userId?' render={() => <ProfileContainer/>}/>*/}
        </AppWrapper>
    )
}

export default App;
