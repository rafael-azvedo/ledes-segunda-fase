import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cadastro.css';

const Cadastro = () => {
  const navigateTo = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);

  const handleCadastro = () => {
    console.log('Cadastro realizado', selectedFile);
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
