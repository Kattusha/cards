import React from 'react';
import styled from "styled-components/macro";
import {library} from "@fortawesome/fontawesome-svg-core";
import {fas} from "@fortawesome/free-solid-svg-icons";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../bll/store";
import {MainContainer} from "../style/bodyStyle";
import {EditProfileReduxForm, EditProfileFormDataType} from "./EditProfileForm";
import { changeProfile } from '../../../01-auth/bll/login-reducer';
import {NavLink} from "react-router-dom";

library.add(fas);

const Settings: React.FC = () => {

    const dispatch = useDispatch();
    const {name} = useSelector((store: AppStateType) => store.login)
    const {isLoading} = useSelector((store: AppStateType) => store.requestStatus);

    const updateProfile = ({userName}: EditProfileFormDataType) => {
        // debugger
        dispatch(changeProfile(userName));
    }

    return (
        <SettingsContainer>
            <SettingsMenu>
                {/*<MenuItem>Edit profile</MenuItem>*/}
                <MenuItemActive>Edit profile</MenuItemActive>
                <MenuItem>Account settings</MenuItem>
                {/*<MenuItem>Notifications</MenuItem>*/}
                {/*<MenuItem>Send feedback</MenuItem>*/}
            </SettingsMenu>
            <SettingsBody>
                <EditProfileReduxForm onSubmit={updateProfile} isLoading={isLoading}/>
            </SettingsBody>
        </SettingsContainer>
    )
}

export default Settings;

const SettingsContainer = styled(MainContainer)`
  align-items: flex-start;
  justify-content: left;
`;
const SettingsMenu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  //width: 30%;
  font-family: 'DINNextLTPro-Bold';
  font-size: 18px;
  //text-align: left;
`;
const MenuItem = styled.div`
  border-left: 4px solid transparent;
  color: #c4c4c4;
  cursor: pointer;
  display: block;
  margin: 5px 0;
  padding: 10px 64px 10px 32px;
  text-decoration: none;
  text-transform: uppercase;
`;
const MenuItemActive = styled(MenuItem)`
  border-color: #32cdff;
  color: #32cdff;
  cursor: default;
`;
const SettingsBody = styled(MainContainer)`
  background-color: #fff;
  //border-radius: 15px;
  //margin-left: 54px;
  max-width: 776px;
  //vertical-align: top;
  //width: 776px;
  //padding: 20px 30px;
  padding: 48px;
  align-items: flex-start;
  justify-content: flex-start;
  width: 67%;
`;