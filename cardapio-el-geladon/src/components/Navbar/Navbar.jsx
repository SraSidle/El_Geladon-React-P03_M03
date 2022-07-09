import '../Navbar/Navbar.css';
import sacola from "../assets/icons/sacola.svg";
import logo from "../assets/icons/logo.svg";
//import paleta from "../assets/icons/paleta.svg"

/* Para a funcionalidade de adicionar paleta, foi colocado "createPaleta" com parâmetro da função Navbar, o qual, será
chamado como função no onclick da img Adiconar Paleta
*/

function Navbar({createPaleta}){
    return(
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
                    onClick={() => createPaleta()}>
                  <img className="Paleta__icone"
                     src={sacola} 
                     width="40px"
                     alt="Adicionar Paleta"
                    
                  />
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