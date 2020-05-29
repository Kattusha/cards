import React from "react";
import styled from "styled-components/macro";
import SingleCardForm from "./singleCardForm";
import {InjectedFormProps, reduxForm} from "redux-form";
import {Button} from "../main/ui/style/commonStyle";
import {CardType} from "../02-tables/api/entities-cardsAPI";
import Preloader from "../main/ui/components/preloader/Preloader";

const StyledButton = styled(Button)`
  display: block;
  margin: 15px auto;
`;

type PropsType = {
    isLoading: boolean,
    editedCard?: CardType
}

const CardEditor: React.FC<PropsType & InjectedFormProps<{}, PropsType>> = ({handleSubmit, error, editedCard, isLoading}) => {
    return (
        <>
            {isLoading ?
                <Preloader size={30} backColor="#fff" frontColor="#32cdff" isLoading={isLoading}/> :
                <form onSubmit={handleSubmit}>
                    <SingleCardForm error={error} cardForEdit={editedCard} singleCardMode={true}/>
                    <StyledButton color={"blue"} type="submit">Submit Changes</StyledButton>
                </form>}
        </>
    )
};

export const SingleCardEditor = reduxForm<{}, PropsType>({form: 'card editor'})(CardEditor)