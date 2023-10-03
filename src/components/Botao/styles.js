import styled from "styled-components";

export const BotaoCustomizado = styled.button`
color: #FFF;
font-size: 20px;
border: 30px;
background-color: #809733;
border-radius: 8px;
width: 100%;
height: 50px;
box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
cursor: pointer;

    &:hover{
        background-color:#FFF;
        color: #809733;
        border-width: 2px;
        border-color:#809733;
        border-style: solid;
        transition: 0.8s;
    }


${props => props.disabled &&`
    opacity: 0.7;
    cursor: not-allowed;
`}


`