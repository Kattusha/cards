import React, {ChangeEvent, useState} from 'react';
import styled from "styled-components/macro";
import {library} from "@fortawesome/fontawesome-svg-core";
import {fas} from "@fortawesome/free-solid-svg-icons";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../bll/store";
import {MainContainer} from "../style/bodyStyle";
import {EditProfileFormDataType, EditProfileReduxForm} from "./EditProfileForm";
import {changeProfile} from '../../../01-auth/bll/login-reducer';
import noUserPhoto from '../images/no-user-photo.jpg'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconDiv} from "../style/headerStyle";
import {DEV_VERSION} from "../../../config";

library.add(fas);

const Settings: React.FC = () => {

    const dispatch = useDispatch();
    const {name, avatar} = useSelector((store: AppStateType) => store.login)
    const {isLoading} = useSelector((store: AppStateType) => store.requestStatus);

    const [newAvatar, setNewAvatar] = useState<string | null>(null)

    // let base64String: string | ArrayBuffer | null = null
    const updateProfile = ({userName}: EditProfileFormDataType) => {
        dispatch(changeProfile(userName, newAvatar /*base64String*/));
    }

    const onChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];

        if (file !== null) {
            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = function () {

                // base64String = reader.result
                setNewAvatar(typeof (reader.result) === "string" ? reader.result : null)
                DEV_VERSION && console.log('LOADING file success')
            };
            reader.onerror = function (error) {
                DEV_VERSION && console.log(`LOADING file with error: ${error}`)
            };
        }

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
                <PhotoInfo>
                    <UserPhoto src={newAvatar || avatar || noUserPhoto} alt="user photo"/>
                    <FileInputLabel htmlFor="upload">
                        <IconFileDiv><FontAwesomeIcon icon={['fas', 'pencil-alt']}/></IconFileDiv>
                    </FileInputLabel>
                    <FileInput id="upload" type="file" onChange={onChangeFile}></FileInput>
                </PhotoInfo>
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
const UserPhoto = styled.img`
  border-radius: 100%;
  height: 100px;
  margin: auto;
  width: 100px;
`;
const PhotoInfo = styled.div`
position: relative;
width: 20%;
margin-left: 50px;
`;
const FileInput = styled.input`
  height: .1px;
  opacity: 0;
  overflow: hidden; 
  position: absolute; 
  width: .1px; 
  z-index: -1;
`
const FileInputLabel = styled.label`
  background-color: #fff;
  color: #32cdff;
  font-size: 20px;
  border-radius: 100%;
  box-shadow: 0 2px 20px 0 rgba(0,0,0,.2);
  cursor: pointer;
  height: 42px;
  position: absolute;
  right: 28px;
  top: 65px;
  width: 42px;
  z-index: 5;
  padding: 5px 5px;
`
const IconFileDiv = styled(IconDiv)`
  position: absolute;
  right: 5px;
  top: 15px;
`;