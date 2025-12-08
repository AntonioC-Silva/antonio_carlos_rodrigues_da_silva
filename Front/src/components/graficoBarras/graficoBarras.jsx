import React from 'react';
import './graficoBarras.css';


const GraficoBarras = ({ titulo, dados }) => {
  // exibe mensagem se nao houver dados 
  if (!dados || dados.length === 0) {
    return (
      <figure className="graficoFigura">
        <figcaption className="graficoTitulo">{titulo}</figcaption>
        <article className='carregando' >
          Carregando ou sem dados...
        </article>
      </figure>
    );
  }

  // calcula o maior valor para definir a escala de 0 a 100
  const valorMaximo = Math.max(...dados.map(d => d.valor)) || 100; 

  return (
    <figure className="graficoFigura">
      <figcaption className="graficoTitulo">
        {titulo}
      </figcaption>

      <ul className="eixoX">
        {dados.map((item, index) => {
          // calcula a altura proporcional em porcentagem
          const altura = (item.valor / valorMaximo) * 100;

          return (
            <li key={index} className="colunaItem">
              <strong className="valorTexto">
                {item.valor}
              </strong>

              {/*barra com altura dinamica */}
              <data 
                className="barraVisual" 
                value={item.valor}
                style={{ height: `${altura}%` }} 
                title={`${item.nome}: ${item.valor}`}
              />

              <p className="rotuloEixo">
                {item.nome}
              </p>
            </li>
          );
        })}
      </ul>
    </figure>
  );
};

export default GraficoBarras;