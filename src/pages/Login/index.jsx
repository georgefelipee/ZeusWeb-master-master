import React, { useState } from 'react'
import './login.css'
import { Link } from 'react-router-dom';
export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode adicionar a lógica de autenticação, se necessário
  };

  return (
    <div className="App">
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <div className='campos-Container'>
               <label>Email:</label>
              <input
              className='email-input'
                type="email"
                placeholder="Digite seu email"
                value={email}
                required={true}
                onChange={handleEmailChange}
              />
            </div>
           
          </div>
          <div className="form-group">
            <div  className='campos-Container' >
                <label>Senha:</label>
            <input
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={handlePasswordChange}
              required={true}
            />
            </div>
          
          </div>
          <button type="submit">Entrar</button>
          <div className='forgot-password'>
              <Link to={'/register'}><p>Cadastra-se</p>  </Link> 
              <p className='esqueceu'>Esqueceu a senha ? </p>
          </div>
        </form>
      </div>
    </div>
  );
}


