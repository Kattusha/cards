import React from 'react';
import {MainContainer, MainWrapper} from '../style/bodyStyle';
import SignIn from "../../../01-auth/registration/SignIn";
import {Redirect, Route} from "react-router-dom";
import Login from "../../../01-auth/login/Login";
import RecoveryPassword from "../../../01-auth/recoveryPassword/RecoveryPassword";
import NewPassword from "../../../01-auth/newPassword/NewPassword";
import Profile from "../../../01-auth/profile/Profile";

export const LOGIN_PATH = '/login';
export const SIGN_IN_PATH = '/signIn';
export const PROFILE_PATH = '/profile';
export const RECOVERY_PASSWORD_PATH = '/recoveryPassword';
export const NEW_PASSWORD_PATH = '/newPassword/:token?'
export const CARD_DECKS_PATH = '/cardDecks';
export const CARDS_PATH_WITH_USER = '/profile/cards/:deckId?';
// export const CARDS_PATH = '/cards';

const Body: React.FC = () => {
    return (
        <MainWrapper>

            {/*?????????*/}
            <Route exact path={'/cards'} render={() => <Redirect to={LOGIN_PATH}/>}/>

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

            {/*<MainContainer>*/}
            {/*    <Route path={SIGN_IN_PATH} component={SignIn}/>*/}
            {/*    <Route path={LOGIN_PATH} component={Login}/>*/}
            {/*    <Route path={PROFILE_PATH} component={Profile}/>*/}
            {/*    <Route path={RECOVERY_PASSWORD_PATH} component={RecoveryPassword}/>*/}
            {/*    <Route path={NEW_PASSWORD_PATH} component={NewPassword}/>*/}

            {/*    <Route path={CARD_DECKS_PATH} component={CardDecksContainer}/>*/}
            {/*    /!*<Route path={cards} component={CardsContainer}/>*!/*/}
            {/*    /!*<Route exact path='/' render={() => <App/>}/>*!/*/}
            {/*    /!*<Route path='/profile/:userId?' render={() => <ProfileContainer/>}/>*!/*/}
            {/*</MainContainer>*/}

        </MainWrapper>
    )
}

export default Body;
