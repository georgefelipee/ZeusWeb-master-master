import React, { useState } from 'react';
import './Register.css'; // Importe um arquivo CSS para estilizar o componente

function Registro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleNomeChange = (e) => {
    setNome(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSenhaChange = (e) => {
    setSenha(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode adicionar a lógica para processar o registro do usuário
  };

  return (
   
   <div className="registro-container">
      <h2>Cadastro </h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nome:</label>
          <input
            type="text"
            placeholder="Digite seu nome"
            value={nome}
            required={true}
            onChange={handleNomeChange}
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            className='email'
            type="email"
            placeholder="Digite seu email"
            value={email}
            required={true}
            onChange={handleEmailChange}
          />
        </div>
        <div className="form-group">
          <label>Senha:</label>
          <input
            type="password"
            placeholder="Digite sua senha"
            value={senha}
            required={true}
            onChange={handleSenhaChange}
          />
        </div>
         <button type="submit">Cadastrar</button>
      </form>
     
    </div>
   
  );
}

export default Registro;
