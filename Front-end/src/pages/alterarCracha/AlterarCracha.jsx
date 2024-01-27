import React, { useState, useEffect } from 'react';  
import { redirect, useNavigate } from 'react-router-dom';
import "./AlterarCracha.css";

const AlterarCracha = () => {
    const [dadosUsuario, setDadosUsuario] = useState({});
    const navigateTo = useNavigate();
    let [novosDados, setNovosDados] = useState({
        first_name: '',
        last_name: '',
        role: '',
    });

    const requestOptions = {
        method : 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization" : localStorage.getItem("token")
        },
    }


    useEffect(() => {
            fetch('http://127.0.0.1:8000//api/v1/badge/', requestOptions)
            .then(response => response.json())
            .then(data => setDadosUsuario(data))
            .catch(error => console.error('Erro ao buscar dados do usuário:', error));
    }, []);

    const handleChange = (e) => {
        setNovosDados({
            ...novosDados,
            [e.target.name]: e.target.value,
        });
    };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     console.log('Dados atualizados:', novosDados);
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
    
        let body = {
        }
        if (novosDados.first_name != dadosUsuario.first_name){
            console.log('primeiro nome diferente' +  novosDados.first_name)
            body.first_name = novosDados.first_name;
        }
        if (novosDados.last_name != dadosUsuario.last_name){
            console.log('segundo nome diferente' + novosDados.last_name)
            body.last_name = novosDados.last_name;
        }
        console.log(novosDados.role)
        console.log(dadosUsuario.role)
        if (novosDados.role != dadosUsuario.role){
            console.log('cargo diferente' + dadosUsuario.role)
            body.role = novosDados.role;
        }
    
        try {
          console.log(body)
          console.log("Enviando request")
    
          const response = await fetch('http://127.0.0.1:8000/api/v1/badge/update', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
                "Authorization" : localStorage.getItem("token")
            }
          });
          const string = await response.text();
          const json = string === "" ? {} : JSON.parse(string);
    
          // const data = await response.json()
          
          
          if (response.status == 201) {
            console.log('Cadastro realizado com sucesso');
            console.log(json);
            navigateTo('/cracha');
          } else {
            alert("Nome de usuário indisponivel")
          }
        } catch (error) {
          console.error('Erro ao enviar requisição:', error);
        }
      };

    return (
        <div className='body-editar-cracha'>
        <div className="edit-cracha-container">
            <h1>Edição de crachá</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Nome:
                    <input type="text" name="first_name" defaultValue={dadosUsuario.first_name} onChange={handleChange} />
                </label>
                <label>
                    Sobrenome:
                    <input type="text" name="last_name" defaultValue={dadosUsuario.last_name} onChange={handleChange} />
                </label>
                <label>
                    Cargo:
                    <input type="text" name="role" defaultValue={dadosUsuario.role} onChange={handleChange} />
                </label>
                <button className='botaoEditar' type="submit">Salvar</button>
            </form>
        </div>
        </div>
    );
};

export default AlterarCracha;
