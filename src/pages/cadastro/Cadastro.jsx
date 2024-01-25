import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cadastro.css';

const Cadastro = () => {
  const navigateTo = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);

  const handleCadastro = async () => {
    const FirstName = document.querySelector('[placeholder="Digite seu nome"]').value;
    const LastName = document.querySelector('[placeholder="Digite seu sobrenome"]').value;
    const Role = document.querySelector('[placeholder="Digite seu cargo"]').value;
    const Email = document.querySelector('[placeholder="Digite seu e-mail"]').value;
    const Password = document.querySelector('[placeholder="Crie uma senha"]').value;

    const formData = new FormData();
    formData.append('first_name', FirstName);
    formData.append('last_name', LastName);
    formData.append('role', Role);
    formData.append('email', Email);
    formData.append('password', Password);
    formData.append('foto', selectedFile);

    try {
      const response = await fetch('localhost:8000/api/v1/badge/', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('Cadastro realizado com sucesso');
      } else {
        console.error('Erro ao cadastrar. Status:', response.status);
      }
    } catch (error) {
      console.error('Erro ao enviar requisição:', error);
    }
  };

  const goToLoginPage = () => {
    navigateTo('/');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  return (
    <div className='body-cadastro'>
      <div className="signup-cabecalho-cadastro">
        <div className="signup-cabecalho-container-cabecalho">
          <button onClick={goToLoginPage} className="button-login-cadastro">Login</button>
        </div>
      </div>

      <div className="signup-container-cadastro">
        <h1 className='signup-title-cadastro'>Cadastrar</h1>
        <form className='form-cadastro'>
          <p className='legenda-form-cadastro'>Nome</p>
          <input className='signup-input-cadastro' type="text" placeholder="Digite seu nome" required />
          <p className='legenda-form-cadastro'>Sobrenome</p>
          <input className='signup-input-cadastro' type="text" placeholder="Digite seu sobrenome" required />
          <p className='legenda-form-cadastro'>Cargo</p>
          <input className='signup-input-cadastro' type="text" placeholder="Digite seu cargo" required />
          <p className='legenda-form-cadastro'>E-mail</p>
          <input className='signup-input-cadastro' type="email" placeholder="Digite seu e-mail" required />
          <p className='legenda-form-cadastro'>Senha</p>
          <input className='signup-input-cadastro' type="password" placeholder="Crie uma senha" required />
          
          <p className='legenda-form-cadastro'>Foto</p>
          <input type="file" accept="image/*" onChange={handleFileChange} required />

          <button className='button-cadastro' type="submit" onClick={handleCadastro}>
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Cadastro;
