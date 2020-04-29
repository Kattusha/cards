import React from 'react';
import styled from 'styled-components';
import Header from "./components/Header";
import Body from "./components/Body";

const AppWrapper = styled.div`
    margin: 0 auto;
    `;

const App = () => {
    return (
        <AppWrapper>
            <Header />
            <Body />
        </AppWrapper>
    )
}

export default App;
