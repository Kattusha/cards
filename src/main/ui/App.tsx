import React from 'react';
import styled from 'styled-components';
import Header from "./components/Header";
import Body from "./components/Body";
import GlobalStyles from "./style/globalStyles";

const AppWrapper = styled.div`
  margin: 0 auto;
`;

const App = () => {
    return (
        <>
            <GlobalStyles/>
            <AppWrapper>
                <Header/>
                <Body/>
            </AppWrapper>
        </>
    )
}

export default App;
