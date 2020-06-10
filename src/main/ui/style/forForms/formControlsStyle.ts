import styled from 'styled-components/macro';

export const FormStyled = styled.form`
    display: flex;
    flex-direction: column;
    min-width: 300px;
    text-align: center;
    margin-bottom: 30px;
`;

export const InputCheckBoxDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'DINNextLTPro-Bold';
    font-size: 16px;
    color: #5c5c5c;
    margin-bottom: 10px;
`;
export const InputDiv = styled.div`
    width: 100%;
`
export const InputStyled = styled.input<{hasError: boolean}>`
    font-family: 'DINNextLTPro-Bold';
    font-size: 16px;
    border: none;
    //border-bottom: 2px solid #c4c4c4;
    border-bottom: ${props => props.hasError ? "1px solid red" : "1px solid #c4c4c4"};
    margin: 15px 0;
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
export const ErrorBlock = styled.div`
    font-family: 'DINNextLTPro-Bold';
    position: absolute;
    padding: 0px 5px;
    //line-height: 1.3em;
    margin: -6px 0 0 20px;
    color: #fff;
    background: #ff4c4c;
    &:after {
        content: " ";
        position: absolute;
        left: 5px;
        bottom: 100%;
        width: 0;
        height: 0;
        border-bottom: 10px solid #ff4c4c;
        border-right: 10px solid transparent;
    }
`;


// const PasswordInput = styled.input.attrs(props => ({
//         // Every <PasswordInput /> should be type="password"
//         type: "password"
//     }))``
//
//     // This specific one is hidden, so let's set aria-hidden
//     <PasswordInput aria-hidden="true" />

export const TextareaStyled = styled.textarea`
    font-family: 'DINNextLTPro-Bold';
    font-size: 17px;
    //min-height: 90px;
    background-color: #f7f7f7;
    border: 2px solid #e5e5e5;
    border-radius: 5px;
    margin: 15px 0;
    padding: 15px;
    width: 100%;
`;