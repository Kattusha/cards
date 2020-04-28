import styled from 'styled-components';

export const FormStyled = styled.form`
    display: flex;
    flex-direction: column;
    min-width: 300px;
`;

export const InputStyled = styled.input`
    font-family: 'DINNextLTPro-Bold';
    font-size: 18px;
    border: none;
    border-bottom: 2px solid #c4c4c4;
    margin: 10px 0;
    width: 100%;
    color: #5c5c5c
    opacity: .5;
`;


// const PasswordInput = styled.input.attrs(props => ({
//         // Every <PasswordInput /> should be type="password"
//         type: "password"
//     }))``
//
//     // This specific one is hidden, so let's set aria-hidden
//     <PasswordInput aria-hidden="true" />