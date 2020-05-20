import React from "react";
import styled from "styled-components/macro";
import SingleCardForm from "./singleCardForm";
import {InjectedFormProps, reduxForm} from "redux-form";
import {Button} from "../main/ui/style/commonStyle";
import {CardType} from "../02-tables/api";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-content: center;
`;

type PropsType = {
    card?: CardType
}

const CardEditor: React.FC<PropsType & InjectedFormProps<PropsType>> = ({handleSubmit, error, card}) => {
    return(
        <form onSubmit={handleSubmit}>
            <SingleCardForm card='editedCard' error={error}/>
            <Button color={"blue"}>Log in</Button>
        </form>
    )
};

export const SingleCardReduxForm = reduxForm<{}, PropsType>({form: 'card editor'})(CardEditor)