import React, { useState } from 'react';
import NavBar from '../../components/navBar/navBar';
import BarraFiltros from '../../components/barraFiltros/barraFiltros';
import Historico from '../../components/historico/historico';
import Footer from '../../components/footer/footer';
import './paginaHistorico.css';

function PaginaHistorico() {
    //armazenar filtros selecionados
    const [filtros, setFiltros] = useState({});

    return (
        <section className="pagina">
            {/* menu de navegacao fixo */}
            <NavBar />
            
            <main className="conteudoPrincipal">
                {/* barra de filtros que atualiza o estado */}
                <BarraFiltros 
                    aoFiltrar={setFiltros} 
                    contexto="historico" 
                />
                
                {/*tabela de historico recebendo os filtros */}
                <Historico filtrosAtivos={filtros} />
            </main>

            {/* footer*/}
            <Footer />
        </section>
    );
}

export default PaginaHistorico;