import "./PaletaDetalhesModal.css";
import Modal from "../Modal/Modal";

/*PaletaDM precisa de dois parãmetros: paleta para poder renderizar e closeModal para fechar o modal*/

function PaletaDetalhesModal({paleta, closeModal}) {
  return (
    <Modal closeModal={closeModal}>
      <div className="PaletaDetalhesModal">
        <div>
          <div className="PaletaDetalhesModal__titulo">{paleta.titulo}</div>
          <div className="PaletaDetalhesModal__preco">R${Number(paleta.preco).toFixed(2)}</div>
          <div className="PaletaDetalhesModal__sabor"><b>Sabor: </b>{paleta.sabor}</div>
          {paleta.recheio && <div className="PaletaDetalhesModal__descricao"><b>Recheio: </b>{paleta.recheio}</div>}
          <div className="PaletaDetalhesModal__descricao"><b>Descrição</b>{paleta.descricao}</div>
        </div>
        <img src={paleta.foto} alt={`Paleta de ${paleta.sabor}`} className="PaletaDetalhesModal__foto"></img>
      </div>
    </Modal>
  );
}

export default PaletaDetalhesModal;
