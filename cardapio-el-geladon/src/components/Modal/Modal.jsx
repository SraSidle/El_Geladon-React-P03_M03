import "./Modal.css";
import Overlay from "../Overlay/Overlay";

/*canClose será um booleano que se tiver o valor true(fecha o modal)/ false(abre o Modal)
  stopPropagation() => método acionado por meio de um evento, que para a propagação de um evento. Esse termo será 
  utilizado pq a handleClick será acionada em dois elementos que estão um dentro do outro(Overlay e Modal), para que 
  não acione os dois ao mesmo tempo. => O evento só vai ocorrer no elemento que interagir*/

function Modal({ children, closeModal }) {
  const handleClick = (event, canClose) => {
    event.stopPropagation();
    if (canClose) closeModal();
  };

  return (
    <Overlay overlayClick={closeModal}>
      <div className="Modal" onClick={handleClick}>
        <span className="Modal__close" onClick={(event) => handleClick(event, true)}>X</span>
        <div className="Modal__body">{children}</div>
      </div>
    </Overlay>
  );
}

export default Modal;
