import React from "react";
import styled from "styled-components/macro";
import {GetCardsType} from "../api";

const CardsWrapper = styled.div`
  width: 90%;
`;

const CardsHeader = styled.div`
  margin: 0 auto;
  display: flex;
  flex-flow: column;
  justify-content: center;
  width: max-content;
`;

const CardsHeaderImage = styled.div`
  width: 250px;
  height: 220px;
  background-image: url("https://i0.wp.com/www.impact-media.be/wp-content/uploads/2019/09/placeholder-1-e1533569576673-960x960.png?ssl=1");
  background-size: cover;
  background-position: center center;
`;

const CardsInfo = styled.div`
  font-size: 24px;
  text-align: center;
`;

const CardsGrid = styled.div`

`;

type PropsType = {
    cards: Array<GetCardsType>
}


const Cards = ({cards}: PropsType) => {
    return (
        <CardsWrapper>
            <CardsHeader>
                <CardsHeaderImage/>
                <CardsInfo>
                    {'tggtwert'}
                </CardsInfo>
            </CardsHeader>
        </CardsWrapper>
    )
}

export default Cards
