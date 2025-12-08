import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import 'bootstrap-icons/font/bootstrap-icons.css';
import './navBar.css';

function NavBar() {
    // estado para controlar menu dropdown
    const [menuAberto, setMenuAberto] = useState(false);
    const navigate = useNavigate(); 

    // alterna visibilidade do menu
    const alternarMenu = () => {
        setMenuAberto(!menuAberto);
    };
    
    // funcao de logout
    const logout = () => {
        // remove tokens do localstorage
        localStorage.removeItem('tokenAcesso');
        localStorage.removeItem('tokenAtualizacao');

        setMenuAberto(false);
        
        // redireciona para login
        navigate('/login');
    };

    return (
        <header className="navBar">
            
            {/* logo mandando para home */}
            <Link to="/" className="logo" aria-label="Ir para a página inicial">
                <img src="./logo.png" alt="Logo Sense" />
            </Link>
            
            <nav className="menuNav" aria-label="Menu Principal">
                <ul>
                    {/* links*/}
                    <li><Link to='/'>HOME</Link></li>
                    <li><Link to='/sensores'>SENSORES</Link></li>
                    <li><Link to='/ambientes'>AMBIENTES</Link></li>
                    <li><Link to='/historico'>HISTÓRICO</Link></li>
                    
                    <li className="icone">
                        {/*perfil do usuario */}
                        <button 
                            className={`botaoUsuario ${menuAberto ? 'ativo' : ''}`} 
                            onClick={alternarMenu}
                            aria-label={menuAberto ? "Fechar menu" : "Abrir menu de usuário"}
                            aria-expanded={menuAberto}
                            aria-haspopup="true"
                        >
                            <i className="bi bi-person-circle" aria-hidden="true"></i>
                        </button>

                        {/* menu suspenso*/}
                        {menuAberto && (
                            <article className="menuSuspenso">
                                <ul className="listaAcoes">
                                    <li>
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