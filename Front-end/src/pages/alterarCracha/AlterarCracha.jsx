import React, { useState, useEffect } from 'react';  
import "./AlterarCracha.css";

const AlterarCracha = () => {
    const [dadosUsuario, setDadosUsuario] = useState({});
    const [novosDados, setNovosDados] = useState({
        first_name: '',
        last_name: '',
        role: '',
    });

    useEffect(() => {
        fetch('http://127.0.0.1:8000//api/v1/badge/')
            .then(response => response.json())
            .then(data => {
                setDadosUsuario(data);
                setNovosDados(data); 
            })
            .catch(error => console.error('Erro ao buscar dados do usuário:', error));
    }, []);

    const handleChange = (e) => {
        setNovosDados({
            ...novosDados,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Dados atualizados:', novosDados);
    };

    return (
        <div className='body-editar-cracha'>
        <div className="edit-cracha-container">
            <h1>Edição de crachá</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Nome:
                    <input type="text" name="first_name" value={novosDados.first_name} onChange={handleChange} />
                </label>
                <label>
                    Sobrenome:
                    <input type="text" name="last_name" value={novosDados.last_name} onChange={handleChange} />
                </label>
                <label>
                    Cargo:
                    <input type="text" name="role" value={novosDados.role} onChange={handleChange} />
                </label>
                <button className='botaoEditar' type="submit">Salvar</button>
            </form>
        </div>
        </div>
    );
};

export default AlterarCracha;
