import React, {useRef} from "react";
import styled from "styled-components/macro";
import {FlexRowCenter} from "../../style/commonStyle";

type PropsType = {
    height?: string
    width?: string

    children: any /*React.ReactElement | React.Component,*/
    closeModal: () => void
}

const Modal: React.FC<PropsType> = ({children, closeModal, height, width}) => {

    const ref = useRef<HTMLDivElement>(null)
    const onClickHandler = (e: React.MouseEvent) => {
        if (e.target === ref.current) {
            closeModal()
        }
    }

    return(
        <Wrapper onClick={onClickHandler} ref={ref}>
            <ChildWrapper height={height} width={width}>
                {children}
            </ChildWrapper>
        </Wrapper>
    )
}

export default Modal

const Wrapper = styled(FlexRowCenter)`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.2);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
`;

const ChildWrapper = styled(FlexRowCenter)<{height?: string, width?: string}>`
  height: ${props => props.height ? props.height : 'auto'};
  width: ${props => props.width ? props.width : 'auto'};
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 15px dimgray;
  padding: 40px 40px;
  position: relative;
  flex-direction: column;
`;