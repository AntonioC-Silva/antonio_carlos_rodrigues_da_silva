import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import 'bootstrap-icons/font/bootstrap-icons.css';
import './navBar.css';

function NavBar() {
    const [menuAberto, setMenuAberto] = useState(false);
    const navigate = useNavigate(); 

    const alternarMenu = () => {
        setMenuAberto(!menuAberto);
    };
    
    const logout = () => {
        // Remove os tokens do localStorage
        localStorage.removeItem('tokenAcesso');
        localStorage.removeItem('tokenAtualizacao');

        // Fecha o menu
        setMenuAberto(false);
        
        // Redireciona para a tela de login
        navigate('/login');
    };

    return (
        <header className="navBar">
            
            <Link to="/" className="logo" aria-label="Ir para a página inicial">
                <img src="./logo.png" alt="Logo Sense" />
            </Link>
            
            <nav className="menuNav" aria-label="Menu Principal">
                <ul>
                    <li><Link to='/'>HOME</Link></li>
                    <li><Link to='/sensores'>SENSORES</Link></li>
                    <li><Link to='/ambientes'>AMBIENTES</Link></li>
                    <li><Link to='/historico'>HISTÓRICO</Link></li>
                    
                    {/* icone e modal */}
                    <li className="icone">
                        <button 
                            className={`botaoUsuario ${menuAberto ? 'ativo' : ''}`} 
                            onClick={alternarMenu}
                            aria-label={menuAberto ? "Fechar menu" : "Abrir menu de usuário"}
                            aria-expanded={menuAberto}
                            aria-haspopup="true"
                        >
                            <i className="bi bi-person-circle" aria-hidden="true"></i>
                        </button>

                        {/*menu do usuario */}
                        {menuAberto && (
                            <article className="menuSuspenso">
                                <ul className="listaAcoes">
                                    <li>
                                        {/* Chama função logout */}
                                        <button className="botaoSair" onClick={logout}>
                                            <i className="bi bi-box-arrow-right"></i> SAIR
                                        </button>
                                    </li>
                                </ul>
                            </article>
                        )}
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default NavBar;