import React, { useEffect, useState } from 'react';
import { Container, Form, SubContainer } from './styles'
import InputCustomizado from '../../components/Input/index'
import Botao from '../../components/Botao'
import { validarEmail, validarSenha, validarNome, validarConfirmPassword } from '../../utils/validadores'
import UserServices from '../../services/UserServices/UserService'
import { NavLink, useNavigate } from 'react-router-dom'
import { Header } from '../LoginNew/styles';
import { FaDog } from 'react-icons/fa';
import Lottie from 'lottie-web'
import CatAnimation from '../../assets/animation_lndlhhfa.json'


function Registro() {

  const UserService = new UserServices()

  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const animationContainer = document.getElementById('lottie-container'); // ID do elemento onde você deseja exibir a animação

    const anim = Lottie.loadAnimation({
      container: animationContainer,
      animationData: CatAnimation, // Importe a animação JSON
      renderer: 'svg', // Escolha o renderizador (pode ser 'svg', 'canvas', 'html', etc.)
      loop: true, // Define se a animação deve ser reproduzida em loop
      autoplay: true, // Define se a animação deve ser reproduzida automaticamente
    });

    return () => {
      anim.destroy();
    };

  }, [])

  useEffect(() => {

    const token = localStorage.getItem('token')
    console.log('token',token);
    if (token != undefined) {
      const verifyToken = async () => {
        const tokenVerify = await UserService.verificarToken(token)
        console.log('tokenVerify',tokenVerify);
        if(tokenVerify.message== "Token válido"){
          navigate('/')
        }else{
          navigate('/login')
        }
      }
      verifyToken()

    }

  }, [])

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
    console.log(form);
  }


  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      setLoading(true)
      const { data } = await UserService.cadastrar({
        name: form.name,
        email: form.email,
        password: form.password,
        confirmpassowrd: form.confirmpassowrd
      })

      if (data) {
        const responseLogin = await UserService.login({
          email: form.email,
          password: form.password
        })
        if (responseLogin === true) {
          alert('Usuário cadastrado com sucesso')
          navigate('/')
        }
      }
      console.log('response do cadastro', data);
      // if(response === true){
      //   alert('Usuario cadastrado com sucesso')
      //   navigate('/')
      // }
      setLoading(false)

    } catch (error) {

      const msg = error.response.data.msg
      console.log(error.response.data.msg);
      alert(msg)
      setLoading(false)
    }

  }

  const validadorInput = () => {

    return validarNome(form.name)
      && validarEmail(form.email)
      && validarSenha(form.password)
      && validarConfirmPassword(form.password, form.confirmpassowrd)
  }
  console.log('Form esta validado', validadorInput());

  return (
    <Container>
       <Header>
        <h1 className="tituloheader" > Pet<label>Investiment</label> <FaDog></FaDog> </h1>
        <div id="lottie-container" style={{ width: '520px', height: '800x' }}>
          {/* O elemento onde a animação será renderizada */}
        </div>
      </Header>
      <Form>
        <h1> Faça seu cadastro </h1>
        <InputCustomizado
          name='name'
          placeholder='Digite o seu nome'
          onChange={handleChange}
          type='text'
          maxlength="24"
          minlength="3"
        />
        <InputCustomizado
          name='email'
          placeholder='Digite o seu e-mail'
          onChange={handleChange}
          type='email'
        />
        <InputCustomizado
          name='password'
          placeholder='Digite sua senha'
          onChange={handleChange}
          type='password'
        />
        <InputCustomizado
          name='confirmpassowrd'
          placeholder='Digite sua senha novamente'
          onChange={handleChange}
          type='password'
        />
        <Botao
          type='submit'
          text='Cadastrar'
          onClick={handleSubmit}
          disabled={loading === true | !validadorInput()}
        // disabled={!validandoInput()}
        />
        <SubContainer>
          <p>Já possui conta?</p>
          <NavLink to={'/'}> <a>Entrar</a> </NavLink>
        </SubContainer>


      </Form>
    </Container>
  )

}

export default Registro;
