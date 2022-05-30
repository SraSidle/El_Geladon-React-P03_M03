import PaletaLista from "../../components/PaletaLista/PaletaLista"; //Parece que se vc for citar o elemnto exportado, tem que declará-lo, junto com a exportação
import "../../views/Home/Home.css";
import Navbar from '../../components/Navbar/Navbar'

function Home() {
  return (
     <div className="Home">
        <Navbar />
      <div className="Home__container">
        <PaletaLista />
      </div>
    </div>
  );
} // Todo componente precisa ser exportado e aqui é "className"

export default Home;
