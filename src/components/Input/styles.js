import styled from "styled-components";

export const InputCustomizado = styled.input`
    color: black;
    font-size:20px;
    background-color:transparent;
    border: 2px solid #CC7E39;
    border-radius: 8px;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0 , 0.2), 0 2px 6px 0 rgba(0, 0, 0, 0.19);
    padding: 16px 20px;
    width:100%; 

    input::placeholder {
        color: #FFF;
        font-size: 12px;
        opacity: 0.7;
    }
`