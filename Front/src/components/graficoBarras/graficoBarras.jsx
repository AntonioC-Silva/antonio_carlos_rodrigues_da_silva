import React from 'react';
import './graficoBarras.css';

const GraficoBarras = ({ titulo, dados }) => {
  if (!dados || dados.length === 0) {
    return (
      <figure className="graficoFigura">
        <figcaption className="graficoTitulo">{titulo}</figcaption>
        <div style={{ color: '#949393', textAlign: 'center', padding: '40px' }}>
          Carregando ou sem dados...
        </div>
      </figure>
    );
  }


  const valorMaximo = Math.max(...dados.map(d => d.valor)) || 100; 

  return (
    <figure className="graficoFigura">
      <figcaption className="graficoTitulo">
        {titulo}
      </figcaption>

      <ul className="eixoX">
        {dados.map((item, index) => {
          const altura = (item.valor / valorMaximo) * 100;

          return (
            <li key={index} className="colunaItem">
              <strong className="valorTexto">
                {item.valor}
              </strong>

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