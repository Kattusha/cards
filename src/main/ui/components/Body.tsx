import React from 'react';
import {MainContainer, MainWrapper} from '../style/bodyStyle';
import SignIn from "../../../01-auth/registration/SignIn";
import {Route} from "react-router-dom";
import Login from "../../../01-auth/login/Login";
import RecoveryPassword from "../../../01-auth/recoveryPassword/RecoveryPassword";
import NewPassword from "../../../01-auth/newPassword/NewPassword";
import Profile from "../../../01-auth/profile/Profile";

const Body = () => {
    return (
        <MainWrapper>
            <MainContainer>
                <Route path='/signin' component={SignIn}/>
                <Route path='/login' component={Login}/>
                <Route path='/recoveryPassword' component={RecoveryPassword}/>
                <Route path='/newPassword' component={NewPassword}/>
                <Route path='/profile' component={Profile}/>
                {/*<Route exact path='/' render={() => <App/>}/>*/}
                {/*<Route path='/profile/:userId?' render={() => <ProfileContainer/>}/>*/}
            </MainContainer>
        </MainWrapper>
    )
}

export default Body;
