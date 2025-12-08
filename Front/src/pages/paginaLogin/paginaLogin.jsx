import React from 'react';
import CardLogin from '../../components/cardLogin/cardLogin';
import './paginaLogin.css';


function PaginaLogin() {
    return (
        <main className="login">
            
            {/* logo posicionada no canto */}
            <img 
                src="./logo.png" 
                alt="Logo Sense" 
                className="logoCanto"
            />
            
            {/* area central com o card de login */}
            <section className="cardCentro">
                <CardLogin />
            </section>
        </main>
    );
}

export default PaginaLogin;