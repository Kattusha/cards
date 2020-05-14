import React from 'react';
import {MainContainer, MainWrapper} from '../style/bodyStyle';
import SignIn from "../../../01-auth/registration/SignIn";
import {Route} from "react-router-dom";
import Login from "../../../01-auth/login/Login";
import RecoveryPassword from "../../../01-auth/recoveryPassword/RecoveryPassword";
import NewPassword from "../../../01-auth/newPassword/NewPassword";
import Profile from "../../../01-auth/profile/Profile";
import CardDecksContainer from "../../../02-tables/cardDecks/cardDecksContainer";

export const loginPath = '/login';
export const signInPath = '/signIn';
export const profilePath = '/profile';
export const recoveryPasswordPath = '/recoveryPassword';
export const newPasswordPath = '/newPassword/:token?'
export const cardDecks = '/cardDecks';
export const cards = '/cards';

const Body: React.FC = () => {
    return (
        <MainWrapper>
            <MainContainer>
                <Route path={signInPath} component={SignIn}/>
                <Route path={loginPath} component={Login}/>
                <Route path={recoveryPasswordPath} component={RecoveryPassword}/>
                <Route path={newPasswordPath} component={NewPassword}/>
                <Route path={profilePath} component={Profile}/>
                {/*<Route path={cards} component={CardsContainer}/>*/}
                {/*<Route exact path='/' render={() => <App/>}/>*/}
                {/*<Route path='/profile/:userId?' render={() => <ProfileContainer/>}/>*/}
            </MainContainer>
            <Route path={cardDecks} component={CardDecksContainer}/>
        </MainWrapper>
    )
}

export default Body;
