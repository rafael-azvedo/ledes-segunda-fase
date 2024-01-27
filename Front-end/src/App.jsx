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

  const goToAdmPage = () => {
    navigateTo('/administrador');
  };

  // const handleEmailChange = (e) => {
  //   setEmail(e.target.value);
  // };

  // const handlePasswordChange = (e) => {
  //   setPassword(e.target.value);
  // };

  // const handleLoginFormSubmit = (e) => {
  //   e.preventDefault();

  //   const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  //   if (!email.match(emailFormat)) {
  //     alert('Por favor, insira um e-mail válido.');
  //     return;
  //   }

    // navigateTo('/cracha'); 
    

    const handleLoginFormSubmit = async (e) => {
      e.preventDefault();
      const Username = document.querySelector('[name="username"]').value;
      const Password = document.querySelector('[name="password"]').value; 
  
  
      const formData = new FormData();
      formData.append('username', Username);
      formData.append('password', Password);
  
      try {
        console.log("Enviando request")
  
        const response = await fetch('http://127.0.0.1:8000/api/v1/badge/login', {
          method: 'POST',
          body: formData,
          // mode : 'no-cors',
        });
        const string = await response.text();
        const json = string === "" ? {} : JSON.parse(string);
  
        // const data = await response.json()
        
        
        if (response.status == 200) {
          console.log('Cadastro realizado com sucesso');
          console.log()
          localStorage.clear(json.token)
          localStorage.setItem("token", "Bearer " + json.token)
          navigateTo('/cracha');
        } else {
          alert("Credenciais inválidas")
        }
      } catch (error) {
        console.error('Erro ao enviar requisição:', error);
      }
    };

    
    if(localStorage.getItem('token')){
      navigateTo('/cracha')
    }

    

  return (
    <div className='body-login'>
      <div className="signup-cabecalho">
        <div className="signup-cabecalho-container">
          <button onClick={goToRegisterPage} className="button-cadastro">Cadastro</button>
          <button onClick={goToAdmPage} className="button-administrador">Sou administrador</button>
        </div>
      </div>

      <p className='signup-subtitle-login'>Bem-vindo ao crachá virtual</p>

      <div className="signup-container-login">
        
        <h1 className='signup-title-login'>Entrar</h1>
        
        <form className='form-login' onSubmit={handleLoginFormSubmit}>
          <p className='legenda-form-login'>E-mail</p>
          {/* <input className='signup-input-login' type="text" name='login' placeholder="Digite seu login" value={username} 
          onChange={handleEmailChange} required/> */}
          <input className='signup-input-login' type="text" name='username' placeholder="Digite seu login"
           required/>
          
          <p className='legenda-form-login'>Senha</p>
          {/* <input className='signup-input-login' type="password" name='password' placeholder="Digite sua senha" value={password}
          onChange={handlePasswordChange} required/> */}

          <input className='signup-input-login' type="password" name='password' placeholder="Digite sua senha"
          required/>

          <button className='button-login' type="submit">Login</button>
          
          {/* <NavLink to="/alterarSenha" className='legenda'>Esqueceu sua senha?</NavLink> */}
          <NavLink to="/cadastro" className='legenda'>Não possui cadastro?</NavLink>
        </form>
      </div>
    </div>
  );
  
}

export default App;
