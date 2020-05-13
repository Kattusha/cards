import React from 'react';
import {Button, H3} from "../../main/ui/style/commonStyle";
import {library} from "@fortawesome/fontawesome-svg-core";
import {fas} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconDiv} from "../../main/ui/style/headerStyle";
import {useDispatch, useSelector} from "react-redux";
import {logOut} from "../login/login-reducer";
import {AppStateType} from "../../main/bll/store";
import {Redirect} from "react-router-dom";
import {loginPath} from "../../main/ui/components/Body";

library.add(fas);

const Profile: React.FC = () => {

    const dispatch = useDispatch();
    const {isAuthorized}  = useSelector((store: AppStateType) => store.login);

    const onLogOut = () => {
        dispatch(logOut());
    }

    if (!isAuthorized) return <Redirect to={loginPath}/>

    return (
        <div>
            <H3>Profile</H3>
            <Button color={"blue"} onClick={onLogOut}>
                <IconDiv><FontAwesomeIcon icon={['fas', 'sign-out-alt']}/></IconDiv>
                Log out
            </Button>
        </div>
    )
}

export default Profile;
