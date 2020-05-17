import React, {useState} from "react";
import styled from "styled-components/macro";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useDispatch} from "react-redux";
import {searchDeck} from "./cardDecksReducer";

const SearchWrapper = styled.div`
  width: 320px;
  height: 42px;
  margin-left: 15px;
  position: relative;
  cursor: default;
`;

const SearchingInput = styled.input`
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
`;

const SearchDeck = () => {

    const dispatch = useDispatch();

    const [editMode, setEditMode] = useState(false);
    const switchEditMode = () => {
        setEditMode(!editMode)
    }

    const [searching, setSearching] = useState('');
    const submitSearching = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && searching !== '') dispatch(searchDeck(searching))
    }

    return(
        <SearchWrapper>
            <SearchingInput placeholder={'SEARCH'} value={searching} onBlur={switchEditMode} onFocus={switchEditMode}
                            onChange={e => setSearching(e.currentTarget.value)} autoFocus={true} onKeyPress={e => submitSearching(e)}/>
            <SearchIcon isFocused={editMode}>
                <FontAwesomeIcon icon='search'/>
            </SearchIcon>
        </SearchWrapper>
    )
}

export default SearchDeck