import React, { useState } from 'react'; // Removi useEffect desnecessário
import { useLocation } from 'react-router-dom';
import NavBar from '../../components/navBar/navBar';
import BarraFiltros from '../../components/barraFiltros/barraFiltros';
import Sensores from '../../components/sensores/sensores';
import './paginasSensores.css';

function PaginaSensores() {
    const location = useLocation();

// Verifica se veio algo da Home
    const obterEstadoInicial = () => {
        if (location.state && location.state.tipoSelecionado) {
            return { tipo: location.state.tipoSelecionado };
        }
        return {}; // Se não veio começa vazio
    };


    const [filtros, setFiltros] = useState(obterEstadoInicial);
    const [filtroInicial] = useState(obterEstadoInicial); 

    return (
        <section className="pagina">
            <NavBar />
            
            <main className="conteudoPrincipal">
                <BarraFiltros 
                    aoFiltrar={setFiltros} 
                    contexto="sensores"
                    filtroInicial={filtroInicial}
                />
                
                <Sensores filtrosAtivos={filtros} />
            </main>
        </section>
    );
}

export default PaginaSensores;