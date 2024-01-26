import React from 'react';
import { Routes, Route } from "react-router-dom";
import App from '../App';
import Cadastro from "./cadastro/Cadastro";
import Cracha from "./cracha/Cracha";
import Administrador from "./administrador/Administrador";
import AlterarCracha from "./alterarCracha/AlterarCracha";
import AlterarSenha from "./alterarSenha/AlterarSenha";


const AppRoutes = () => {    
    return (
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/cadastro" element={<Cadastro/>}/>
            <Route path="/cracha" element={<Cracha/>}/>
            <Route path="/administrador" element={<Administrador/>}/>
            <Route path="/alterarCracha" element={<AlterarCracha/>}/>
            <Route path="/alterarSenha" element={<AlterarSenha/>}/>
        </Routes>
    );
};
export default AppRoutes;
