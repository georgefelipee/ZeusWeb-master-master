import React, { useEffect, useState } from 'react'
import { Container, Form, Header, SubContainer } from './styles'
import InputCustomizado from '../../components/Input/index'
import Botao from '../../components/Botao'
import { validarEmail, validarSenha } from '../../utils/validadores'
import UserServices from '../../services/UserServices/UserService'
import { NavLink, useNavigate } from 'react-router-dom'
import { FaDog } from 'react-icons/fa'
import Lottie from 'lottie-web'
import CatAnimation from '../../assets/animation_lndlhhfa.json'
import { getUserLocalStorage } from '../../Context/Authprovider/utils'


export default function LoginNew() {

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
      const response = await UserService.login(form)
      console.log('response do login', response);
      if (response === true) {
        navigate('/')
      }
      setLoading(false)

    } catch (error) {
      const msg = error.response.data.msg
      console.log(error.response.data.msg);
      alert(msg)
      setLoading(false)


    }

  }

  const validadorInput = () => {
    return validarEmail(form.email) && validarSenha(form.password)
  }
  console.log('Form esta validado', validadorInput());

  return (
    <Container>
      <Header>
        <h1 className="tituloheader" > Pet<label>Investiment</label> <FaDog></FaDog> </h1>
        <div id="lottie-container" style={{ width: '400px', height: '370px' }}>
          {/* O elemento onde a animação será renderizada */}
        </div>
      </Header>

      <Form>
        <h1> Faça seu Login</h1>
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
        <Botao
          type='submit'
          text='Entrar'
          onClick={handleSubmit}
          disabled={loading === true | !validadorInput()}
        // disabled={!validandoInput()}
        />
        <SubContainer>
          <p>Não possui conta?</p>
          <NavLink to={'/register'}> <a>Cadastrar</a> </NavLink>
        </SubContainer>


      </Form>
    </Container>
  )
}
