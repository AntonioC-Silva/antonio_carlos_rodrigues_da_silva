import React from 'react';
import './cardTipo.css';

const CardTipo = ({ tipo, icone, aoClicar }) => {
    return (
        <li className="cardTipo" onClick={aoClicar} role="button" tabIndex={0}>
            <i className={`bi ${icone} iconeTipo`}></i>
            <h3 className="tituloTipo">{tipo}</h3>
        </li>
    );
};

export default CardTipo;