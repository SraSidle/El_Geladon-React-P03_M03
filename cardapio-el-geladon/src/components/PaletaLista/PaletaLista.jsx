import React, { useState, useEffect } from "react";
//import { paletas } from "../mocks/Paletas"; //retira, pois não será mais utilizado
import "./PaletaLista.css";
import PaletaListaItem from "../PaletaListaItem/PaletaListaItem";
import { PaletaService } from "../../services/PaletaService";
//useState controla o estado da aplicação, e o useEffect é responsável por controlar o ciclo de vida da aplicação

function PaletaLista() {
  const [paletas, setPaletas] = useState([]); //pq aqui é com colchetes e o de baixo é com chaves?
  const [paletaSelecionada, setPaletaSelecionada] = useState({}); // tinha um erro aqui, estava entre chaves e não entre colchetes

  const adicionarItem = (paletaIndex) => {
    const paleta = {
      [paletaIndex]: Number(paletaSelecionada[paletaIndex] || 0) + 1,
    };
    setPaletaSelecionada({ ...paletaSelecionada, ...paleta });

    return
  };

  const removerItem = (paletaIndex) => {
    const paleta = {
      [paletaIndex]: Number(paletaSelecionada[paletaIndex]) - 1, // não precisava do "|| 0" pq esse não aparece quando o valor é igual a 0
    };

    setPaletaSelecionada({ ...paletaSelecionada, ...paleta });

    return
  };

  const getLista = async ()=> {
      const response = await PaletaService.getLista();
      setPaletas(response)
  }

  useEffect(()=> {
    getLista();
  },[]) //Esse array deve ser colocado, senão a aplicação rodará em loop infinito
  
  return (
    <div className="PaletaLista">
      {paletas.map((paleta, index) => (
        <PaletaListaItem
          key={`PaletaListaItem-${index}`}
          paleta={paleta}
          quantidadeSelecionada={paletaSelecionada[index]}
          index={index}
          removerItem={removerItem} 
          adicionarItem={adicionarItem}
        />
      ))}
      ;
    </div>
  );
}

export default PaletaLista;
