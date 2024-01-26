import React, { useState } from 'react';
import { redirect, useNavigate } from 'react-router-dom';
import './Cadastro.css';

const Cadastro = () => {
  const navigateTo = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);

  

  const handleCadastro = async (e) => {
    e.preventDefault();
    const Username = document.querySelector('[placeholder="Digite seu nome de usuário"]').value;
    const FirstName = document.querySelector('[placeholder="Digite seu nome"]').value;
    const LastName = document.querySelector('[placeholder="Digite seu sobrenome"]').value;
    const Role = document.querySelector('[placeholder="Digite seu cargo"]').value;
    const Email = document.querySelector('[placeholder="Digite seu e-mail"]').value;
    const Password = document.querySelector('[placeholder="Crie uma senha"]').value;
    const fileInput = document.querySelector('[name="foto"]');
    const file = fileInput.files[0];

    console.log(file)

    const formData = new FormData();
    formData.append('username', Username);
    formData.append('first_name', FirstName);
    formData.append('last_name', LastName);
    formData.append('role', Role);
    formData.append('email', Email);
    formData.append('password', Password);
    formData.append('image', file);

    try {
      console.log("Enviando request")

      const response = await fetch('http://127.0.0.1:8000/api/v1/badge/register', {
        method: 'POST',
        body: formData,
        // mode : 'no-cors',
      });
      const string = await response.text();
      const json = string === "" ? {} : JSON.parse(string);

      // const data = await response.json()
      
      
      if (response.status == 201) {
        console.log('Cadastro realizado com sucesso');
        console.log()
        localStorage.clear()
        localStorage.setItem("token", "Bearer " + json.token)
        navigateTo('/cracha');
      } else {
        alert("Nome de usuário indisponivel")
      }
    } catch (error) {
      console.error('Erro ao enviar requisição:', error);
    }
  };

  if(localStorage.getItem('token')){
    navigateTo('/cracha')
  }

  const goToLoginPage = () => {
    navigateTo('/');
  };

  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   console.log(file)
  //   setSelectedFile(file);
  // };

  return (
    <div className='body-cadastro'>
      <div className="signup-cabecalho-cadastro">
        <div className="signup-cabecalho-container-cabecalho">
          <button onClick={goToLoginPage} className="button-login-cadastro">Login</button>
        </div>
      </div>

      <div className="signup-container-cadastro">
        <h1 className='signup-title-cadastro'>Cadastrar</h1>
        <form className='form-cadastro' onSubmit={handleCadastro}>
          <p className='legenda-form-cadastro'>Nome de usuário</p>
          <input className='signup-input-cadastro' type="text" placeholder="Digite seu nome de usuário" required />
          <p className='legenda-form-cadastro'>Primeiro nome</p>
          <input className='signup-input-cadastro' type="text" placeholder="Digite seu nome" required />
          <p className='legenda-form-cadastro'>Ultimo nome</p>
          <input className='signup-input-cadastro' type="text" placeholder="Digite seu sobrenome" required />
          <p className='legenda-form-cadastro'>Cargo</p>
          <input className='signup-input-cadastro' type="text" placeholder="Digite seu cargo" required />
          <p className='legenda-form-cadastro'>E-mail</p>
          <input className='signup-input-cadastro' type="email" placeholder="Digite seu e-mail" required />
          <p className='legenda-form-cadastro'>Senha</p>
          <input className='signup-input-cadastro' type="password" placeholder="Crie uma senha" required />
          
          <p className='legenda-form-cadastro'>Foto</p>
          {/* <input type="file" accept="*" name='foto' onChange={handleFileChange} required /> */}
          <input type="file" accept="*" name='foto' required />

          <button className='button-cadastro' type='submit'>
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Cadastro;
