import React from 'react';
import {MainContainer, MainWrapper} from '../style/bodyStyle';
import {Route} from "react-router-dom";
import Profile from "./Profile";
import DeckInfo from "../../../02-tables/cards/DeckInfo";
import DecksAllContainer from "../../../03-decksAll-decksMe/DecksAllContainer";
import DecksEditorContainer from "../../../decksEditor/decksEditorContainer";
import RecoveryPasswordContainer from "../../../01-auth/ui/RecoveryPasswordContainer";
import NewPasswordContainer from "../../../01-auth/ui/NewPasswordContainer";
import {DEV_VERSION} from "../../../config";
import Home from "./Home";

export const MAIN_PATH = '/'
// export const LOGIN_PATH = '/login';
// export const SIGN_IN_PATH = '/signIn';
export const PROFILE_PATH = '/profile';
// export const RECOVERY_PASSWORD_PATH = '/recoveryPassword';
export const NEW_PASSWORD_PATH = '/newPassword/:token?'
export const DECKS_PATH = '/decks';
export const DECK_CARDS_PATH_ME = '/profile/cards/:deckId?';
//export const DECK_CARDS_PATH_ME = '/cards/:deckId?';
export const DECK_CARDS_PATH_USER = '/deck/:deckName?/cards/:deckId?';
export const DECKS_CREATE = '/create';
export const DECKS_EDIT = '/edit/:deckId?'
// export const CARDS_PATH = '/cards';

const Body: React.FC = () => {

    DEV_VERSION && console.log(`RENDER Body`);
    return (
        <MainWrapper>
            {/*?????????*/}
            <Route exact path={'/cards'} component={Home} />
            <Route exact path={MAIN_PATH} component={Home}/>

            <Route path={NEW_PASSWORD_PATH}>
                <MainContainer whiteBox>
                    <NewPasswordContainer/>
                </MainContainer>
            </Route>
            <Route path={DECKS_CREATE}>
                <MainContainer whiteBox>
                    <DecksEditorContainer/>
                </MainContainer>
            </Route>
            <Route path={DECKS_EDIT}>
                <MainContainer whiteBox>
                    <DecksEditorContainer/>
                </MainContainer>
            </Route>
            {/*<Route path={CARD_DECKS_PATH}>*/}
            {/*    <MainContainer>*/}
            {/*        <CardDecksContainer/>*/}
            {/*    </MainContainer>*/}
            {/*</Route>*/}
            {/*<Route path={CARDS_PATH_WITH_USER}>*/}
            {/*    <MainContainer>*/}
            {/*        <CardsContainer/>*/}
            {/*    </MainContainer>*/}
            {/*</Route>*/}

            <Route path={PROFILE_PATH} component={Profile}/>
            <Route exact path={DECKS_PATH} component={DecksAllContainer}/>
            <Route path={DECK_CARDS_PATH_USER} component={DeckInfo}/>
        </MainWrapper>
    )
}

export default Body;
