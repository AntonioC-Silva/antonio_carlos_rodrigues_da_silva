import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api'; 
import './cardLogin.css';

function CardLogin() {
    // guarda o q o usuario digita
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');
    
    const navegar = useNavigate();

    const realizarLogin = async (e) => {
        e.preventDefault(); 
        
        try {
            // manda pro back validar
            const resposta = await api.post('token/', {
                username: usuario, 
                password: senha
            });

            // guarda o token no navegador
            localStorage.setItem('tokenAcesso', resposta.data.access);
            localStorage.setItem('tokenAtualizacao', resposta.data.refresh);

            // login sucesso, vai pra home
            navegar('/');

        } catch (erro) {
            console.error("Erro ao logar", erro);
            alert("Usuario ou senha invalidos!");
        }
    };

    return (
        <article className="cardLogin">
            <h2 className="tituloLogin">LOGIN</h2>

            <form className="formularioLogin" onSubmit={realizarLogin}>
                
                <label className="grupoInput">
                    <strong className="etiquetaInput">Usuário:</strong>
                    <input 
                        type="text" 
                        className="campoTexto" 
                        placeholder='Digite seu usuário'
                        value={usuario}
                        onChange={(e) => setUsuario(e.target.value)}
                        required 
                    />
                </label>

                <label className="grupoInput">
                    <strong className="etiquetaInput">Senha:</strong>
                    <input 
                        type="password" 
                        className="campoTexto" 
                        placeholder='Digite sua senha'
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        required 
                    />
                </label>

                <button type="submit" className="botaoEntrar">
                    Entrar
                </button>

            </form>
        </article>
    );
}

export default CardLogin;