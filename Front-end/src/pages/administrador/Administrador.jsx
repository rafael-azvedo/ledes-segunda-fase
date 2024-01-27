import React, { useState, useEffect } from 'react';
import './Administrador.css'; 

const TelaAdministrador = () => {
    const [solicitacoes, setSolicitacoes] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:8000//api/v1/badge/buscar solicitações pendentes')
            .then(response => response.json())
            .then(data => setSolicitacoes(data))
            .catch(error => console.error('Erro ao buscar solicitações:', error));
    }, []);

    const handleAprovar = (id) => {
        console.log('Solicitação aprovada:', id);
    };

    const handleRejeitar = (id) => {
        console.log('Solicitação rejeitada:', id);
    };

    return (
        <div className='body-administrador'>
            <div className='container-adm'>
                <h1>Administrador</h1>
                <h2>Solicitações de Alterações</h2>
                <ul>
                    {solicitacoes.map(solicitacao => (
                        <li key={solicitacao.id}>
                            {solicitacao.first_name} {solicitacao.last_name} - {solicitacao.role}
                            <button onClick={() => handleAprovar(solicitacao.id)}>Aprovar</button>
                            <button onClick={() => handleRejeitar(solicitacao.id)}>Rejeitar</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default TelaAdministrador;
