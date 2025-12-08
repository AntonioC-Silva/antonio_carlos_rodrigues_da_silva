import React, { useState } from 'react';
import NavBar from '../../components/navBar/navBar';
import BarraFiltros from '../../components/barraFiltros/barraFiltros';
import Ambientes from '../../components/ambientes/ambientes';
import './paginaAmbientes.css';

function PaginaAmbientes() {
    const [filtros, setFiltros] = useState({});

    return (
        <section className="pagina">
            <NavBar />
            <main className="conteudoPrincipal">
                <BarraFiltros 
                    aoFiltrar={setFiltros} 
                    contexto="ambientes" 
                />
                <Ambientes filtrosAtivos={filtros} />
            </main>
        </section>
    );
}

export default PaginaAmbientes;