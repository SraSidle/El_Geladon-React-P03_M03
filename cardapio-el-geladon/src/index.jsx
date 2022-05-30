import React from "react";
import reactDOM from "react-dom/client"; // react-dom não suportado na versão 18, utilizar "createRoot" e colocar o /client nessa linha
import Home from "./views/Home/Home";
import "./components/assets/styles/main.css"; //Tem que ser com a primeira letra maiúscula, sempre, SEMPRE

const root = reactDOM.createRoot(document.getElementById('root'));
// adciona essa linha de código, para criar o root e utilizar para redenrização, e não o "reactDOM"

root.render( //troca o reactDOM presente aqui, por "root"
  <React.StrictMode>
    <Home />
  </React.StrictMode>,
  // retira a linha que estava aqui, pois ela é citada na linha 7
);

//manifest.json é utilizado quando se trabalha com TWA(geração de ícones para a aplicação)/ funciona com app nativo
