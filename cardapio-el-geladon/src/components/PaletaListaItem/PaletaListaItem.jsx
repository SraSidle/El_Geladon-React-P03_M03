import "../PaletaListaItem/PaletaListaItem";
import React from "react";
import "../PaletaListaItem/PaletaListaItem.css";

/*Para a configuração de fechar o modal, aqui foi adicionado o parâmetro clickItem(função que receberá paleta.id 
  como parâmetro) na função PaletaListaItem() e será chamada no click da div PaletaListaItem. Como a essa parte tem 
  alguns botões, será colocado neles a função stopPropagation()
*/

function PaletaListaItem({
  paleta,
  quantidadeSelecionada,
  index,
  adicionarItem,
  removerItem,
  clickItem,
}) {
  const badgeCounter = (canRender, index) => {
    return (
      <>
        {Boolean(canRender) && (
          <span className="PaletaListaItem__badge">
            {" "}
            {quantidadeSelecionada}
          </span>
        )}
      </>
    );
  };

  const removeButton = (canRender, index) => (
    <>
      {Boolean(canRender) && (
        <button
          className="Acoes__remover"
          onClick={(event) => {
            event.stopPropagation();
            removerItem(index);
          }}
        >
          Remover
        </button>
      )}
    </>
  );

  return (
    <div className="PaletaListaItem" onClick={() => clickItem(paleta.id)}>
      {badgeCounter(quantidadeSelecionada, index)}
      <div>
        <div className="PaletaListaItem__titulo">{paleta.titulo}</div>
        <div className="PaletaListaItem__preco">
          R$ {paleta.preco.toFixed(2)}
        </div>
        <div className="PaletaListaItem__descricao">{paleta.descricao}</div>
        <div className="PaletaListaItem__acoes Acoes">
          <button
            className={`Acoes__adicionar ${
              !quantidadeSelecionada && "Acoes__adicionar-_preencher"
            }`}
            onClick={(event) => {event.stopPropagation(); adicionarItem(index);}}
          >
            Adicionar
          </button>
          {removeButton(quantidadeSelecionada, index)}
        </div>
      </div>
      <img
        className="PaletaListaItem__foto"
        src={paleta.foto}
        alt={`Paleta de ${paleta.sabor}`}
      />
    </div>
  );
}

export default PaletaListaItem;
