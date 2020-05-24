import React from 'react';
import {MainContainer, MainWrapper} from '../style/bodyStyle';
import SignIn from "../../../01-auth/registration/SignIn";
import {Redirect, Route} from "react-router-dom";
import Login from "../../../01-auth/login/Login";
import RecoveryPassword from "../../../01-auth/recoveryPassword/RecoveryPassword";
import NewPassword from "../../../01-auth/newPassword/NewPassword";
import Profile from "../../../01-auth/profile/Profile";
import DeckInfo from "../../../02-tables/cards/DeckInfo";
import CardDecksContainer from "../../../02-tables/cardDecks/cardDecksContainer";
import DecksAllContainer from "../../../03-decksAll-decksMe/DecksAllContainer";
import DecksEditorContainer from "../../../decksEditor/decksEditorContainer";

export const LOGIN_PATH = '/login';
export const SIGN_IN_PATH = '/signIn';
export const PROFILE_PATH = '/profile';
export const RECOVERY_PASSWORD_PATH = '/recoveryPassword';
export const NEW_PASSWORD_PATH = '/newPassword/:token?'
export const DECKS_PATH = '/decks';
export const DECK_CARDS_PATH_ME = '/profile/cards/:deckId?';
//export const DECK_CARDS_PATH_ME = '/cards/:deckId?';
export const DECK_CARDS_PATH_USER = '/deck/:deckName?/cards/:deckId?';
export const DECKS_CREATE = '/create'
// export const CARDS_PATH = '/cards';

const Body: React.FC = () => {
    return (
        <MainWrapper>

            {/*?????????*/}
            {/*<Route exact path={'/cards'} render={() => <Redirect to={DECKS_PATH}/>}/>*/}
            {/*<Route exact path={'/'} render={() => <Redirect to={DECKS_PATH}/>}/>*/}
            <Route exact path={'/cards'} render={() => <Redirect to={LOGIN_PATH}/>}/>
            <Route exact path={'/'} render={() => <Redirect to={LOGIN_PATH}/>}/>

            <Route path={SIGN_IN_PATH}>
                <MainContainer whiteBox>
                    <SignIn/>
                </MainContainer>
            </Route>
            <Route path={LOGIN_PATH}>
                <MainContainer whiteBox>
                    <Login/>
                </MainContainer>
            </Route>
            <Route path={RECOVERY_PASSWORD_PATH}>
                <MainContainer whiteBox>
                    <RecoveryPassword/>
                </MainContainer>
            </Route>
            <Route path={NEW_PASSWORD_PATH}>
                <MainContainer whiteBox>
                    <NewPassword/>
                </MainContainer>
            </Route>
            <Route path={DECKS_CREATE}>
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

            <Route path={PROFILE_PATH} component={Profile} />
            <Route exact path={DECKS_PATH} component={DecksAllContainer} />
            <Route path={DECK_CARDS_PATH_USER} component={DeckInfo} />
        </MainWrapper>
    )
}

export default Body;
