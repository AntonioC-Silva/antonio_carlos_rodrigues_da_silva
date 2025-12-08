import React from 'react';
import './cardIndicador.css';


const CardIndicador = ({ titulo, valor, icone }) => {
  return (
    <li className="cardItem">
      <article className="cardConteudo">
        
        <header className="cardCabecalho">
          <h3 className="cardTitulo">
            {titulo}
          </h3>
          <output className="cardValor">
            {valor}
          </output>
        </header>
        <figure className="cardIcone" aria-hidden="true" >
          {icone}
        </figure>

      </article>
    </li>
  );
};

export default CardIndicador;