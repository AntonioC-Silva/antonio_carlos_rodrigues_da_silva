import React, { useState } from 'react'; 
import { useLocation } from 'react-router-dom';
import NavBar from '../../components/navBar/navBar';
import BarraFiltros from '../../components/barraFiltros/barraFiltros';
import Sensores from '../../components/sensores/sensores';
import Footer from '../../components/footer/footer';
import './paginasSensores.css';


function PaginaSensores() {
    // hook para acessar dados enviados pela navegacao
    const location = useLocation();

    // define filtro inicial se vier da home
    const obterEstadoInicial = () => {
        if (location.state && location.state.tipoSelecionado) {
            return { tipo: location.state.tipoSelecionado };
        }
        return {}; // comeca sem filtros
    };

    const [filtros, setFiltros] = useState(obterEstadoInicial);
    // guarda o estado inicial para passar para a barra de filtros
    const [filtroInicial] = useState(obterEstadoInicial); 

    return (
        <section className="pagina">
            <NavBar />
            
            <main className="conteudoPrincipal">
                {/* barra que controla os filtros ativos */}
                <BarraFiltros 
                    aoFiltrar={setFiltros} 
                    contexto="sensores"
                    filtroInicial={filtroInicial}
                />
                
                {/* lista sensores baseada nos filtros */}
                <Sensores filtrosAtivos={filtros} />
            </main>

            {/* footer*/}
            <Footer />
        </section>
    );
}

export default PaginaSensores;