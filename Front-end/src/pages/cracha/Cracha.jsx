import React, { useState, useEffect } from 'react';
import './Cracha.css';
import ufmsLogo from './ufmsLogo.png';


const Cracha = () => {
    const [dadosUsuario, setDadosUsuario] = useState({});

    useEffect(() => {
            fetch('localhost:8000/api/v1/badge/')
            .then(response => response.json())
            .then(data => setDadosUsuario(data))
            .catch(error => console.error('Erro ao buscar dados do usuário:', error));
    }, []);

    return (
        <div className="body-cracha">
            <div className="cracha-container">
                {/* caminho da foto???????? */} 
                <img src={`http://localhost:8000/media/ ${dadosUsuario.id}.jpg`} alt="Foto do Usuário" className="foto-usuario" />
                <div className="info-usuario">
                    <h2>{dadosUsuario.first_name} {dadosUsuario.last_name}</h2>
                    <p>{dadosUsuario.role}</p>
                </div>
                <img src={ufmsLogo} className="logo" />
            </div>
        </div>
    );
};

export default Cracha;
