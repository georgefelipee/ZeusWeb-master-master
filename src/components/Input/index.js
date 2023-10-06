import React from 'react'

import { InputCustomizado } from './styles'

export default function Input({
    name,
    placeholder,
    onChange,
    type,
    maxlength,
     minlength,
}) {

  return (
    
    <InputCustomizado
    name={name}
    placeholder={placeholder}
    onChange={onChange}
    type={type}
    maxLength={maxlength}
    minLength={minlength}
    
    />
  )
}
