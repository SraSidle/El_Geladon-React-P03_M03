const PaletaContext = {
    paletaEndpoint: () => `${Api.baseUrl}/paletas`,
    paletaLista: () => `${PaletaContext.paletaEndpoint()}/all-paletas`,
    paletaById: (id) => `${PaletaContext.paletaEndpoint()}/one-paleta/${id}`, //Se der erro, pode ser que precise de aspas
    createPaleta: () => `${PaletaContext.paletaEndpoint()}/create-paleta`,
    updatePaletaById: (id) => `${PaletaContext.paletaEndpoint()}/update-paleta/${id}`,
    deletePaletaById: (id) => `${PaletaContext.paletaEndpoint()}/delete-paleta/${id}`
};

//linha 3 => Essa sintaxe é pq vai pegar os valores de paletaEndpoint e redenrizar todas as paletas
export const Api ={
    baseUrl: "https://api-elgeladon.herokuapp.com",
    ...PaletaContext //"..." spread operator
}