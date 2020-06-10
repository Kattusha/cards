import React from 'react';
import Header from "./components/Header";
import Routes from "./components/Routes";
import {DEV_VERSION} from "../../config";

const App: React.FC = () => {

    DEV_VERSION && console.log(`RENDER App`);
    return (
        <>
            <Header/>
            <Routes/>
        </>

    )
}

export default App
