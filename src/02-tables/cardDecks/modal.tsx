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

const ChildWrapper = styled.div`
  background-color: white;
  border-radius: 10px;
  border: none;
  box-shadow: 0 0 10px 4px rgba(0,0,0,.18);
`;

type PropsType = {
    children: any, /* React.ReactElement,*/
    closeModal: () => void
}

const Modal = ({children, closeModal}: PropsType) => {

    const ref = useRef<HTMLDivElement>(null)
    const onClickHandler = (e: React.MouseEvent) => {
        if (e.target === ref.current) closeModal()
    }

    return(
        <Wrapper onClick={onClickHandler} ref={ref}>
            <ChildWrapper>
                {children}
            </ChildWrapper>
        </Wrapper>
    )
}

export default Modal