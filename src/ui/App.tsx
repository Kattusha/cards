import React from 'react';
import {Route} from "react-router-dom";
import styled from 'styled-components';
import Header from "./ui-header/Header";
import Main from "./ui-main/Main";

const AppWrapper = styled.div`
    margin: 0 auto;
    `;

const App = () => {
    return (
        <AppWrapper>
            {/*<Header />*/}
            <Main />

            {/*<Route path='/login' component={Login}/>*/}
            <Route exact path='/' render={() => <App/>}/>

            {/*<Route path='/profile/:userId?' render={() => <ProfileContainer/>}/>*/}
        </AppWrapper>
    )
}

export default App;
