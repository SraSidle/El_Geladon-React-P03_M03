import { useState, useEffect } from "react";
import Modal from "../Modal/Modal";
import "./AdicionaPaletaModal.css";
import { PaletaService } from "../../services/PaletaService";

/* Esse arquivo será adicionado no Home.jsx

Nessa function, a propriedade closeModal é chamada dentro do parâmetro dela. De início é feita a const form, que servirá
como parâmetro para useState com os valores do objeto vazios.

A função handleChange vai manipular o state de acordo com as alterações que forem ocorrendo dentro dos inputs. Essa function
será acionada quando estiver ocorrendo o evento de onChange. Ela alterará o state(newPaleta) por meio do setState(setNewPaleta).
Dentro dessa função terá o evento(alteração que ocorrerá no campo) e o name(propriedade que dá nome a cada um dos inputs). O 
setNewPaleta será acionado dentro dela e receberá o state newPaleta "espalhado dentro dele: => ... Além disso, o [name] será 
vinculado ao valor dentro do evento(onChange). Essa relação será feita dentro do input que estará dentro do formulário

Aqui nesse arquivo haverá uma função para que o preenchimento dos campos do input sejam validados. Nesse caso, haverá o state
canDisable que iniciará com valor true e mudará para false quando os campos obrigatórios estiverem preenchidos, assim, o button
de enviar será ou não habilitado. A const canDisableSendButton será a função responsável por receber e verificar os valores
no input e, a partir disso, alterar o booleano do state.

A const createPaleta, será a responsável por fazer a ligação dos arquivos adicionados aqui com a rota configurada em paletaServices
Nela, está adicionada cada propriedade que será relacionada ao state que será o valor utilizado para ser cadastrado no Api

O parâmetro "onCreatePaleta" é adicionado aqui, ele receberá o valor response, que recebe a rota de criação da paleta, com os seus
valores. Essa alteração deverá ser informada em outro componente: Home.jsx. Nele será adicionado o estado "paletaParaAdicionar"
*/

function AdicionaPaletaModal({ closeModal, onCreatePaleta }) {
  const form = {
    preco: "",
    sabor: "",
    recheio: "",
    descricao: "",
    foto: "",
  };

  const [newPaleta, setNewPaleta] = useState(form);

  const handleChange = (event, name) => {
    setNewPaleta({ ...newPaleta, [name]: event.target.value });
  };

  const [canDisable, setCanDisable] = useState(true);

  const canDisableSendButton = () => {
    const response = !Boolean(
      newPaleta.preco.length  &&
        newPaleta.sabor.length > 2 &&
        newPaleta.descricao.length > 9 &&
        newPaleta.foto.length
    );

    setCanDisable(response);
  };

  useEffect(() => {
    canDisableSendButton();
  });

  const createPaleta = async () => {
    const renomeiaCaminhoFoto = (fotoPath) => fotoPath.split("\\").pop();

    const { sabor, recheio, descricao, preco, foto } = newPaleta;

    const titulo = sabor + (recheio && " com " + recheio);

    const paleta = {
      sabor: titulo,
      descricao,
      preco,
      foto: `assets/images/${renomeiaCaminhoFoto(foto)}`,
    };

    const response = await PaletaService.create(paleta);

    onCreatePaleta(response)

    closeModal();
  };

  return (
    <Modal closeModal={() => closeModal()}>
      <div className="AdicionaPaletaModal">
        <h2>Adicionar ao Cardápio</h2>

        <form autoComplete="off">
          <div>
            <label className="AdicionaPaletaModal__text" htmlFor="preco">
              Preço:{" "}
            </label>
            <input
              id="preco"
              placeholder="R$ 10,00"
              value={newPaleta.preco}
              onChange={(event) => handleChange(event, "preco")}
              required
            />
          </div>
          <div>
            <label className="AdicionaPaletaModal__text" htmlFor="sabor">
              Sabor:{" "}
            </label>
            <input
              id="sabor"
              placeholder="Chocolate"
              value={newPaleta.sabor}
              onChange={(event) => handleChange(event, "sabor")}
              required
            />
          </div>
          <div>
            <label className="AdicionaPaletaModal__text" htmlFor="recheio">
              Recheio:{" "}
            </label>
            <input
              id="recheio"
              placeholder="Morango"
              value={newPaleta.recheio}
              onChange={(event) => handleChange(event, "recheio")}
            />
          </div>
          <div>
            <label className="AdicionaPaletaModal__text" htmlFor="descricao">
              Descrição:{" "}
            </label>
            <input
              id="descricao"
              placeholder="Uma paleta refrescante..."
              value={newPaleta.descricao}
              onChange={(event) => handleChange(event, "descricao")}
              required
            />
          </div>
          <div>
            <label
              className="AdicionaPaletaModal__text AdicionaPaletaModal__foto-label"
              htmlFor="foto"
            >
              {!newPaleta.foto.length ? "Selecionar Imagem" : newPaleta.foto}
            </label>
            <input
              className="AdicionaPaletaModal__foto"
              id="foto"
              type="file"
              accept="image/png, image/gif, image/jpeg"
              value={newPaleta.foto}
              onChange={(event) => handleChange(event, "foto")}
              required
            />
          </div>

          <button
            className="AdicionaPaletaModal__enviar"
            type="button"
            disabled={canDisable}
            onClick={createPaleta}
          >
            Enviar
          </button>
        </form>
      </div>
    </Modal>
  );
}

export default AdicionaPaletaModal;
