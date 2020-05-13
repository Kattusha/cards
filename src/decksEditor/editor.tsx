import React, {useEffect} from "react";
import styled from "styled-components/macro";
import {change, Field, FieldArray, GenericFieldArray, InjectedFormProps, reduxForm} from "redux-form";
import {Button, Span} from "../main/ui/style/commonStyle";
import {Input} from "../main/ui/components/forForms/FormsControls";
import CardsEditor from "./cardsEditor";
import {getCards} from "../02-tables/cards/cardsReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../main/bll/store";
import Preloader from "../main/ui/components/preloader/Preloader";

const EditorWrapper = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
`;

const HeaderWrapper = styled.div`
  margin: 10px auto;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const DeckNameWrapper = styled.div`
  margin: 0 auto;
`;

const StyledInput = styled(Input)`
  height: 34px;
  font-size: 22px;
  font-weight: bold;
  max-width: 372px;
  min-width: 200px;
`;

const SubmitButton = styled(Button)`
  float: right;
`;

type PropsType = {
    deckId?: string,
    name?: string,
};

const FieldArrayCustom = FieldArray as new () => GenericFieldArray<Field, any>;

const Editor: React.FC<PropsType & InjectedFormProps<PropsType>> =
    ({error, handleSubmit, deckId, name}) => {

        const dispatch = useDispatch();
        const {isLoading, cards} = useSelector((store: AppStateType) => store.cards);

        useEffect(() => {
            if (deckId) {
                dispatch(getCards(deckId));
                dispatch(change("editor", "name", name));
            }
        }, [deckId]);

        return (
            <>
                {isLoading ? <Preloader size={30} backColor="#fff" frontColor="#32cdff" isLoading={isLoading}/> :
                    <EditorWrapper onSubmit={handleSubmit}>
                        <HeaderWrapper>
                            <DeckNameWrapper>
                                <Field name="name" component={StyledInput} type="text"
                                       placeholder={name? name : 'Enter title'}/>
                                {error && <Span color={"red"}>{error}</Span>}
                            </DeckNameWrapper>
                            <SubmitButton type="submit">
                                {deckId? 'Submit changes' : 'Create'}
                            </SubmitButton>
                        </HeaderWrapper>
                        <FieldArrayCustom name={name? 'editedCards' : 'cards'} component={CardsEditor} cards={cards}/>
                    </EditorWrapper>
                }
            </>
        );
    };

export const EditorReduxForm = reduxForm<{}, PropsType>({form: 'editor'})(Editor)