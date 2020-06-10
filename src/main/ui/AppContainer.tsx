import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../bll/store";
import Preloader from "./components/preloader/Preloader";
import {initializationApp} from "../../01-auth/bll/init-reducer";
import App from "./App";
import {DEV_VERSION} from "../../config";

const AppContainer: React.FC = () => {

    const dispatch = useDispatch();
    const {isInitializedApp} = useSelector((store: AppStateType) => store.init);
    const {isLoading} = useSelector((store: AppStateType) => store.requestStatus);

    useEffect(() => {
        dispatch(initializationApp());
    }, [dispatch])

    if (isInitializedApp === null)
        return <Preloader isLoading={isLoading}/>

    DEV_VERSION && console.log(`RENDER AppContainer: isInitializedApp=${isInitializedApp}`);
    return <App/>
}

export default AppContainer
