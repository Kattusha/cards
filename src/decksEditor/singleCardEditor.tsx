import React from "react";
import SingleCardForm from "./singleCardForm";
import {InjectedFormProps, reduxForm} from "redux-form";
import {Button} from "../main/ui/style/commonStyle";
import {CardType} from "../02-tables/api";

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