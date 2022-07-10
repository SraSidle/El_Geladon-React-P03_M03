import { useState } from "react";
import "./Home.css";
import PaletaLista from "../../components/PaletaLista/PaletaLista"; //Parece que se vc for citar o elemnto exportado, tem que declará-lo, junto com a exportação
import Navbar from "../../components/Navbar/Navbar";
import AdicionaEditaPaletaModal from "../../components/AdicionaEditaPaletaModal/AdicionaEditaPaletaModal";
import { ActionMode } from "../../constants/index";

/*Como o AdicionaPaletaModal está aqui, os valores dele serão alterados pelo useState. A function createPaleta é um parâmetro
do componente Navbar. Ela será acionada pelo botão de adicionar e esse evento transformará o use state em true, que abrirá o
Modal.

Na parte de renderizar o AdicionaPaletaModal, há uma condicional de acordo com o valor do state(true/false), utilizando
a função presente no APM (closeModal)

Dentro do componente importado aqui, o onCreatePaleta, será adicionado uma nova propriedade => onCreatePaleta, que receberá a
função setPaletaAdicionar, a qual recebe como valor de seu parâmetro, "paleta". Esse parâmetro, recebe em seu arquivo de origem, 
o valor presente em response, que é os valores dos inputs que serão adicionados na aplicação pela rota create e que alterarão o
estado, por meio da função setPaletaParaAdicionar. A próxima alteração, será no PaletaLista.

A partir da importação do ActionMode, que é passado como parâmetro do useState, cria-se aqui, a função handleActions, a qual
será responsável por modificar as ações que irão acontecer. Essa função receberá uma ação como parâmetro. se o state(modoAtual)
for diferente de NORMAL, ela alterará a ação. Essa função será chamada no componente Navbar, com o valor de atualizar e deletar 

A propriedade mode, adicionada no Navbar e paletaLista dentro de Home, paletaLista e PlistaItem será responsável por receber as
alterações no state e refletir isso visualmente*/

function Home() {
  const [canShowAddDetalhes, setCanShowAddDetalhes] = useState(false);

  const [paletaParaAdicionar, setPaletaParaAdicionar] = useState();

  const [modoAtual, setModoAtual] = useState(ActionMode.NORMAL);

  const handleAction = (action) => {
    const newAction = modoAtual === action ? ActionMode.NORMAL : action;
    setModoAtual(newAction)
  };

  return (
    <div className="Home">
      <Navbar
        mode={modoAtual}
        createPaleta={() => setCanShowAddDetalhes(true)}
        updatePaleta={() => handleAction(ActionMode.ATUALIZAR)}
      />
      <div className="Home__container">
        <PaletaLista
        mode={modoAtual}
        paletaCriada={paletaParaAdicionar} />
        {canShowAddDetalhes && (
          <AdicionaEditaPaletaModal
            closeModal={() => setCanShowAddDetalhes(false)}
            onCreatePaleta={(paleta) => setPaletaParaAdicionar(paleta)}
          />
        )}
      </div>
    </div>
  );
}

export default Home;
