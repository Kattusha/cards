import React from "react";
import Modal from "../02-tables/cardDecks/modal";
import styled from "styled-components/macro";
import SingleCardForm from "./singleCardForm";
import {InjectedFormProps, reduxForm} from "redux-form";
import {Button} from "../main/ui/style/commonStyle";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-content: center;
`;

type PropsType = {

}

const CardEditor: React.FC<PropsType & InjectedFormProps<{}, PropsType>> = ({handleSubmit, error}) => {
    return(
        <form onSubmit={handleSubmit}>
            <SingleCardForm card='editedCard' error={error}/>
            <Button color={"blue"}>Log in</Button>
        </form>
    )
};

export const SingleCardReduxForm = reduxForm<{}, PropsType>({form: 'card editor'})(CardEditor)