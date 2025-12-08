import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import './paginaHome.css';
import NavBar from '../../components/navBar/navBar';
import GraficoBarras from '../../components/graficoBarras/graficoBarras'; 
import SobreMim from '../../components/sobreMim/sobreMim';
import CardTipo from '../../components/cardTipo/cardTipo';

const PaginaHome = () => {
  const navigate = useNavigate();
  

  const [dadosDoGrafico, setDadosDoGrafico] = useState({
    status_sensores: [], 
    historico_medicoes: []
  });

  const tiposSensores = [
      { id: '1', nome: 'Temperatura', icone: 'bi-thermometer-half' },
      { id: '2', nome: 'Umidade', icone: 'bi-droplet-fill' },
      { id: '3', nome: 'Luminosidade', icone: 'bi-sun-fill' },
      { id: '4', nome: 'Contador', icone: 'bi-speedometer2' },
  ];

  const navegarParaTipo = (idTipo) => {
      navigate('/sensores', { state: { tipoSelecionado: idTipo } });
  };

  useEffect(() => {
    const carregarDashboard = async () => {
      try {
        const resposta = await api.get('dashboard/');
        setDadosDoGrafico(resposta.data);
      } catch (erro) {
        console.error("Erro ao carregar dashboard:", erro);
      }
    };

    carregarDashboard();
  }, []);

  return (
    <section className="pagina">
      <NavBar />
      
      <main className="conteudoHome">
        
        <header className='cabecalhoPrincipal'>
            <h1 className="tituloPrincipal">
              BEM-VINDO AO SENSE
            </h1>
            <p className="subtituloPrincipal">
              Monitoramento inteligente e gestão eficiente em tempo real.
            </p>
        </header>

        <section aria-label="Navegação por Sensores">
            <h2 className="tituloTopico">Sensores</h2>
            <ul className="gridTipos">
                {tiposSensores.map(tipo => (
                    <CardTipo 
                        key={tipo.id}
                        tipo={tipo.nome}
                        icone={tipo.icone}
                        aoClicar={() => navegarParaTipo(tipo.id)}
                    />
                ))}
            </ul>
        </section>

        <section aria-label="Painéis Gráficos">
            <h2 className="tituloTopico">Gráficos e Estatísticas</h2>
            
            <ul className="homeGridGraficos">
                <li style={{ listStyle: 'none' }}>
                    <GraficoBarras 
                        titulo="Status dos Sensores" 
                        dados={dadosDoGrafico.status_sensores} 
                    />
                </li>
                <li style={{ listStyle: 'none' }}>
                    <GraficoBarras 
                        titulo="Medições Recentes (7 dias)" 
                        dados={dadosDoGrafico.historico_medicoes} 
                    />
                </li>
            </ul>
        </section>

        <section aria-label="Informações do Desenvolvedor">
            <h2 className="tituloTopico">Sobre Nós</h2>
            <SobreMim/>
        </section>
      
      </main>
    </section>
  );
};

export default PaginaHome;