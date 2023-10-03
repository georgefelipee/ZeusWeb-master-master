import React from 'react'

import { InputCustomizado } from './styles'

export default function Input({
    name,
    placeholder,
    onChange,
    type
}) {

  return (

    <InputCustomizado
    name={name}
    placeholder={placeholder}
    onChange={onChange}
    type={type}
    
    />
  )
}
