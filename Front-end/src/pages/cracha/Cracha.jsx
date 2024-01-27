import React, { useState, useEffect } from 'react';
import './Cracha.css';
import ufmsLogo from './ufmsLogo.png';
import { useNavigate } from 'react-router-dom';

const Cracha = () => {
    const navigateTo = useNavigate();
    const [dadosUsuario, setDadosUsuario] = useState({});
    console.log(localStorage.getItem("token"))
    const requestOptions = {
        method : 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization" : localStorage.getItem("token")
        },
    }

    console.log(dadosUsuario.image_path)

    const goToEditPage = () => {
        navigateTo('/alterarCracha');
    };

    useEffect(() => {
            fetch('http://127.0.0.1:8000//api/v1/badge/', requestOptions)
            .then(response => response.json())
            .then(data => setDadosUsuario(data))
            .catch(error => console.error('Erro ao buscar dados do usuário:', error));
    }, []);

    const logout = () => {
        fetch('http://127.0.0.1:8000//api/v1/badge/logout', {
            method : 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Authorization" : localStorage.getItem("token")
            },
    
        })
        localStorage.clear()
        navigateTo('/')
        
    }

    return (   
        <div className="body-cracha">
            <div className="signup-cabecalho-cadastro">
                <div className="signup-cabecalho-container-cabecalho">
                <button onClick={logout} className="button-login-cadastro">Logout</button>
                </div>
            </div>
            <div className="cracha-container">
                {/* caminho da foto???????? */} 
                {/* <img src={`http://localhost:8000/media/ ${dadosUsuario.id}.jpg`} alt="Foto do Usuário" className="foto-usuario" /> */}
                <img src={dadosUsuario.image_path} alt="Foto do Usuário" className="foto-usuario" />
                <div className="info-usuario">
                    <h2>{dadosUsuario.first_name} {dadosUsuario.last_name}</h2>
                    <p>{dadosUsuario.role}</p>
                </div>
                <img src={ufmsLogo} className="logo" />
            </div>
            <button onClick={goToEditPage} className="botaoAlterar">Editar crachá</button>
        </div>
    );
};

export default Cracha;
