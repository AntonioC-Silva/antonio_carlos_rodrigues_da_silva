import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import './ambientes.css';

function Ambientes({ filtrosAtivos }) { // Recebe filtros
    const [listaAmbientes, setListaAmbientes] = useState([]);

    useEffect(() => {
        const carregarAmbientes = async () => {
            try {
                // Passa os filtros na requisição
                const resposta = await api.get('ambientes/', { params: filtrosAtivos });
                setListaAmbientes(resposta.data);
            } catch (erro) {
                console.error("Erro ao carregar ambientes:", erro);
            }
        };
        carregarAmbientes();
    }, [filtrosAtivos]); // Recarrega quando filtros mudam

    return (
        <section className="tabela">
            <table className="tabelaAmbientes">
                <thead>
                    <tr>
                        <th>Local</th>
                        <th>Descrição</th>
                        <th>Responsável</th>
                    </tr>
                </thead>
                <tbody>
                    {listaAmbientes.map((ambiente) => (
                        <tr key={ambiente.id}>
                            
                            <td className="celulaDestaque">
                                <i className="bi bi-geo-alt-fill iconeLocal"></i>
                                {ambiente.nome_local}
                            </td>

                            <td>{ambiente.descricao}</td>

                            <td>
                                <span className="responsavel">
                                    <i className="bi bi-person-circle"></i>
                                    {ambiente.nome_responsavel}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
}

export default Ambientes;