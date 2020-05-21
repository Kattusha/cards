import React from "react";
import styled from "styled-components/macro";
import {EditorHeaderReduxForm} from "./editorHeader";
import {CardsEditorReduxForm} from "./cardsEditor";

const EditorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const HeaderWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
`;



const DecksEditorContainer = () => {
    return (
        <EditorWrapper>
            <HeaderWrapper>
                <EditorHeaderReduxForm/>
            </HeaderWrapper>
            <CardsEditorReduxForm/>
        </EditorWrapper>
    )
};

export default DecksEditorContainer