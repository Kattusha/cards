import React from "react";
import styled from "styled-components/macro";
import {Field, FieldArray, GenericFieldArray, InjectedFormProps, reduxForm} from "redux-form";
import {Button, Span} from "../main/ui/style/commonStyle";
import {Input} from "../main/ui/components/forForms/FormsControls";
import CardsEditor from "./cardsEditor";

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

type PropsType = {};

const FieldArrayCustom = FieldArray as new () => GenericFieldArray<Field, any>;

const Editor: React.FC<InjectedFormProps> =
    ({error, handleSubmit}) => {
        return (
            <EditorWrapper onSubmit={handleSubmit}>
                <HeaderWrapper>
                    <DeckNameWrapper>
                        <Field name="name" component={StyledInput} type="text" placeholder={'Enter title'}/>
                        {error && <Span color={"red"}>{error}</Span>}
                    </DeckNameWrapper>
                    <SubmitButton type="submit">
                        Create
                    </SubmitButton>
                </HeaderWrapper>
                <FieldArrayCustom name="cards" component={CardsEditor}/>
            </EditorWrapper>
        );
    };

export const EditorReduxForm = reduxForm<{}, PropsType>({form: 'editor'})(Editor)