import React from 'react';
import './sobreMim.css';


const SobreMim = () => {
  return (
    <section 
      className="secaoPerfil"
      aria-labelledby="tituloSobre"
    >
      <figure className="areaFoto">
        <img 
          src="./eu.jpg" 
          alt="Desenvolvedor Full Stack Antônio Rodrigues"
          className="sobreFoto"
        />
      </figure>

      <article className="sobreTexto">
        <header>
          <h2 id="tituloSobre" className="sobreTitulo">
            Sobre o Desenvolvedor
          </h2>
          <strong className="sobreCargo">
            Full Stack Developer
          </strong>
        </header>
        
        <p className="sobreDescricao">
          Responsável pela arquitetura completa do sistema "Sense". 
          desde o backend em django, assim fazendo a api que alimenta o frontend,
          até mesmo o frontend em React, criando uma interface acessivel.
        </p>
      </article>
    </section>
  );
};

export default SobreMim;