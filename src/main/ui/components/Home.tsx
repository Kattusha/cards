import React from 'react';
import styled from "styled-components/macro";
import {FlexRowCenter, H3} from "../style/commonStyle";
import banner from '../images/main.png'
import { MainContainer } from '../style/bodyStyle';

const Home: React.FC = () => {

    return (
        <HomeWrapper>
            <HomeContainer>
                <HomeTextBlock>
                    <HomeH3 color={'#fff'} fontSize={'33px'}>Learn anything with fun flashcards by DreamTeam from
                        IT-Incubator</HomeH3>
                </HomeTextBlock>
                <HomeBannerBlock>
                    <Banner alt="main banner" src={banner}/>
                </HomeBannerBlock>
            </HomeContainer>

        </HomeWrapper>
    )
}

export default Home;

const HomeWrapper = styled(FlexRowCenter)`
    background: #32cdff;
    //display: none;
    //overflow: hidden;
    padding-bottom: 150px;
    width: 100%;
    margin-top: -31px;
    //height: ;
`;
const HomeContainer = styled(MainContainer)`
    background-color: #32cdff;
    padding-top: 50px;
`;
const HomeTextBlock = styled(FlexRowCenter)`
    width: 60%;
`;
const HomeH3 = styled(H3)`
    font-family: DINNextLTPro-Regular;
`;
const HomeBannerBlock = styled(FlexRowCenter)`
    width: 40%;
`;
const Banner = styled.img`
  height: 80%;
  width: 80%;
`

