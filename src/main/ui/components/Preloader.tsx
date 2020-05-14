import React from "react";
import styled, {css, keyframes} from "styled-components/macro";

const colors: Array<string> = ['#7ef9ff', '#89cff0', '#4682b4', '#0f52ba', '#000080'];

const wave = keyframes`
  50%,
  75% {
    transform: scale(2.5);
  }
  80%,
  100% {
    opacity: 0;
  }
`;

const Wrapper = styled.div`
  margin: 0 auto;
  width: 1082px;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PreloaderWrapper = styled.div`
  display: flex;
  width: min-content;
  align-items: center;
  animation-delay: 1s;
`;

const createCSS = () => {
    let styles = '';
    for (let i = 0; i < 5; i += 1) {
        styles += `
       &:nth-child(${i}) {
        background: ${colors[i]};
        &::before {
          animation-delay: ${i * 0.2}s;
        }
      }
     `
    }
    return css`${styles}`;
};

const Dot = styled.div`
   position: relative;
    width: 10px;
    height: 10px;
    margin: 7px;
    border-radius: 50%;
    &:before {
      position: absolute;
      content: "";
      width: 100%;
      height: 100%;
      background: inherit;
      border-radius: inherit;
      animation: ${wave} 2s ease-out infinite;
    };
    ${createCSS()}
`;

const Preloader = () => {
    return (
        <Wrapper>
            <PreloaderWrapper>
                {colors.map((i, id) => <Dot key={id}/>)}
            </PreloaderWrapper>
        </Wrapper>
    )
}

export default Preloader