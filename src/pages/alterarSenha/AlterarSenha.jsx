import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AlterarSenha.css';

const AlterarSenha = () => {
  const navigateTo = useNavigate();
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const handleNovaSenhaChange = (e) => {
    setNovaSenha(e.target.value);
  };

  const handleConfirmarSenhaChange = (e) => {
    setConfirmarSenha(e.target.value);
  };

  const handleAlterarSenha = () => {
    if (novaSenha !== confirmarSenha) {
      alert('As senhas não coincidem. Por favor, verifique.');
      return;
    }
    console.log('Senha alterada com sucesso!');
    navigateTo('/');
  };

  return (
    <div className='body-alterar-senha'>
      <h1 className='titulo-alterar-senha'>Alterar Senha</h1>
      <form className='form-alterar-senha'>
        <label htmlFor="novaSenha">Nova Senha</label>
        <input
          type="password"
          id="novaSenha"
          value={novaSenha}
          onChange={handleNovaSenhaChange}
          required
        />

        <label htmlFor="confirmarSenha">Confirmar Senha</label>
        <input
          type="password"
          id="confirmarSenha"
          value={confirmarSenha}
          onChange={handleConfirmarSenhaChange}
          required
        />

        <button type="button" onClick={handleAlterarSenha}>
          Alterar Senha
        </button>
      </form>
    </div>
  );
};

export default AlterarSenha;
