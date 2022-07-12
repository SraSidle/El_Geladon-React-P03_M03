import "../Navbar/Navbar.css";
import { ActionMode } from "../../constants/index";
import sacola from "../assets/icons/sacola.svg";
import logo from "../assets/icons/logo.svg";
//import atualizar from "../assets/icons/atualizar.svg";

/* Para a funcionalidade de adicionar paleta, foi colocado "createPaleta" com parâmetro da função Navbar, o qual, será
chamado como função no onclick da img Adiconar Paleta

O updatePaleta foi add como parâmetro, sendo uma função

o mode está sendo utilizado para receber o valor de ActionMode, se for igual a ATUALIZAR, adicionará a classe Paleta--ativa
ao button, colocando-o em destaque dos demais
*/

function Navbar({ createPaleta, updatePaleta, mode }) {
  return (
    <div className="Home__header Header">
      <div className="row">
        <div className="Header__logo Logo">
          <img
            src={logo}
            width="70px"
            alt="Logo El Geladon"
            className="Logo__icone"
          />
          <span className="Logo__titulo"> El Geladon </span>
        </div>
        <div className="Header__opcoes Opcoes">
          <button
            type="button"
            className="Opcoes__paleta Paleta"
            onClick={() => createPaleta()}
          >
            <img
              className="Paleta__icone"
              src={sacola}
              width="40px"
              alt="Adicionar Paleta"
            />
          </button>
          <button
            type="button"
            className={`Opcoes__paleta Paleta  ${
              mode === ActionMode.ATUALIZAR && "Paleta--ativa"
            } `}
            onClick={() => updatePaleta()}
          >
            <img
              className="Paleta__icone"
              src={logo}
              width="40px"
              alt="Editar Paleta"
            />
          </button>
          <button
  type="button"
  className={`Opcoes__paleta Paleta ${mode === ActionMode.DELETAR && 'Paleta--deletar'}`}
  onClick={() => deletePaleta()}>

  <img src={sacola} width="40px" className="Paleta__icone" alt="Deletar paleta" />

</button>
          <div className="Opcoes__sacola Sacola">
            <img
              src={sacola}
              width="40px"
              className="Sacola__icone"
              alt="Sacola de compras"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
