import React, { useState } from 'react';
import NavBar from '../../components/navBar/navBar';
import BarraFiltros from '../../components/barraFiltros/barraFiltros';
import Historico from '../../components/historico/historico';
import './paginaHistorico.css';

function PaginaHistorico() {
    const [filtros, setFiltros] = useState({});

    return (
        <section className="pagina">
            <NavBar />
            <main className="conteudoPrincipal">
                <BarraFiltros 
                    aoFiltrar={setFiltros} 
                    contexto="historico" 
                />
                <Historico filtrosAtivos={filtros} />
            </main>
        </section>
    );
}

export default PaginaHistorico;