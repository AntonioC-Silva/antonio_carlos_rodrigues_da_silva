import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import './sensores.css';

//definir icones e nomes por tipo
const obterInfoTipo = (tipo) => {
    switch(String(tipo)) {
        case '1': return { nome: 'Temperatura', icone: 'bi-thermometer-half' };
        case '2': return { nome: 'Umidade', icone: 'bi-droplet-fill' };
        case '3': return { nome: 'Luminosidade', icone: 'bi-sun-fill' };
        case '4': return { nome: 'Contador', icone: 'bi-123' };
        default: return { nome: 'Desconhecido', icone: 'bi-question-circle' };
    }
};


function Sensores({ filtrosAtivos }) {
    const [listaSensores, setListaSensores] = useState([]);

    // busca dados na api quando filtro muda
    useEffect(() => {
        const carregarSensores = async () => {
            try {
                const resposta = await api.get('sensores/', { 
                    params: filtrosAtivos 
                });
                setListaSensores(resposta.data);
            } catch (erro) {
                console.error("Erro ao carregar sensores:", erro);
            }
        };

        carregarSensores();
    }, [filtrosAtivos]);

    return (
        <section className="tabela">
            <table className="tabelaSensores">
                <thead>
                    <tr>
                        <th>Tipo</th>
                        <th>MAC Address</th>
                        <th>Local</th>
                        <th>Medida</th>
                        <th>Localização</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {listaSensores.length > 0 ? (
                        // manda sensores para cada linha da tabela
                        listaSensores.map((sensor) => {
                            const info = obterInfoTipo(sensor.tipo);
                            
                            return (
                                <tr key={sensor.id}>
                                    <td className="tipo">
                                        <i className={`bi ${info.icone} iconeTipo`}></i>
                                        {sensor.tipo_display || info.nome}
                                    </td>
                                    
                                    <td>{sensor.mac_address}</td>
                                    <td>{sensor.nome_local || sensor.ambiente}</td> 
                                    <td>{sensor.unidade_med}</td>
                                    <td>
                                        <small>
                                            Lat: {sensor.latitude}<br/>
                                            Lng: {sensor.longitude}
                                        </small>
                                    </td>
                                    <td className={`indicadorStatus ${sensor.status ? 'statusAtivo' : 'statusInativo'}`}>
                                        <i className="bi bi-circle-fill luzStatus"></i>
                                        {sensor.status ? 'Ativo' : 'Inativo'}
                                    </td>
                                </tr>
                            );
                        })
                    ) : (
                        // mensagem se n tiver dados
                        <tr>
                            <td colSpan="6">
                                Nenhum sensor encontrado com esses filtros.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </section>
    );
}

export default Sensores;