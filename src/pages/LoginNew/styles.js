import { style } from "@mui/system";
import styled from "styled-components";

export const Container = styled.div`
display: flex;
justify-content: space-around;
align-items: center;
height: 100vh;
min-width: 100vw;
background-color: #FAFAFA
    
`
export const Form = styled.form`
    display: flex;
    padding: 3rem;
    flex-direction:column;
    align-items:center;
    justify-content: center;
    border-radius:10px;
    width:100%;
    background-color: #E39957;
    max-width: 450px;
    gap: 30px 0px;
    
    h1 {
        color: #FAFAFA;
        font-size:2rem;
        font-weight: 700;
       
    }

    p {
        color:  #FAFAFA;
        font-size: 16px;
        font-weight: bold;
    }
    a{
        color:  #FAFAFA;
        font-size: 16px;
       
    }
`
export const Header = styled.header`

    color: #DE8434;
    font-weight: bolder;
    font-size: 1.8rem;
    margin-left: 30px;
    padding-top: 16px;
    padding-bottom: 1.2rem;
    align-items: center;
    display: flex;
    flex-direction: column;
    h1{
        color: #DE8434
    }
    label{
        color: #809733;
    }
`

export const SubContainer = styled.div`

display: flex;
flex-direction: row;
align-items: center;
gap: 2rem; 

`
