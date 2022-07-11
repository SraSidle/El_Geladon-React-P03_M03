import React, { useState, useEffect, useCallback } from "react";
import "./PaletaLista.css";
import PaletaListaItem from "../PaletaListaItem/PaletaListaItem";
import { PaletaService } from "../../services/PaletaService";
import PaletaDetalhesModal from "../PaletaDetalhesModal/PaletaDetalhesModal";
import { ActionMode } from "../../constants/index";
/* Hooks = useState e useEffect
useState controla o estado da aplicação, e o useEffect é responsável por controlar o ciclo de vida da aplicação(todos os estados)
o useState começa com um array vazio, então, para mudar isso, será necessário criar uma função assíncrona, que 
fará a chamada de API e vai preencher o state através da função setPaletas(termo capaz de alterar o state => paletas).

o useEffect tem dois parâmetros, primeiro uma função, e o segundo, um array 

 getLista(): A "const response", receberá a rota presente no arquivo PaletaService, onde contém a lista de todas as paletas por
 método GET. E response se tornará o parâmetro da função setPaletas.

 useState(false)=> nessa condição, o modal não abre, sendo necessário que haja algum evento para inverter esse booleano.
paletaModal é o state que inicia false <PaletaDetalhesModal /> é o componente que se deseja renderizar. então para que o modal abra,
ambos devem ser verdadeiros.

Aqui, a função PaletaLista recebe o parâmetro "paletaCriada", que será um valor utilizado no useEffect. Quando for verdadeiro
(ouver uma nova paleta) será acionada a função addPaletainList que recebe a nova paleta e adiciona na lista e altera o state
 
o Mapper fo criado para transitar nos modos (Normal,update, delete) e eecuta a ação condizente com o modo

useCallback. Ele é necessário para indicarmos quando há um hook de useState sendo referenciado dentro de um hook de useEffect.
*/

function PaletaLista({paletaCriada, mode, updatePaleta, deletePaleta}) {
  const [paletas, setPaletas] = useState([]); //pq aqui é com colchetes e o de baixo é com chaves?
  const [paletaSelecionada, setPaletaSelecionada] = useState({}); // tinha um erro aqui, estava entre chaves e não entre colchetes
  const [paletaModal, setPaletaModal] = useState(false);

  const adicionarItem = (paletaIndex) => {
    const paleta = {
      [paletaIndex]: Number(paletaSelecionada[paletaIndex] || 0) + 1,
    };
    setPaletaSelecionada({ ...paletaSelecionada, ...paleta });

    return;
  };

  const removerItem = (paletaIndex) => {
    const paleta = {
      [paletaIndex]: Number(paletaSelecionada[paletaIndex]) - 1, // não precisava do "|| 0" pq esse não aparece quando o valor é igual a 0
    };

    setPaletaSelecionada({ ...paletaSelecionada, ...paleta });

    return;
  };

  const getLista = async () => {
    const response = await PaletaService.getLista();
    setPaletas(response);
  };

  const getPaletaById = async (paletaId) => {
    const response = await PaletaService.getById(paletaId);
     const mapper = {
      [ActionMode.NORMAL]: () => setPaletaModal(response),
      [ActionMode.ATUALIZAR]: () => updatePaleta(response),
      [ActionMode.DELETAR]: () => deletePaleta(response),
     };

     mapper[mode]();
  };

  useEffect(() => {
    getLista();
  }, []); //Esse array deve ser colocado, senão a aplicação rodará em loop infinito

  const addPaletainList = useCallback(
    (paleta) => {
      const list = [...paletas, paleta]
     setPaletas(list);
    },
    [paletas]
  );

  useEffect(() => {
    if(paletaCriada &&
    !paletas.map(({id}) => id).includes(paletaCriada.id)
    ) {
      addPaletainList(paletaCriada)
    }
}, [addPaletainList, paletaCriada, paletas]);

  return (
    <div className="PaletaLista">
      {paletas.map((paleta, index) => (
        <PaletaListaItem
          mode={mode}
          key={`PaletaListaItem-${index}`}
          paleta={paleta}
          quantidadeSelecionada={paletaSelecionada[index]}
          index={index}
          removerItem={(index) => removerItem(index)}
          adicionarItem={(index) => adicionarItem(index)}
          clickItem={(paletaId) =>
            getPaletaById(paletaId)
          } /*Quando aqui era por getAll, o state era setPaletas(response), mas como está por id, a sintaxe é essa */
        />
      ))}
      {paletaModal && (
        <PaletaDetalhesModal
          paleta={paletaModal}
          closeModal={() => setPaletaModal(false)}
        />
      )}
    </div>
  );
}

export default PaletaLista;
