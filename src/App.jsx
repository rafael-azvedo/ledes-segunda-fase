import './App.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

function App() {
  const navigateTo = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const goToRegisterPage = () => {
    navigateTo('/cadastro');
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLoginFormSubmit = (e) => {
    e.preventDefault();

    const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.match(emailFormat)) {
      alert('Por favor, insira um e-mail válido.');
      return;
    }

    navigateTo('/cracha'); 
  };

  return (
    <div className='body-login'>
      <div className="signup-cabecalho">
        <div className="signup-cabecalho-container">
          <button onClick={goToRegisterPage} className="button-cadastro">Cadastro</button>
        </div>
      </div>

      <p className='signup-subtitle-login'>Bem-vindo ao crachá virtual</p>

      <div className="signup-container-login">
        
        <h1 className='signup-title-login'>Entrar</h1>
        
        <form className='form-login' onSubmit={handleLoginFormSubmit}>
          <p className='legenda-form-login'>E-mail</p>
          <input className='signup-input-login' type="email" placeholder="Digite seu e-mail" value={email} 
          onChange={handleEmailChange} required/>
          
          <p className='legenda-form-login'>Senha</p>
          <input className='signup-input-login' type="password" placeholder="Digite sua senha" value={password}
          onChange={handlePasswordChange} required/>

          <button className='button-login' type="submit">Login</button>
          
          <NavLink to="/alterarSenha" className='legenda'>Esqueceu sua senha?</NavLink>
          <NavLink to="/cadastro" className='legenda'>Não possui cadastro?</NavLink>
        </form>
      </div>
    </div>
  );
}

export default App;
