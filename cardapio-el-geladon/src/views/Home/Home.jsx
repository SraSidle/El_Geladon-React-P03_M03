import { useState } from "react";
import "./Home.css";
import Navbar from "../../components/Navbar/Navbar";
import { ActionMode } from "../../constants/index";
import DeletaPaletaModal from "../../components/DeletaPaletaModal/DeletaPaletaModal";
import PaletaLista from "../../components/PaletaLista/PaletaLista"; //Parece que se vc for citar o elemnto exportado, tem que declará-lo, junto com a exportação
import AdicionaEditaPaletaModal from "../../components/AdicionaEditaPaletaModal/AdicionaEditaPaletaModal";

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

  const [updatePaleta, setUpdatePaleta] = useState();

  const [paletaEditada, setPaletaEditada] = useState();

  const [deletePaleta, setDeletePaleta] = useState();

  const [paletaRemovida, setPaletaRemovida] = useState();

  const handleDeletePaleta = (paletaToDelete) => {
    setDeletePaleta(paletaToDelete);
  }

  const handleUpdatePaleta = (paletaToUpdate) => {
    setUpdatePaleta(paletaToUpdate);
    setCanShowAddDetalhes(true)
  }

  const handleCloseModal = () => {
    setCanShowAddDetalhes(false);
    setPaletaParaAdicionar();
    setDeletePaleta();
    setUpdatePaleta();
    setModoAtual(ActionMode.NORMAL);
  }


  return (
    <div className="Home">
      <Navbar
        mode={modoAtual}
        createPaleta={() => setCanShowAddDetalhes(true)}
        updatePaleta={() => handleAction(ActionMode.ATUALIZAR)}
        deletePaleta={() => handleAction(ActionMode.DELETAR)}
      />
      <div className="Home__container">
        <PaletaLista
        mode={modoAtual}
        paletaCriada={paletaParaAdicionar} 
        deletePaleta={handleDeletePaleta}
        updatePaleta={handleUpdatePaleta}
        paletaRemovida={paletaRemovida}
        />
        {canShowAddDetalhes && (
          <AdicionaEditaPaletaModal
            mode={modoAtual}
            paletaToUpdate={paletaParaAdicionar}
            onUpdatePaleta={(paleta) => setPaletaEditada(paleta)}
            closeModal={handleCloseModal}
            onCreatePaleta={(paleta) => setPaletaParaAdicionar(paleta)}
          />
        )}

{
  deletePaleta &&
  <DeletaPaletaModal
    paletaParaDeletar={deletePaleta}
    closeModal={handleCloseModal}
    onDeletePaleta={(paleta) => setPaletaRemovida(paleta)}
    />
}
      </div>
    </div>
  );
}

export default Home;
