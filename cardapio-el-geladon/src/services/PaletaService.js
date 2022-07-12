import { Api } from "../helpers/Api";
/*Linha 3: receberá o response(resposta da Api) e converterá em json
  PaletaService{} => Dentro desse objeto, serão acionados os métodos do protoclo HTTP(GET, PUT, DELETE, POST), que obterá
  funções que retornarão cada requisição do backend

  Ex: getLista() => vai receber a URL da API que tem todas as paletas e o seu método para que isso seja feito,
   "method: GET" e a conversão para json.
 
  *fetch é uma api nativa do JS, que permite fazer requisições/conexões com o backend. Dentro dele é passada 
  fetch(arquivo com as URLs das rotas importado.função que contém a URL da rota que fará algo específico(), method: "GET || POST || PUT || DELETE").Então(converte para Json)
  fetch(Api.paletaLista(), method: "GET").then(parseResponse)

  A api ela fornece apenas: _id, descricao, foto, preco e sabor. Não tem a propriedade "título".Então, para isso, 
  será necessário pegar os dados da API e estruturar em um padrão reconhecível pelo front, para assim, não precisar modificar 
  o paletaLista. Isso será feito por meio da função "transformPaleta".

  dados fixos(mockados, as imagens pode ficar na src e serem renderizadas), mas em dados dinâmicos, como os da API, eles 
  devem ficar dentro de assets que deverá estar dentro da public.
*/

const parseResponse = (response) => response.json();

const transformPaleta = (paleta) => {
  const [sabor, recheio] = paleta.sabor.split(" com ");

  return {
    ...paleta,
    id: paleta._id,
    titulo: paleta.sabor,
    sabor,
    ...(recheio && { recheio }),
    possuiRecheio: Boolean(recheio),
  };
};

const parseTransformLista = (response) =>
  parseResponse(response).then((paletas) => paletas.map(transformPaleta));

const parseTransformItem = (response) =>
  parseResponse(response).then(transformPaleta);

export const PaletaService = {
  getLista: () =>
    fetch(Api.paletaLista(), { method: "GET" }).then(parseTransformLista),
  getById: (id) =>
    fetch(Api.paletaById(id), { method: "GET" }).then(parseTransformItem),
  create: (
    paleta /*paleta será o parâmetro indicado para que o cadastro ocorra*/
  ) =>
    fetch(Api.createPaleta(), {
      method:
        "POST" /*Além de informar o methodo: POST, é preciso também, dizer como será o envio dessas informações serão emviadas */,
      body: JSON.stringify(
        paleta
      ) /* e esse envio será via body "corpo da requisição" via json*/,
      mode: "cors" /*cors é uma configuração que precisa ser adicionada para que o backend considere essa requisição segura e não a bloqueie*/,
      headers: {
        /*headers são a forma como as informações serão enviadas(reafirmação de body) */
        "Content-Type": "application/json",
      },
    }).then(parseTransformItem),
  updateById: (id, paleta) =>
    fetch(Api.updatePaletaById(id), {
      method: "PUT",
      body: JSON.stringify(paleta),
      mode: "cors",
      headers: { "Content-Type": "application/json" },
    }).then(parseResponse),
  deleteById: (id) =>
    fetch(Api.deletePaletaById(id), { method: "DELETE" }).then(parseResponse),
};
