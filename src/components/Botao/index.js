import styled from "styled-components";
import { BotaoCustomizado } from "./styles";

import React from 'react'

export default function Botao({
    type,
    text,
    onClick,
    disabled
}) {
  return (
    <BotaoCustomizado
     type={type}
     text={text}
     disabled={disabled}
     onClick={onClick}>
        {text}
      
     </BotaoCustomizado>
  )
}
