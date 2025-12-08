import React, { useState } from 'react';
import NavBar from '../../components/navBar/navBar';
import BarraFiltros from '../../components/barraFiltros/barraFiltros';
import Ambientes from '../../components/ambientes/ambientes';
import './paginaAmbientes.css';
import Footer from '../../components/footer/footer';

function PaginaAmbientes() {
    // armazenar filtros aplicados
    const [filtros, setFiltros] = useState({});

    return (
        <section className="pagina">
            {/* menu de navegacao superior */}
            <NavBar />
            
            <main className="conteudoPrincipal">
                {/* barra de filtros que atualiza o estado */}
                <BarraFiltros 
                    aoFiltrar={setFiltros} 
                    contexto="ambientes" 
                />
                
                {/* exibe ambientes com base nos filtros */}
                <Ambientes filtrosAtivos={filtros} />

            </main>

            {/* footer*/}
            <Footer />
        </section>
    );
}

export default PaginaAmbientes;