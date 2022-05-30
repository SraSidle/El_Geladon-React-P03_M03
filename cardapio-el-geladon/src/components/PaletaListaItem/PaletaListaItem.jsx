import "../PaletaListaItem/PaletaListaItem";
import React from "react";
import "../PaletaListaItem/PaletaListaItem.css";

function PaletaListaItem({
  paleta,
  quantidadeSelecionada,
  index,
  adicionarItem,
  removerItem,
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
        <button className="Acoes__remover" onClick={() => removerItem(index)}>
          Remover
        </button>
      )}
    </>
  );

  return (
    <div className="PaletaListaItem">
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
            onClick={() => adicionarItem(index)}
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
