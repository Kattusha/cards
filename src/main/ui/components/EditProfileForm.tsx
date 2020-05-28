import {Field, initialize, InjectedFormProps, reduxForm} from "redux-form";
import React from "react";
import {Input} from "./forForms/FormsControls";
import {Button, Span} from "../style/commonStyle";
import {FormStyled, InputDiv} from "../style/forForms/formControlsStyle";
import {compareField, requiredField} from "./forForms/validators";
import Preloader from "./preloader/Preloader";
import styled from "styled-components/macro";
import {connect} from "react-redux";
import {AppStateType} from "../../bll/store";

type PropsType = {
    isLoading: boolean
}
export type EditProfileFormDataType = {
    userName: string
}

const EditProfileForm: React.FC<PropsType & InjectedFormProps<EditProfileFormDataType, PropsType>> =
    ({error, handleSubmit, invalid, isLoading, ...props}) => {
        // debugger
        return (
            <EditProfileFormStyled onSubmit={handleSubmit}>
                <FieldName>Name</FieldName>
                <InputDiv>
                    <Field name="userName" component={Input} type="text" validate={[requiredField, compareField]}/>
                </InputDiv>

                {error && <Span color={"red"}>{error}</Span>}
                {isLoading && <Preloader isLoading={isLoading}/>}

                <Button color={"blue"} disabled={invalid || isLoading}>Save changes</Button>
            </EditProfileFormStyled>
        );
    };

// const EditProfileReduxForm = reduxForm<EditProfileFormDataType, PropsType>({form: 'editProfile', enableReinitialize: true})(EditProfileForm)

const mapStateToProps = (state: AppStateType) => {
    return {
        initialValues: {
            userName: state.login.name /* 'userName'*/
        }
    }
}
// export default connect<any>(mapStateToProps)(EditProfileReduxForm)
export const EditProfileReduxForm = connect<{}, {}, PropsType, AppStateType>(mapStateToProps)(reduxForm<EditProfileFormDataType, PropsType>({
    form: 'editProfile',
    enableReinitialize: true
})(EditProfileForm))


const EditProfileFormStyled = styled(FormStyled)`
width: 80%;
align-items: flex-start;
`;
const FieldName = styled.div`
    //margin: 10px auto;
    font-family: 'DINNextLTPro-Bold';
    color: #c4c4c4;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 18px;
    text-align: left;
`;