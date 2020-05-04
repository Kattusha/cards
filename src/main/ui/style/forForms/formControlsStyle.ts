import styled from 'styled-components/macro';

export const FormStyled = styled.form`
    display: flex;
    flex-direction: column;
    min-width: 300px;
`;

export const InputCheckBoxDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'DINNextLTPro-Bold';
    font-size: 16px;
    color: #5c5c5c
    //opacity: .7;
`;
export const InputStyled = styled.input<{hasError: boolean}>`
    font-family: 'DINNextLTPro-Bold';
    font-size: 16px;
    border: none;
    //border-bottom: 2px solid #c4c4c4;
    border-bottom: ${props => props.hasError ? "1px solid red" : "1px solid #c4c4c4"};
    margin: 10px 0;
    width: ${props => props.type === "checkbox" ? "auto" : "100%"}; //100%;
    margin-right: ${props => props.type === "checkbox" ? "10px" : "0"}; //100%;
    color: #5c5c5c;
    opacity: .7;
    &:hover,
    &:focus,
    &:active {
      opacity: 1;
      outline:none;
      border-bottom: 1px solid #32cdff;
      ::-webkit-input-placeholder {
      background-color: #fff;
    }
    }
    
    //::placeholder{
    //  background-color: #f7f7f7;
    //}
`;
export const Error = styled.input<{hasError: boolean}>`
    font-family: 'DINNextLTPro-Bold';
    font-size: 18px;
    border: none;
    //border-bottom: 2px solid #c4c4c4;
    border-bottom: ${props => props.hasError ? "2px solid red" : "2px solid #c4c4c4"};
    margin: 10px 0;
    width: 100%;
    color: #5c5c5c;
    opacity: .5;
`;


// const PasswordInput = styled.input.attrs(props => ({
//         // Every <PasswordInput /> should be type="password"
//         type: "password"
//     }))``
//
//     // This specific one is hidden, so let's set aria-hidden
//     <PasswordInput aria-hidden="true" />