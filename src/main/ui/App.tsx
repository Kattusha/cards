import React from 'react';
import Header from "./components/Header";
import Body from "./components/Body";
import {DEV_VERSION} from "../../config";

const App: React.FC = () => {

    DEV_VERSION && console.log(`RENDER App`);
    return (
        <>
            <Header/>
            <Body/>
        </>

    )
}

export default App
