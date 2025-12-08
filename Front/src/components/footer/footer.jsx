import React from 'react';
import './footer.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; 

function Footer() {
    return (
        <footer className="footer">
            
            {/*links */}
            <article className="links">
                <h3>Navegação</h3>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/sensores">Sensores</a></li>
                    <li><a href="/ambientes">Ambientes</a></li>
                    <li><a href="/historico">Histórico</a></li>
                </ul>
            </article>
            
            {/*social */}
            <article className="social">
                <h3>Contato</h3>
                <ul className="icones">
                    <li>
                        <a href="https://github.com/AntonioC-Silva" target="_blank" rel="noopener noreferrer"> 
                            <i className="bi bi-github"></i> GitHub 
                        </a>
                    </li>
                    <li>
                        <a href="https://www.linkedin.com/in/ant%C3%B4nio-rodrigues-6419922b7/" target="_blank" rel="noopener noreferrer"> 
                            <i className="bi bi-linkedin"></i> LinkedIn 
                        </a>
                    </li>
                </ul>
            </article>

            {/* logo */}
             <img 
                src="./logo.png" 
                alt="Logo Sense" 
                className="logoFooter" 
            />
            
            {/* copyright */}
            <p className="copyright">© 2024 Sense. Monitoramento Inteligente.</p>
        </footer>
    );
}

export default Footer;