import styled from 'styled-components/macro';
import {BlockWrapper, ContainerWrapper} from "./commonStyle";

export const MainWrapper = styled(BlockWrapper)`
    //height: 650px;
    //min-height: 500px;
`;
export const MainContainer = styled(ContainerWrapper)<{whiteBox?: boolean}>`
    background-color: ${p => p.whiteBox ? '#fff' : '#f7f7f7'}; 
    border: none;
    border-radius: 10px;
    box-shadow: ${p => p.whiteBox ? ' 0 0 25px 0 rgba(0,0,0,.04)' : 'none'};
    padding: 10px 30px;
`;
