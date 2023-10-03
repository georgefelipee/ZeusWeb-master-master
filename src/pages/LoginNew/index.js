import React, { useState } from 'react'
import { Container,Form } from './styles'
import InputCustomizado from '../../components/Input/index'
import Botao from '../../components/Botao'
import { validarEmail, validarSenha } from '../../utils/validadores'
import UserServices from '../../services/UserServices/UserService'

export default function LoginNew() {

  const UserService = new UserServices()

  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState([])


  const handleChange = (event) =>{
    setForm({...form, [event.target.name]: event.target.value} )
    console.log(form);
  }

 

 const  handleSubmit = async (event) => {
  event.preventDefault()
    try {
      setLoading(true)
      const response = await UserService.login(form)
      console.log('response do login', response);
      if(response === true){
        alert('Usuario logado com sucesso')
      }
      setLoading(false)
      
    } catch (error) {
      
    }

  } 
  
  const validadorInput = () =>{
    return validarEmail(form.email) && validarSenha(form.password)
  }
  console.log('Form esta validado', validadorInput());

  return (
  <Container>
    <Form>
       <h1> Faça seu Login</h1>
       <InputCustomizado
         name='email'
         placeholder= 'Digite o seu e-mail'
         onChange={handleChange}
         type='email'
       />
       <InputCustomizado
        name='password'
        placeholder= 'Digite sua senha'
        onChange={handleChange}
        type='password'
       />
       <Botao
        type='submit'
        text='Entrar'
        onClick={handleSubmit}
        disabled={loading === true | !validadorInput()}
       // disabled={!validandoInput()}
       />
       <div>
          <p>Não possui conta?</p>
          <a>Cadastrar</a>
       </div>
    </Form>
  </Container>
  )
}
