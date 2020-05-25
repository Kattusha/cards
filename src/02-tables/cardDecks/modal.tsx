import React, {useRef} from "react";
import styled from "styled-components/macro";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.2);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ChildWrapper = styled.div<{height?: string, width?: string}>`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 15px dimgray;
  padding: 40px 40px;
  position: relative;
  height: ${props => props.height ? props.height : 'auto'};
  width: ${props => props.width ? props.width : 'auto'};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

type PropsType = {
    height?: string
    width?: string
    closeModal: () => void
}

const Modal: React.FC<PropsType> = ({children, closeModal, height, width}) => {

    const ref = useRef<HTMLDivElement>(null)
    const onClickHandler = (e: React.MouseEvent) => {
        if (e.target === ref.current) closeModal()
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