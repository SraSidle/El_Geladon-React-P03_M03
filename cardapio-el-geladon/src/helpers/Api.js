/* Será importado no services/PaletaService.js
Esse é um arquivo para configuração das rotas da Api, com todas as URLs de cada função
que será executada, a partir de um arquivo jsx configurado para determinado método. (PUT, DELETE, etc.*/

const PaletaContext = {
  paletaEndpoint: () => `${Api.baseUrl}/paletas`,
  paletaLista: () => `${PaletaContext.paletaEndpoint()}/all-paletas`,
  paletaById: (id) => `${PaletaContext.paletaEndpoint()}/one-paleta/${id}`, //Se der erro, pode ser que precise de aspas
  createPaleta: () => `${PaletaContext.paletaEndpoint()}/create-paleta`,
  updatePaletaById: (id) =>
    `${PaletaContext.paletaEndpoint()}/update-paleta/${id}`,
  deletePaletaById: (id) =>
    `${PaletaContext.paletaEndpoint()}/delete-paleta/${id}`,
};

export const Api = {
  baseUrl: "https://api-elgeladon.herokuapp.com",
  ...PaletaContext, 
  /*"..." Spread Operator, é como se "espalhasse" todos os dados de PaletaContext e colocasse dentro da const Api*/
};
