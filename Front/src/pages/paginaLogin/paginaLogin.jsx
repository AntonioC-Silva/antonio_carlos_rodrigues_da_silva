import React from 'react';
import CardLogin from '../../components/cardLogin/cardLogin';
import './paginaLogin.css';

function PaginaLogin() {
    return (
        <main className="login">
            
            <img 
                src="./logo.png" 
                alt="Logo Sense" 
                className="logoCanto"
            />
            
            <section className="cardCentro">
                <CardLogin />
            </section>
        </main>
    );
}

export default PaginaLogin;