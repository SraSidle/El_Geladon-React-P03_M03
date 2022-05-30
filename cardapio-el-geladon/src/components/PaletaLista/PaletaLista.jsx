import React, { useState } from "react";
import { paletas } from "../mocks/Paletas";
import "./PaletaLista.css";
import PaletaListaItem from "../PaletaListaItem/PaletaListaItem";

function PaletaLista() {
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
