import React from 'react';
import {MainContainer, MainWrapper} from '../style/bodyStyle';
import {Route} from "react-router-dom";
import Profile from "./Profile";
import DeckInfo from "../../../02-tables/cards/DeckInfo";
import DecksAllContainer from "../../../03-decksAll-decksMe/DecksAllContainer";
import DecksEditorContainer from "../../../05-decksEditor/decksEditorContainer";
import NewPasswordContainer from "../../../01-auth/ui/NewPasswordContainer";
import {DEV_VERSION} from "../../../config";
import Home from "./Home";
import Settings from "../../../06-change profile/Settings";
import Chat from "../../../07-chat/Chat";
import MapInfo from "../../../08-map/Map";
import ProfileUser from "../../../07-chat/ProfileUser";
import UsersContainer from "../../../07-chat/UsersContainer";

export const MAIN_PATH = '/'
// export const LOGIN_PATH = '/login';
// export const SIGN_IN_PATH = '/signIn';
export const PROFILE_PATH = '/profileMe';
export const PROFILE_USER_PATH = '/profile/:userName?/:userId?';

export const SETTINGS_PATH = '/settings';
// export const RECOVERY_PASSWORD_PATH = '/recoveryPassword';
export const NEW_PASSWORD_PATH = '/newPassword/:token?'
export const DECKS_PATH = '/decks';
export const DECK_CARDS_PATH_ME = '/profileMe/cards/:deckId?';
//export const DECK_CARDS_PATH_ME = '/cards/:deckId?';
export const DECK_CARDS_PATH_USER = '/deck/:deckName?/cards/:deckId?';
export const DECKS_CREATE = '/create';
export const DECKS_EDIT = '/edit/:deckId?'
// export const CARDS_PATH = '/cards';
export const CHAT_PATH = '/chat'
export const USERS_PATH = '/users'
export const MAP_PATH = '/map'

const Routes: React.FC = () => {

    DEV_VERSION && console.log(`RENDER Body`);
    return (
        <MainWrapper>
            {/*?????????*/}
            {/*<Route exact path={'/cards'} component={Home}/>*/}
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
            <Route path={PROFILE_USER_PATH} component={ProfileUser}/>
            <Route path={CHAT_PATH} component={Chat}/>
            <Route path={USERS_PATH} component={UsersContainer}/>
            <Route path={MAP_PATH} component={MapInfo}/>
            <Route path={SETTINGS_PATH} component={Settings}/>
            <Route exact path={DECKS_PATH} component={DecksAllContainer}/>
            <Route path={DECK_CARDS_PATH_USER} component={DeckInfo}/>
        </MainWrapper>
    )
}

export default Routes;
