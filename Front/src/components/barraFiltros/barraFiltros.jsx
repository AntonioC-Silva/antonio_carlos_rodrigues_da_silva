import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import './barraFiltros.css';

function BarraFiltros({ aoFiltrar, contexto, filtroInicial }) {
    
    // aqui guarda os valores de tudo q o usuario digita ou seleciona
    const [campos, setCampos] = useState({
        mac_address: '',
        tipo: '',
        status: '',
        local_nome: '',     
        responsavel: '',    
        ambiente: '',       
        data_inicio: '',    
        data_fim: ''        
    });

    // lista pra guardar os ambientes que vao vir do back pra por no select
    const [listaAmbientes, setListaAmbientes] = useState([]);


    // se vier um filtro da home 
    // atualiza o estado e faz a busca sozinho
    useEffect(() => {
        if (filtroInicial) {
            setCampos(prev => {
                const novosCampos = { ...prev, ...filtroInicial };
                return novosCampos;
            });
            // ja manda filtrar direto
            aoFiltrar(filtroInicial);
        }
    }, [filtroInicial]);

    // carrega a lista de ambientes assim q o componente aparece na tela
    useEffect(() => {
        const carregarAmbientes = async () => {
            try {
                const resposta = await api.get('ambientes/');
                setListaAmbientes(resposta.data);
            } catch (erro) {
                console.error("Erro ao carregar ambientes", erro);
            }
        };
        carregarAmbientes();
    }, []);

    // funcao q roda toda vez q alguem mexe num input ou select
    const lidarComMudanca = (e) => {
        const { name, value } = e.target;
        const novosCampos = { ...campos, [name]: value };
        setCampos(novosCampos);
        

        // echama a funcao de filtrar do pai
        const filtrosLimpos = Object.fromEntries(
            Object.entries(novosCampos).filter(([_, v]) => v !== '')
        );
        aoFiltrar(filtrosLimpos);
    };


    return (
        <section className="secaoFiltros">
            <form className="formularioBusca" onSubmit={(e) => e.preventDefault()}>
                
                {/* so mostra esse input se tiver na tela de sensores */}
                {contexto === 'sensores' && (
                    <input 
                        type="search" 
                        name="mac_address" 
                        className="entradaBusca" 
                        placeholder="Buscar MAC..." 
                        value={campos.mac_address} 
                        onChange={lidarComMudanca}
                    />
                )}

                {/* esse aparece tanto em ambientes quanto no historico */}
                {(contexto === 'ambientes' || contexto === 'historico') && (
                    <input 
                        type="search" 
                        name="local_nome" 
                        className="entradaBusca" 
                        placeholder="Buscar por Local..." 
                        value={campos.local_nome} 
                        onChange={lidarComMudanca}
                    />
                )}

                <fieldset className="conjuntoFiltros">
                    
                    {contexto === 'ambientes' && (
                        <input 
                            type="text" 
                            name="responsavel" 
                            className="entradaBusca entradaResponsavel" 
                            placeholder="Responsável..." 
                            value={campos.responsavel}
                            onChange={lidarComMudanca}
                        />
                    )}

                    {contexto === 'historico' && (
                        <>
                            {/* select pro tipo de sensor */}
                            <select 
                                name="tipo" 
                                className="seletorOpcao" 
                                value={campos.tipo}
                                onChange={lidarComMudanca}
                            >
                                <option value="">Tipo</option>
                                <option value="1">Temperatura</option>
                                <option value="2">Umidade</option>
                                <option value="3">Luminosidade</option>
                                <option value="4">Contador</option>
                            </select>

                            <input 
                                type="datetime-local" 
                                name="data_inicio" 
                                className="seletorData"
                                value={campos.data_inicio} 
                                onChange={lidarComMudanca}
                            />
                            
                            <label className="textoSeparador">até</label>
                            
                            <input 
                                type="datetime-local" 
                                name="data_fim" 
                                className="seletorData"
                                value={campos.data_fim} 
                                onChange={lidarComMudanca}
                            />
                        </>
                    )}

                    {contexto === 'sensores' && (
                        <>
                            <select 
                                name="tipo" 
                                className="seletorOpcao"
                                value={campos.tipo} //mostra o valor certo se vier da home
                                onChange={lidarComMudanca}
                            >
                                <option value="">Tipo</option>
                                <option value="1">Temperatura</option>
                                <option value="2">Umidade</option>
                                <option value="3">Luminosidade</option>
                                <option value="4">Contador</option>
                            </select>

                            {/* preenche as opcoes com o q veio do back */}
                            <select 
                                name="ambiente" 
                                className="seletorOpcao" 
                                value={campos.ambiente} 
                                onChange={lidarComMudanca}
                            >
                                <option value="">Ambiente</option>
                                {listaAmbientes.map(amb => (
                                    <option key={amb.id} value={amb.id}>
                                        {amb.descricao}
                                    </option>
                                ))}
                            </select>

                            <select 
                                name="status" 
                                className="seletorOpcao" 
                                value={campos.status} 
                                onChange={lidarComMudanca}
                            >
                                <option value="">Status</option>
                                <option value="true">Ativo</option>
                                <option value="false">Inativo</option>
                            </select>

                            <button type="button" className="botaoAdicionar" onClick={abrirModal}>
                                <i className="bi bi-plus-lg"></i> Adicionar
                            </button>
                        </>
                    )}

                </fieldset>
            </form>
        </section>
    );
}

export default BarraFiltros;