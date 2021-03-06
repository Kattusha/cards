import React, {useRef, useState} from "react";
import styled from "styled-components/macro";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useDispatch} from "react-redux";
import {searchDeck} from "../bll/cardDecksReducer";
import {useHistory} from "react-router-dom";

const SearchWrapper = styled.div`
  width: 220px;
  height: 42px;
  margin-left: 55px;
  position: relative;
  cursor: default;
  margin-right: auto;
`;

const SearchingInput = styled.input`
  font-family: 'DINNextLTPro-Medium';
  font-size: 15px;
  position: absolute;
  width: 100%;
  height: 100%;
  padding-left: 50px;
  background-color: #6fdcff;
  color: black;
  border: none;
  border-radius: 10px;
  outline: none;
  &:focus {
    border: none;
    background-color: white;
    color: black;
  };
  &::placeholder {
    color: white;
    opacity: .8;
  }
`;

const SearchIcon = styled.div<{isFocused: boolean}>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  font-size: 20px;
  padding-left: 10px;
  color: ${props => props.isFocused ? '#32cdff' : 'white'};
  margin-top: 3px;
`;

const SearchDeck = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const ref = useRef<HTMLInputElement>(null);

    const [editMode, setEditMode] = useState(false);
    const switchEditMode = () => {
        setEditMode(!editMode)
    }

    const [searching, setSearching] = useState('');
    const submitSearching = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && /^\S+$/.test(searching)) {
            dispatch(searchDeck(searching));
            setSearching('');
            ref.current!.blur();
            history.push('/decks')
        }
    }

    return(
        <SearchWrapper>
            <SearchingInput placeholder={'SEARCH DECK'} value={searching} onBlur={switchEditMode} onFocus={switchEditMode}
                            onChange={e => setSearching(e.currentTarget.value)} onKeyPress={e => submitSearching(e)} ref={ref}/>
            <SearchIcon isFocused={editMode}>
                <FontAwesomeIcon icon='search'/>
            </SearchIcon>
        </SearchWrapper>
    )
}

export default SearchDeck