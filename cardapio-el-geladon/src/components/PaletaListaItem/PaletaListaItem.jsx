import "../PaletaListaItem/PaletaListaItem";
import { ActionMode } from "../../constants";
import React from "react";
import "../PaletaListaItem/PaletaListaItem.css";

/*Para a configuração de fechar o modal, aqui foi adicionado o parâmetro clickItem(função que receberá paleta.id 
  como parâmetro) na função PaletaListaItem() e será chamada no click da div PaletaListaItem. Como a essa parte tem 
  alguns botões, será colocado neles a função stopPropagation().

  ActionMode está sendo importada aqui, para (se mode !=== NORMAL, desabilitar os botões do removeitem e additem)
*/

function PaletaListaItem({
  paleta,
  quantidadeSelecionada,
  index,
  adicionarItem,
  removerItem,
  clickItem,
  mode,
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
          disabled={mode !== ActionMode.NORMAL} //ver se é aqui ou no return
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

  const badgeAction = (canRender) => {
    if (canRender)
      return (
        <span
          className={`PaletaListaItem__tag ${
            mode === ActionMode.DELETAR && "PaletaListaItem__tag--deletar"
          }`}
        >
          {" "}
          {mode}{" "}
        </span>
      );
  };

  return (
    <div
      className={`
      PaletaListaItem
      ${mode !== ActionMode.NORMAL && 'PaletaListaItem--disable'}
      ${mode === ActionMode.DELETAR && 'PaletaListaItem--deletar'}
    `}
      onClick={() => clickItem(paleta.id)}
    >
      {badgeCounter(quantidadeSelecionada, index)}
      {badgeAction(mode !== ActionMode.NORMAL)}
      <div>
        <div className="PaletaListaItem__titulo">{paleta.titulo}</div>
        <div className="PaletaListaItem__preco">
          R$ {paleta.preco.toFixed(2)}
        </div>
        <div className="PaletaListaItem__descricao">{paleta.descricao}</div>
        <div className="PaletaListaItem__acoes Acoes">
          <button
            disabled={mode !== ActionMode.NORMAL}
            className={`Acoes__adicionar ${
              !quantidadeSelecionada && "Acoes__adicionar-_preencher"
            }`}
            onClick={(event) => {
              event.stopPropagation();
              adicionarItem(index);
            }}
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
