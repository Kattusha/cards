import React, {useState} from "react";
import {H3} from "../main/ui/style/commonStyle";
import {CardType} from "../02-tables/api";
import styled from "styled-components/macro";

type PropsType = {
    text: string
    isShowAnswer: boolean
    // cards: Array<CardType>
    changeShow: (isShowAnswer: boolean) => void,
    // editCard: (id: string) => void,
    // addCard: () => void
}

const OneCard: React.FC<PropsType> = ({text, isShowAnswer, changeShow}) => {

    const onChangeShow = () =>{
        changeShow(!isShowAnswer)
    }

    return (
        <OneCardWrapper onClick={onChangeShow}>
            <p>{text}</p>
        </OneCardWrapper>
    )
}

export default OneCard

const OneCardWrapper = styled.div`
  font-size: 27px;
  height: 323px;
  margin-bottom: 30px;
  width: 280px;
  background-color: #fff;
  border-radius: 12.5%/10.8375%;
  box-shadow: 0 3px 10px 0 rgba(0,0,0,.18);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`