import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import './historico.css';

function Historico({ filtrosAtivos }) {
    const [listaHistorico, setListaHistorico] = useState([]);

    useEffect(() => {
        const carregarHistorico = async () => {
            try {
                // Passa os filtros na requisição
                const resposta = await api.get('medicoes/', { params: filtrosAtivos });
                setListaHistorico(resposta.data);
            } catch (erro) {
                console.error("Erro ao carregar histórico:", erro);
            }
        };
        carregarHistorico();
    }, [filtrosAtivos]);

    // formatar data
    const formatarData = (dataISO) => {
        return new Intl.DateTimeFormat('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(new Date(dataISO));
    };

    return (
        <section className="tabela">
            <table className="tabelaHistorico">
                <thead>
                    <tr>
                        <th>Tipo</th>
                        <th>Local</th>
                        <th>Valor</th>
                        <th>Unidade</th>
                        <th>Data / Hora</th>
                    </tr>
                </thead>
                <tbody>
                    {listaHistorico.map((registro) => (
                        <tr key={registro.id}>
                            <td className="celulaDestaque">
                                <i className="bi bi-cpu-fill iconeSensor"></i>
                                {registro.tipo_sensor}
                            </td>

                            <td className="celulaLocal">{registro.local_sensor}</td>

                            <td className="celulaValor">{registro.valor}</td>

                            <td className="celulaUnidade">{registro.unidade_sensor}</td>

                            <td className="celulaData">
                                <i className="bi bi-clock iconeRelogio"></i>
                                {formatarData(registro.timestamp)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
}

export default Historico;