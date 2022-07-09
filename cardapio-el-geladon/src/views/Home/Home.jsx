import { useState } from "react";
import "./Home.css";
import PaletaLista from "../../components/PaletaLista/PaletaLista"; //Parece que se vc for citar o elemnto exportado, tem que declará-lo, junto com a exportação
import Navbar from "../../components/Navbar/Navbar";
import AdicionaPaletaModal from "../../components/AdicionaPaletaModal/AdicionaPaletaModal";

/*Como o AdicionaPaletaModal está aqui, os valores dele serão alterados pelo useState. A function createPaleta é um parâmetro
do componente Navbar. Ela será acionada pelo botão de adicionar e esse evento transformará o use state em true, que abrirá o
Modal.

Na parte de renderizar o AdicionaPaletaModal, há uma condicional de acordo com o valor do state(true/false), utilizando
a função presente no APM (closeModal)

Dentro do componente importado aqui, o onCreatePaleta, será adicionado uma nova propriedade => onCreatePaleta, que receberá a
função setPaletaAdicionar, a qual recebe como valor de seu parâmetro, "paleta". Esse parâmetro, recebe em seu arquivo de origem, 
o valor presente em response, que é os valores dos inputs que serão adicionados na aplicação pela rota create e que alterarão o
estado, por meio da função setPaletaParaAdicionar. A próxima alteração, será no PaletaLista
*/

function Home() {
  const [canShowAddDetalhes, setCanShowAddDetalhes] = useState(false);

  const [paletaParaAdicionar, setPaletaParaAdicionar] = useState()

  return (
    <div className="Home">
      <Navbar createPaleta={() => setCanShowAddDetalhes(true)} />
      <div className="Home__container">
        <PaletaLista paletaCriada={paletaParaAdicionar}/>
        {canShowAddDetalhes && (
          <AdicionaPaletaModal
            closeModal={() => setCanShowAddDetalhes(false)}
            onCreatePaleta={(paleta) => setPaletaParaAdicionar(paleta)}
          />
        )}
      </div>
    </div>
  );
}

export default Home;
